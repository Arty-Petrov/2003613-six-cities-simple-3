import typegoose, { defaultClasses, getModelForClass, Ref, Severity } from '@typegoose/typegoose';
import { City } from '../../types/city.enum.js';
import { Feature } from '../../types/feature.enum.js';
import { Location } from '../../types/location.type.js';
import { Lodging } from '../../types/lodging.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { OfferDefault, TitleLength } from './offer.constant.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: TitleLength.Min,
    maxlength: TitleLength.Max,
  })
  public title!: string;

  @prop({
    required: true,
    trim: true,
    default: '',
  })
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW
  })
  public city!: City;

  @prop({
    required: false,
    default: 'default-photo.jpg',
  })
  public preview!: string;

  @prop({
    required: false,
    default: [
      'default-photo.jpg',
      'default-photo.jpg',
      'default-photo.jpg',
      'default-photo.jpg',
      'default-photo.jpg',
      'default-photo.jpg',
    ],
    allowMixed: Severity.ALLOW })
  public photos!: string[];

  @prop({
    required: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    required: false,
    default: OfferDefault.Rating,
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: Lodging
  })
  public lodging!: Lodging;

  @prop({
    required: true,
  })
  public roomsCount!: number;

  @prop({
    required: true,
  })
  public guestsCount!: number;

  @prop({
    required: true,
  })
  public price!: number;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW
  })
  public features!: Feature[];

  @prop({
    required: true,
    ref: UserEntity
  })
  public hostId!: Ref<UserEntity>;

  @prop({
    required: false,
    default: OfferDefault.CommentsCount,
  })
  public commentsCount!: number;

  @prop({
    required: true,
    allowMixed: Severity.ALLOW,
  })
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
