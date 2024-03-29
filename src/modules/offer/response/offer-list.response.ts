import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';

export default class OfferListResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public lodging!: string;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}
