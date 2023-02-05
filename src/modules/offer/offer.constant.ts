import { City } from '../../types/city.enum.js';
import { Feature } from '../../types/feature.enum.js';
import { Lodging } from '../../types/lodging.enum.js';

export const DEFAULT_PREVIEW_FILE_NAME = 'default-preview.jpg';
export const DEFAULT_PHOTOS_FILE_NAMES = [
  'default-photo.jpg',
  'default-photo.jpg',
  'default-photo.jpg',
  'default-photo.jpg',
  'default-photo.jpg',
  'default-photo.jpg',
];

export const OFFER_FILES_UPLOAD_FIELDS = [
  { name: 'preview', maxCount: 1 },
  { name: 'photos', maxCount: 6 },
];

export const OfferDefault = {
  PhotosCount: 6,
  ListCount: 60,
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
  RatingIsNotInteger: 'Price must be an integer',
  RatingIsInvalid: `Price must be min ${PriceRange.Min}, max ${PriceRange.Max}`,
  FeaturesIsNotArray: 'Features must be an array',
  FeatureIsInvalid: `A feature isn't match any of this values: ${Object.values(Feature).join(', ')}`,
  LocationIsInvalid: 'Offer location must contains a object with latitude and longitude coordinates',
} as const;
