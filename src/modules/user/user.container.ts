import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { applicationContainer } from '../../app/application.container.js';
import { Component } from '../../types/component.types.js';
import { UserServiceInterface } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import UserService from './user.service.js';

const userContainer = new Container();

applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

export {userContainer};
