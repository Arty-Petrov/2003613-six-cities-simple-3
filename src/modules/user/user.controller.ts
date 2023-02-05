import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { ValidateAnonymousMiddleware } from '../../common/middlewares/validate-anonymous.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { UploadField } from '../../const/upload-field.const.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { createJWT, fillDTO, multerFilesToDTO } from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto.js';
import LoginUserDto from './dto/login-user.dto.js';
import LoggedUserResponse from './response/logged-user.response.js';
import UploadUserAvatarResponse from './response/upload-user-avatar.response.js';
import UserResponse from './response/user.response.js';
import { UserServiceInterface } from './user-service.interface.js';
import { JWT_ALGORITHM, USER_FILES_UPLOAD_FIELDS } from './user.constant.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger, configService);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateAnonymousMiddleware(),
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.check,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), USER_FILES_UPLOAD_FIELDS),
      ]
    });
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.check});
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result)
    );
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (! user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const token = await createJWT(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      { email: user.email, id: user.id}
    );

    this.ok(res, fillDTO(LoggedUserResponse, {
      ...fillDTO(LoggedUserResponse, user),
      token
    }));
  }

  public async uploadAvatar({files, user: {id}}: Request, res: Response) {
    const fileName = multerFilesToDTO(instanceToPlain(files), 'filename');
    const avatar = {avatar: fileName[UploadField.Avatar][0]};
    await this.userService.updateById(id, {...avatar});
    this.created(res, fillDTO(UploadUserAvatarResponse, avatar));
  }

  public async check(req: Request, res: Response): Promise<void> {
    const user = await this.userService.findByEmail(req.user.email);
    this.ok(res, fillDTO(LoggedUserResponse, user));
  }
}
