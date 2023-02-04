import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';
import { RatingRange, TextLength } from './comment.constant.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: TextLength.Min,
    maxlength: TextLength.Max,
  })
  public text!: string;

  @prop({
    required: false,
    default: new Date(),
  })
  public postDate!: Date;

  @prop({
    required: true,
    min: RatingRange.Min,
    max: RatingRange.Max,
  })
  public rating!: number;

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: UserEntity
  })
  public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
