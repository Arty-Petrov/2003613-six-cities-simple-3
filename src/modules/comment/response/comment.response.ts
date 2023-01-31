import { Expose } from 'class-transformer';
import { User } from '../../../types/user.type.js';

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
  public host!: User;
}
