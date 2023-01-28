import { readFileSync } from 'fs';
import { City } from '../../types/city.enum.js';
import { Feature } from '../../types/feature.enum.js';
import { Logging } from '../../types/logging.enum.js';
import { Offer } from '../../types/offer.type.js';
import { FileReader } from './file-reader.interface.js';

export default class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(public filename: string) {}

  public read(): void{
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[]{
    if (!this.rawData) {
      return [];
    }
    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
        title, description, createdDate, cityName,
        preview, photos, premium, rating,
        type, rooms, guests, price, features, name,
        email, avatarUrl, password, isPro, commentsCount,
        latitude, longitude,
      ]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: City[cityName as keyof typeof City],
        preview,
        photos: photos.split(';'),
        isPremium: !!premium,
        rating: Number.parseInt(rating, 10),
        logging: Logging[type as keyof typeof Logging],
        roomsCount: Number.parseInt(rooms, 10),
        guestsCount: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        features: features.split(';').map((feature) => Feature[feature as keyof typeof Feature]),
        host: {
          name,
          email,
          avatarUrl,
          password,
          isPro: !!isPro
        },
        commentsCount: Number.parseInt(commentsCount, 10),
        address: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude)
        }
      }));
  }
}
