import { City } from '../../../types/city.enum.js';
import { Location } from '../../../types/location.type.js';
import { Lodging } from '../../../types/lodging.enum.js';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: City;
  public preview?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public lodging?: Lodging;
  public roomsCount?: number;
  public guestsCount?: number;
  public price?: number;
  public features?: string[];
  public location?: Location;
}
