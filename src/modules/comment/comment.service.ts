import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortOrder } from '../../types/sort-order.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentDefault } from './comment.constant.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('New comment was created');
    return comment.populate(['userId']);
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({offerId: offerId})
      .limit(CommentDefault.ListCount)
      .sort({postDate: SortOrder.Down})
      .populate(['userId'])
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<void>{
    await this.commentModel
      .deleteMany({offerId})
      .exec();
  }
}
