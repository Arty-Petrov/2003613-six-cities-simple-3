import { IsBoolean, IsEmail, Length, Matches } from 'class-validator';
import { NameLength, PasswordLength, USER_IMAGE_TYPE_REGEXP, UserApiError } from '../user.constant.js';

export default class CreateUserDto {
  @Length(NameLength.Min, NameLength.Max, {
    message: UserApiError.NameIsInvalid
  })
  public name!: string;

  @IsEmail({},{
    message: UserApiError.EmailIsInvalid
  })
  public email!: string;

  @Matches(USER_IMAGE_TYPE_REGEXP, {
    message: UserApiError.AvatarIsWrongFormat
  })
  public avatarUrl!: string;

  @IsBoolean()
  public isPro!: boolean;

  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: UserApiError.PasswordIsInvalid
  })
  public password!: string;
}
