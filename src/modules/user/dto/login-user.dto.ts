import { IsEmail, Length } from 'class-validator';
import { PasswordLength, UserApiError } from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({},{
    message: UserApiError.EmailIsInvalid
  })
  public email!: string;

  @Length(PasswordLength.Min, PasswordLength.Max, {
    message: UserApiError.PasswordIsInvalid
  })
  public password!: string;
}
