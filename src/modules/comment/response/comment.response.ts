import { Expose, Transform } from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';

export default class CommentResponse {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({ name: 'updatedAt'})
  public postDate!: string;

  @Expose({ name: 'userId'})
  @Transform(() => UserResponse)
  public user!: UserResponse;
}
