import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';
import { createSHA256 } from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    trim: true,
    default: '',
  })
  public name!: string;

  @prop({
    unique: true,
    required: true,
  })
  public email!: string;

  @prop({
    required: true,
    default: '',
  })

  public avatar!: string;

  @prop({
    required: true,
    default: false,
  })
  public isPro!: boolean;

  @prop({
    required: true,
    trim: true,
    default: '',
  })
  private password!: string;

  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.isPro = data.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
