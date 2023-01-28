import { LocationValue, OfferGuestsCount, OfferPriceValue, OfferRoomsCount, CityLocation } from '../../const/const.index.js';
import {City} from '../../types/enum.index.js';
import {Feature} from '../../types/enum.index.js';
import {Logging} from '../../types/enum.index.js';
import {MockData} from '../../types/type.index.js';
import {
  generateRandomValue,
  generateRandomDate,
  getRandomItem,
  getRandomItems
} from '../../utils/random.js';
import {MockGeneratorInterface} from './mock-generator.interface.js';

const MIN_DATE = '20230101';
const MAX_DATE = '20220901';
const LOCATION_THRESHOLD = 0.05;

export default class OfferMockGenerator implements MockGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = generateRandomDate(MIN_DATE, MAX_DATE);
    const city = getRandomItem<string>(Array.from(Object.values(City))) as City;
    const preview = getRandomItem<string>(this.mockData.preview);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = !!generateRandomValue(0,1);
    const type = getRandomItem<string>(Array.from(Object.values(Logging)));
    const roomsCount = generateRandomValue(OfferRoomsCount.Min, OfferRoomsCount.Max).toString();
    const guestsCount = generateRandomValue(OfferGuestsCount.Max, OfferGuestsCount.Max).toString();
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
