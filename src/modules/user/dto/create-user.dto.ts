import { IsBoolean, IsEmail, Length } from 'class-validator';
import { NameLength, PasswordLength, UserApiError } from '../user.constant.js';

export default class CreateUserDto {
  @Length(NameLength.Min, NameLength.Max, {
    message: UserApiError.NameIsInvalid
  })
  public name!: string;

  @IsEmail({},{
    message: UserApiError.EmailIsInvalid
  })
  public email!: string;

  @IsBoolean()
  public isPro!: boolean;

  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: UserApiError.PasswordIsInvalid
  })
  public password!: string;
}
