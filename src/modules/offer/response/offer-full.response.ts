import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { Feature } from '../../../types/feature.enum.js';
import { Location } from '../../../types/location.type.js';
import { User } from '../../../types/user.type.js';

export default class OfferFullResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()

  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public lodging!: string;

  @Expose()
  public roomsCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public features!: Feature[];

  @Expose({ name: 'hostId'})
  public host!: User;

  @Expose()
  public commentsCount!: number;

  @Expose()
  public location!: Location;
}
