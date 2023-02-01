import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';
import { Location } from '../../../types/location.type.js';

export default class LocationDto implements Location {
  @IsNotEmpty()
  @IsLatitude()
  public latitude!: number;

  @IsNotEmpty()
  @IsLongitude()
  public longitude!: number;
}
