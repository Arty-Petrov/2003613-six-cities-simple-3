import { City } from './city.enum.js';
import { Feature } from './feature.enum.js';
import { Location } from './location.type.js';
import { Lodging } from './lodging.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string;
  photos: string[];
  isPremium: boolean;
  rating?: number;
  lodging: Lodging;
  roomsCount: number;
  guestsCount: number;
  price: number;
  features: Feature[];
  host?: User;
  commentsCount?: number;
  location: Location;
}
