import {
  CityLocation,
  LocationValue,
  OfferGuestsCount,
  OfferPriceValue,
  OfferRoomsCount,
} from '../../const/const.index.js';
import { City, Feature, Lodging } from '../../types/enum.index.js';
import { MockData } from '../../types/type.index.js';
import { generateRandomDate, generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { LOCATION_THRESHOLD, PostDateRange } from './mock-generator.const.js';
import { MockGeneratorInterface } from './mock-generator.interface.js';

export default class OfferMockGenerator implements MockGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = generateRandomDate(PostDateRange.Min, PostDateRange.Max);
    const city = getRandomItem<string>(Array.from(Object.values(City))) as City;
    const preview = getRandomItem<string>(this.mockData.preview);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = !!generateRandomValue(0,1);
    const type = getRandomItem<string>(Array.from(Object.values(Lodging)));
    const roomsCount = generateRandomValue(OfferRoomsCount.Min, OfferRoomsCount.Max).toString();
    const guestsCount = generateRandomValue(OfferGuestsCount.Min, OfferGuestsCount.Max).toString();
    const price = generateRandomValue(OfferPriceValue.Min, OfferPriceValue.Max).toString();
    const features = getRandomItems<string>(Array.from(Object.values(Feature))).join(';');

    const minLat = CityLocation[city].latitude - LOCATION_THRESHOLD;
    const maxLat = CityLocation[city].latitude + LOCATION_THRESHOLD;
    const minLong = CityLocation[city].longitude - LOCATION_THRESHOLD;
    const maxLong = CityLocation[city].longitude + LOCATION_THRESHOLD;
    const latitude = generateRandomValue(minLat, maxLat, LocationValue.Decimal).toString();
    const longitude = generateRandomValue(minLong, maxLong, LocationValue.Decimal).toString();

    return [
      title, description, postDate, city, preview,
      photos, isPremium, type, roomsCount, guestsCount,
      price, features, latitude, longitude].join('\t');
  }
}
