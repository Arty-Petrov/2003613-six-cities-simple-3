import { City } from '../../../types/city.enum.js';
import { SortOrder } from '../../../types/sort-order.enum.js';

export default class OfferQuery {
  public city?: City;
  public premium?: boolean;
  public limit?: number;
  public sort?: SortOrder;
}
