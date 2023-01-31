import { Expose } from 'class-transformer';
import { Lodging } from '../../../types/lodging.enum.js';

export default class OfferShortResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public lodging!: Lodging;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}
