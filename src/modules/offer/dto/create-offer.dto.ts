import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmptyObject,
  IsObject,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { City } from '../../../types/city.enum.js';
import { Feature } from '../../../types/feature.enum.js';
import { Location } from '../../../types/location.type.js';
import { Lodging } from '../../../types/lodging.enum.js';
import {
  DescriptionLength,
  GuestsRange,
  OfferApiError,
  PriceRange,
  RoomsRange,
  TitleLength,
} from '../offer.constant.js';
import LocationDto from './location.dto.js';

export default class CreateOfferDto {
  @Length(TitleLength.Min, TitleLength.Max, {
    message: OfferApiError.TitleIsInvalid
  })
  public title!: string;

  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: OfferApiError.DescriptionIsInvalid
  })
  public description!: string;

  @IsDateString({}, {
    message: OfferApiError.PostDateIsInvalid
  })
  public postDate!: Date;

  @IsEnum(City, {
    message: OfferApiError.CityIsInvalid
  })
  public city!: City;

  @IsBoolean()
  public isPremium!: boolean;

  @IsEnum(Lodging, {
    each: true,
    message: OfferApiError.LodgingIsInvalid
  })
  public lodging!: Lodging;

  @IsInt({
    message: OfferApiError.RoomsCountIsNotInteger
  })
  @Min(RoomsRange.Min, {
    message: OfferApiError.RoomsCountIsInvalid
  })
  @Max(RoomsRange.Max, {
    message: OfferApiError.RoomsCountIsInvalid
  })
  public roomsCount!: number;

  @IsInt({
    message: OfferApiError.GuestCountIsNotInteger
  })
  @Min(GuestsRange.Min, {
    message: OfferApiError.GuestCountIsInvalid
  })
  @Max(GuestsRange.Max, {
    message: OfferApiError.GuestCountIsInvalid
  })
  public guestsCount!: number;

  @IsInt({
    message: OfferApiError.RatingIsNotInteger
  })
  @Min(PriceRange.Min, {
    message: OfferApiError.RatingIsInvalid
  })
  @Max(PriceRange.Max, {
    message: OfferApiError.RatingIsInvalid
  })
  public price!: number;

  @IsArray({
    message: OfferApiError.FeaturesIsNotArray
  })
  @IsEnum(Feature,{
    each: true,
    message: OfferApiError.FeatureIsInvalid
  })
  public features!: Feature[];

  @IsMongoId({
    message: OfferApiError.HostIdIsInvalid
  })
  public hostId!: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({
    message: OfferApiError.LocationIsInvalid
  })
  @Type(() => LocationDto)
  public location!: Location;
}
