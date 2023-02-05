import { DocumentType } from '@typegoose/typegoose';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import OfferQuery from './query/offer.query.js';

export interface OfferServiceInterface extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity | null>>;
  find(query: OfferQuery): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  checkOwnership(userId: string, offerId: string): Promise<boolean>;
}
