import { Expose, Transform } from 'class-transformer';

export default class UploadUserAvatarResponse {
  @Expose()
  @Transform(({ value }) => `http://localhost:4000/upload/avatar/${value}`)
  public avatarUrl!: string;
}
