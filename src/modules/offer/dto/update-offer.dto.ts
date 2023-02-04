import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
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

export default class UpdateOfferDto {
  @IsOptional()
  @Length(TitleLength.Min, TitleLength.Max, {
    message: OfferApiError.TitleIsInvalid
  })
  public title?: string;

  @IsOptional()
  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: OfferApiError.DescriptionIsInvalid
  })
  public description?: string;

  @IsOptional()
  @IsDateString({}, {
    message: OfferApiError.PostDateIsInvalid
  })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, {
    message: OfferApiError.CityIsInvalid
  })
  public city?: City;

  @IsOptional()
  public preview?: string;

  @IsOptional()
  public photos?: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(Lodging, {
    each: true,
    message: OfferApiError.LodgingIsInvalid
  })
  public lodging?: Lodging;

  @IsOptional()
  @IsInt({
    message: OfferApiError.RoomsCountIsNotInteger
  })
  @Min(RoomsRange.Min, {
    message: OfferApiError.RoomsCountIsInvalid
  })
  @Max(RoomsRange.Max, {
    message: OfferApiError.RoomsCountIsInvalid
  })
  public roomsCount?: number;

  @IsOptional()
  @IsInt({
    message: OfferApiError.GuestCountIsNotInteger
  })
  @Min(GuestsRange.Min, {
    message: OfferApiError.GuestCountIsInvalid
  })
  @Max(GuestsRange.Max, {
    message: OfferApiError.GuestCountIsInvalid
  })
  public guestsCount?: number;

  @IsOptional()
  @IsInt({
    message: OfferApiError.RatingIsNotInteger
  })
  @Min(PriceRange.Min, {
    message: OfferApiError.RatingIsInvalid
  })
  @Max(PriceRange.Max, {
    message: OfferApiError.RatingIsInvalid
  })
  public price?: number;

  @IsOptional()
  @IsArray({
    message: OfferApiError.FeaturesIsNotArray
  })
  @IsEnum(Feature,{
    each: true,
    message: OfferApiError.FeatureIsInvalid
  })
  public features?: Feature[];

  @IsOptional()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({
    message: OfferApiError.LocationIsInvalid
  })
  @Type(() => LocationDto)
  public location?: Location;
}
