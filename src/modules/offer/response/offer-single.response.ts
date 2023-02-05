import { Expose, Type } from 'class-transformer';
import { Feature } from '../../../types/feature.enum.js';
import { Lodging } from '../../../types/lodging.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class OfferSingleResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public lodging!: Lodging;

  @Expose()
  public price!: number;

  @Expose()
  public features!: Feature[];

  @Expose({ name: 'hostId'})
  @Type(() => UserResponse)
  public hostId!: UserResponse;
}
