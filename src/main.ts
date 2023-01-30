import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import 'reflect-metadata';
import Application from './app/application.js';
import { ConfigInterface } from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import { DatabaseInterface } from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import { CommentServiceInterface } from './modules/comment/comment-service.interface.js';
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js';
import CommentService from './modules/comment/comment.service.js';
import { OfferServiceInterface } from './modules/offer/offer-service.interface.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import OfferService from './modules/offer/offer.service.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import UserService from './modules/user/user.service.js';
import { Component } from './types/component.types.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();

applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService);
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);


const application = applicationContainer.get<Application>(Component.Application);
await application.init();
