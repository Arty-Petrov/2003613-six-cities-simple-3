import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { SortOrder } from '../../types/sort-order.enum.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { DEFAULT_PHOTOS_FILE_NAMES, DEFAULT_PREVIEW_FILE_NAME, OfferDefault } from './offer.constant.js';
import { OfferEntity } from './offer.entity.js';
import OfferQuery from './query/offer.query.js';


@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel
      .create({...dto,
        preview: DEFAULT_PREVIEW_FILE_NAME,
        photos: DEFAULT_PHOTOS_FILE_NAMES,
      });
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async find(query: OfferQuery): Promise<DocumentType<OfferEntity>[]> {
    const {city, premium, limit, sort} = query;
    let matchParams: { [key: string]: string | number | boolean } = {};
    matchParams = (city !== undefined)
      ? {...matchParams, city: city}
      : {...matchParams};
    matchParams = (premium !== undefined)
      ? {...matchParams, isPremium: eval(premium as unknown as string)}
      : {...matchParams};
    console.log(matchParams);
    const sortDirection = sort || SortOrder.Down;
    const offersLimit = limit || OfferDefault.ListCount;

    const offers = await this.offerModel
      .aggregate([
        {
          '$match':  matchParams ,
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            pipeline: [
              { $project: { 'rating': 1}}
            ],
            as: 'ratingData'
          },
        },
        { $addFields:
              {
                'id': {$toString: '$_id'},
                'rating': {$round: [{ $avg: '$ratingData.rating'}, 1]},
                'commentsCount': { $size: '$ratingData'}
              },
        },
        { $unset: ['offers', '_id'] },
        { $sort: {'postDate': sortDirection}},
        { $limit: offersLimit },
      ]
      );
    await this.offerModel.populate(offers, {path: 'hostId', });
    return offers;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['hostId', 'features'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['hostId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const deletedOffer = await this.offerModel.findByIdAndDelete(offerId).exec();
    this.logger.info(`Offer ${offerId} and its comments are deleted`);
    return deletedOffer;
  }

  public async checkOwnership(userId: string, offerId: string): Promise<boolean> {
    const offer = await this.offerModel
      .findById(offerId)
      .populate('hostId')
      .exec();
    const ownerId = offer?.hostId?._id.toString();
    return ownerId === userId;
  }
}
