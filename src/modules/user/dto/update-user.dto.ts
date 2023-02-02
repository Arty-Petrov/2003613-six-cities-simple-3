import { IsBoolean, IsOptional, Length } from 'class-validator';
import { NameLength, UserApiError } from '../user.constant.js';

export default class UpdateUserDto {
  @IsOptional()
  @Length(NameLength.Min, NameLength.Max, {
    message: UserApiError.NameIsInvalid
  })
  public name?: string;

  @IsOptional()
  public avatarUrl?: string;

  @IsOptional()
  @IsBoolean()
  public isPro?: boolean;
}
