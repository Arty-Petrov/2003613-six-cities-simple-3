import { IsBoolean, Length, Matches } from 'class-validator';
import { NameLength, USER_IMAGE_TYPE_REGEXP, UserApiError } from '../user.constant.js';

export default class UpdateUserDto {
  @Length(NameLength.Min, NameLength.Max, {
    message: UserApiError.NameIsInvalid
  })
  public name?: string;

  @Matches(USER_IMAGE_TYPE_REGEXP, {
    message: UserApiError.AvatarIsWrongFormat
  })
  public avatarUrl?: string;

  @IsBoolean()
  public isPro?: boolean;
}
