import { ConfigInterface } from '../common/config/config.interface.js';
import ConfigService from '../common/config/config.service.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import DatabaseService from '../common/database-client/database.service.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { MockPaths } from '../const/const.index.js';
import { CommentServiceInterface } from '../modules/comment/comment-service.interface.js';
import { CommentModel } from '../modules/comment/comment.entity.js';
import CommentService from '../modules/comment/comment.service.js';
import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import { OfferModel } from '../modules/offer/offer.entity.js';
import OfferService from '../modules/offer/offer.service.js';
import { UserServiceInterface } from '../modules/user/user-service.interface.js';
import { UserModel } from '../modules/user/user.entity.js';
import UserService from '../modules/user/user.service.js';
import { Offer } from '../types/offer.type.js';
import { Comment } from '../types/type.index.js';
import { User } from '../types/user.type.js';
import { createComment, createOffer, createUser, getErrorMessage } from '../utils/common.js';
import { getURI } from '../utils/db.js';
import { getRandomItem } from '../utils/random.js';
import { CliCommandInterface } from './cli-command.interface.js';

const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private readonly config!: ConfigInterface;
  private readonly commentService!: CommentServiceInterface;
  private readonly databaseService!: DatabaseInterface;
  private readonly offerService!: OfferServiceInterface;
  private readonly userService!: UserServiceInterface;
  private readonly logger: LoggerInterface;
  private salt!: string;
  private userIdList: string[] = [];
  private offerIdList: string[] = [];

  constructor() {
    this.onLineComments = this.onLineComments.bind(this);
    this.onLineOffers = this.onLineOffers.bind(this);
    this.onLineUsers = this.onLineUsers.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.config = new ConfigService(this.logger);
    this.commentService = new CommentService(this.logger, CommentModel);
    this.databaseService = new DatabaseService(this.logger);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
  }

  public async execute(source: string): Promise<void> {
    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    this.salt = this.config.get('SALT');
    const importQueue = [
      {
        fileReader: new TSVFileReader(source.trim() + MockPaths.User),
        onLine: this.onLineUsers,
      },
      {
        fileReader: new TSVFileReader(source.trim() + MockPaths.Offer),
        onLine: this.onLineOffers,
      },
      {
        fileReader: new TSVFileReader(source.trim() + MockPaths.Comment),
        onLine: this.onLineComments,
      },
    ];

    for (const item of importQueue) {
      await this.databaseService.connect(uri);
      item.fileReader.on('line', item.onLine);
      item.fileReader.on('end', this.onComplete);

      try {
        await item.fileReader.read();
      } catch (err) {
        console.log(`Can't read the file: ${getErrorMessage(err)}`);
      }
    }
  }

  private async saveUser(user: User): Promise<void> {
    const newUser = await this.userService.findOrCreate({
      ...user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);
    this.userIdList.push(newUser.id);
  }

  private async saveOffer(offer: Offer): Promise<void> {
    const newOffer = await this.offerService.create({
      ...offer,
      hostId: getRandomItem(this.userIdList),
    });
    this.offerIdList.push(newOffer.id);
  }

  private async saveComment(comment: Comment): Promise<void> {
    const offerId = getRandomItem(this.offerIdList);
    const userId = getRandomItem(this.userIdList);
    await this.commentService.createComment({
      ...comment,
      userId: userId,
      offerId: offerId,
    });
    const offerCounters = await this.commentService.getOfferCounters(offerId);
    await this.offerService.updateCommentData(offerCounters);
  }

  private async onLineUsers(line: string, resolve: () => void) {
    const user = createUser(line);
    await this.saveUser(user);
    resolve();
  }

  private async onLineOffers(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private async onLineComments(line: string, resolve: () => void) {
    const comment = createComment(line);
    await this.saveComment(comment);
    resolve();
  }

  private async onComplete(count: number) {
    console.log(`${count} rows imported.`);
    await this.databaseService.disconnect();
  }
}
