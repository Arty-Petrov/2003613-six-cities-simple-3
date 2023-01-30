import * as crypto from 'crypto';
import { City } from '../types/city.enum.js';
import { Feature } from '../types/feature.enum.js';
import { Location } from '../types/location.type.js';
import { Lodging } from '../types/lodging.enum.js';
import { Offer } from '../types/offer.type.js';

export const createComment = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    text, postDate, rating,
  ] = tokens;
  return {
    text: text,
    postDate: postDate,
    rating: Number.parseInt(rating,10),
  };
};

export const createOffer = (row: string): Offer => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, cityName,
    preview, photos, isPremium, lodgingName,
    roomsCount, guestsCount, price, features,
    latitude, longitude] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[cityName as keyof typeof City],
    preview,
    photos: photos.split(';'),
    isPremium: !!isPremium,
    lodging: lodgingName as Lodging,
    roomsCount: Number.parseInt(roomsCount,10),
    guestsCount: Number.parseInt(guestsCount,10),
    price: Number.parseInt(price,10),
    features: features.split(';').map((feature) => feature as Feature),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude)
    } as Location,
  };
};

export const createUser = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    name, email, avatarUrl, isPro,
  ] = tokens;
  return {
    name: name,
    email: email,
    avatarUrl: avatarUrl,
    isPro: !!isPro,
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
