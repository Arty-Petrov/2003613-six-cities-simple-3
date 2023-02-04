import CityLocation from '../../const/city-location.const.js';
import LocationValue from '../../const/location-value.const.js';
import { GuestsRange, PriceRange, RoomsRange } from '../../modules/offer/offer.constant.js';
import { City } from '../../types/city.enum.js';
import { Feature } from '../../types/feature.enum.js';
import { Lodging } from '../../types/lodging.enum.js';
import { MockData } from '../../types/mock-data.type.js';
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
    const roomsCount = generateRandomValue(RoomsRange.Min, RoomsRange.Max).toString();
    const guestsCount = generateRandomValue(GuestsRange.Min, GuestsRange.Max).toString();
    const price = generateRandomValue(PriceRange.Min, PriceRange.Max).toString();
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
