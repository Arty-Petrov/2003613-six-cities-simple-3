import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { applicationContainer } from '../../app/application.container.js';
import { ControllerInterface } from '../../common/controller/controller.interface.js';
import { Component } from '../../types/component.types.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferController from './offer.controller.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import OfferService from './offer.service.js';

const offerContainer = new Container();

applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
offerContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();

export {offerContainer};
