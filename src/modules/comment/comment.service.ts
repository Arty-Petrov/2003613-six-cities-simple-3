import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortDirection } from '../../types/sort-direction.enum.js';
import UpdateCommentDataDto from '../offer/dto/update-comment-data.dto.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { DEFAULT_COMMENTS_COUNT } from './comment.const.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async getOfferCounters(offerId: string): Promise<UpdateCommentDataDto> {
    const id = new mongoose.Types.ObjectId(offerId);
    const offerRatingUpdate =
      await this.commentModel
        .aggregate([
          {$match: {
            offerId: {$eq: id}
          }},
          {$group: {
            _id: null,
            ratingSum: {'$sum': '$rating'},
            commentsCount: {'$sum': 1},
          }},
        ]).exec();

    const ratingSum = Number.parseInt(offerRatingUpdate[0].ratingSum,10);
    const commentsCount = Number.parseInt(offerRatingUpdate[0].commentsCount,10);

    const rating = Math.round((ratingSum / commentsCount) * 10) / 10;

    return {
      offerId: offerId,
      rating: rating,
      commentsCount: commentsCount,
    };
  }

  public async createComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null> {
    const comment = await this.commentModel.create(dto);
    this.logger.info('New comment was created');
    await this.getOfferCounters(dto.offerId);
    return comment.populate(['userId']);
  }

  public async deleteAllByOfferId(offerId: string): Promise<void>{
    await this.commentModel
      .deleteMany({offerId})
      .exec();
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null> {
    return this.commentModel
      .find({offerId: offerId})
      .limit(DEFAULT_COMMENTS_COUNT)
      .sort({postDate: SortDirection.Down})
      .populate(['userId'])
      .exec();
  }
}
