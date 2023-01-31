import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { applicationContainer } from '../../app/application.container.js';
import { Component } from '../../types/component.types.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import CommentService from './comment.service.js';

const commentContainer = new Container();

applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService);
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

export {commentContainer};
