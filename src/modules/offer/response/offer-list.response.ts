import { Expose, Transform } from 'class-transformer';
import { City } from '../../../types/city.enum.js';

export default class OfferListResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public title!: string;
  @Expose()
  public postDate!: string;

  @Expose()
  public city!: City;

  @Expose()
  @Transform(({ value }) => `http://localhost:4000/upload/preview/${value}`)
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
