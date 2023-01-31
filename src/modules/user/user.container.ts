import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { applicationContainer } from '../../app/application.container.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import { Component } from '../../types/component.types.js';
import { UserServiceInterface } from './user-service.interface.js';
import UserController from './user.controller.js';
import { UserEntity, UserModel } from './user.entity.js';
import UserService from './user.service.js';

const userContainer = new Container();

applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();

export {userContainer};
