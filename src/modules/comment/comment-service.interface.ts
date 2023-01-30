import { DocumentType } from '@typegoose/typegoose';
import UpdateCommentDataDto from '../offer/dto/update-comment-data.dto.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

export interface CommentServiceInterface {
  createComment(dto: CreateCommentDto): Promise<DocumentType<CommentEntity> | null>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[] | null>;
  getOfferCounters(offerId: string): Promise<UpdateCommentDataDto>;
  deleteAllByOfferId(offerId: string): Promise<void>;
}
