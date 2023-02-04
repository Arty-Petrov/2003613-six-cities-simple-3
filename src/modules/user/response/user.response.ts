import { Expose, Transform } from 'class-transformer';

export default class UserResponse {
  @Expose()
  public id!: string ;

  @Expose()
  public email!: string ;

  @Expose()
  public name!: string;

  @Expose()
  @Transform(({ value }) => `http://localhost:4000/upload/avatar/${value}`)
  public avatarUrl!: string;

  @Expose()
  public isPro!: boolean;
}
