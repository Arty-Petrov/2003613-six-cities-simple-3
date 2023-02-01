import { Expose, Transform } from 'class-transformer';
import { Lodging } from '../../../types/lodging.enum.js';

export default class OfferSingleResponse {
  @Expose({name: '_id'})
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  @Transform(({ value }) => `http://localhost:4000/upload/preview/${value}`)
  public preview!: string;

  @Expose()
  @Transform(({value}) => {
    const fileNames = value as string[];
    return fileNames.map((item) => `http://localhost:4000/upload/photos/${item}`);
  })
  public photos!: string[];

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
