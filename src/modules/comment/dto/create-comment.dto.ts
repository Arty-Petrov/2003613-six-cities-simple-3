import { IsInt, IsMongoId, Length, Max, Min } from 'class-validator';
import { CommentApiError, RatingRange, TextLength } from '../comment.constant.js';

export default class CreateCommentDto {
  @Length(TextLength.Min, TextLength.Min, {
    message: CommentApiError.TextIsInvalid
  })
  public text!: string;

  @IsInt({
    message: CommentApiError.RatingIsNotInteger
  })
  @Min(RatingRange.Min, {
    message: CommentApiError.RatingIsInvalid
  })
  @Max(RatingRange.Max, {
    message: CommentApiError.RatingIsInvalid
  })
  public rating!: number;

  public userId?: string;

  @IsMongoId({
    message: CommentApiError.OfferIdIsInvalid
  })
  public offerId!: string;
}
