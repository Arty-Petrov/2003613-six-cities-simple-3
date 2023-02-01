import { City } from '../../types/city.enum.js';
import { Feature } from '../../types/feature.enum.js';
import { Lodging } from '../../types/lodging.enum.js';

export const OFFER_IMAGE_TYPE_REGEXP = /[\\w/-]+.(jpg|jpeg|png)/;
export const OfferDefault = {
  CommentsCount: 0,
  PhotosCount: 6,
  ListCount: 60,
  Rating: null,
} as const;

export const TitleLength = {
  Min: 10,
  Max: 100,
} as const;

export const DescriptionLength = {
  Min: 20,
  Max: 1024,
} as const;

export const RoomsRange = {
  Min: 1,
  Max: 8,
} as const;

export const GuestsRange = {
  Min: 1,
  Max: 10,
} as const;

export const PriceRange = {
  Min: 100,
  Max: 100000,
} as const;

export const OfferApiDescription = {
  Id: 'The offer Id',
  Title: `The offer title, min ${TitleLength.Min}, max ${TitleLength.Max} chars length`,
  Description: `The offer description, min ${DescriptionLength.Min}, max ${DescriptionLength.Max} chars length`,
  PostDate: 'The offer post date (ISO format)',
  City: `The offer city name, any of these values: ${Object.values(City).join(', ')}\``,
  Preview: 'The offer picture, file type *.png/jpg/jpeg',
  Photos: `The offer photos, always ${OfferDefault.PhotosCount} file type *.png/jpg/jpeg`,
  IsPremium: 'The premium offer boolean flag',
  Rating: 'The offer rating, it is calculated by the service',
  Lodging: `A one of following lodging type: ${Object.values(Lodging).join(', ')}\``,
  RoomsCount: `The offer rooms count, min ${RoomsRange.Min}, max ${RoomsRange.Max} chars length`,
  GuestsCount: `The offer rooms count, min ${GuestsRange.Min}, max ${GuestsRange.Max} chars length`,
  Price: `The offer price, min ${PriceRange.Min}, max ${PriceRange.Max} chars length`,
  Features: `Any of features values: ${Object.values(Feature).join(', ')}`,
  HostId: 'The uniq id of offer publisher',
  CommentsCount: 'The offer comments count, it is calculated by the service',
  Location: 'The offer location coordinates',
} as const;

export const OfferApiError = {
  TitleIsInvalid: `Title must be min ${TitleLength.Min}, max ${TitleLength.Max} chars length`,
  DescriptionIsInvalid: `Title must be min ${DescriptionLength.Min}, max ${DescriptionLength.Max} chars length`,
  PostDateIsInvalid: 'Post date must be in ISO format',
  CityIsInvalid: `A city isn't match any of this values: ${Object.values(City).join(', ')}`,
  PreviewIsWrongFormat: 'Preview image file type must be *.png/jpg/jpeg file',
  PhotosIsNotArray: 'Photos must be an array',
  PhotosArrayIsEmpty: 'Photos array length must be not empty',
  PhotosArrayLengthIsWrong: `Photos array length must be ${OfferDefault.PhotosCount} length`,
  PhotoIsWrongFormat: 'Photo image file type must be *.png/jpg/jpeg file',
  LodgingIsInvalid: `Lodging field isn't match any of this values: ${Object.values(Lodging).join(', ')}`,
  RoomsCountIsNotInteger: 'Rooms count must be an integer',
  RoomsCountIsInvalid: `Rooms count must be min ${RoomsRange.Min}, max ${RoomsRange.Max}`,
  GuestCountIsNotInteger: 'Guests count must be an integer',
  GuestCountIsInvalid: `Guests count must be min ${GuestsRange.Min}, max ${GuestsRange.Max}`,
  PriceIsNotInteger: 'Price must be an integer',
  PriceIsInvalid: `Price must be min ${PriceRange.Min}, max ${PriceRange.Max}`,
  FeaturesIsNotArray: 'Features must be an array',
  FeatureIsInvalid: `A feature isn't match any of this values: ${Object.values(Feature).join(', ')}`,
  HostIdIsInvalid: 'Host is must be a MongoDB id',
  LocationIsInvalid: 'Offer location must contains a object with latitude and longitude coordinates',
} as const;
