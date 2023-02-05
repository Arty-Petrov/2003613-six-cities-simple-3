import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { AuthorizeOwnerMiddleware } from '../../common/middlewares/authorize-owner.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exist.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectId.middleware.js';
import { ValidateUploadsCountMiddleware } from '../../common/middlewares/validate-uploads-count.middleware.js';
import { UploadField } from '../../const/upload-field.const.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO, multerFilesToDTO } from '../../utils/common.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OFFER_FILES_UPLOAD_FIELDS, OfferDefault } from './offer.constant.js';
import OfferQuery from './query/offer.query.js';
import OfferListResponse from './response/offer-list.response.js';
import OfferSingleResponse from './response/offer-single.response.js';
import UploadOfferImagesResponse from './response/upload-offer-images.response.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.getOffers,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOfferById,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new AuthorizeOwnerMiddleware(this.offerService,'offerId'),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/images',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new AuthorizeOwnerMiddleware(this.offerService,'offerId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), OFFER_FILES_UPLOAD_FIELDS),
        new ValidateUploadsCountMiddleware(UploadField.Photos, OfferDefault.PhotosCount),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new AuthorizeOwnerMiddleware(this.offerService,'offerId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create(
    {user, body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({...body, hostId: user.id});
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferSingleResponse, offer));
  }

  public async getOffers(
    {query}: Request<core.Query | OfferQuery>,
    res: Response) {
    this.logger.info(`Передано ${JSON.stringify(query)}`);
    const offersList = await this.offerService.find(query);
    if (!offersList) {
      throw new Error('Failed to get offers');
    }
    return this.ok(res, fillDTO(OfferListResponse, offersList));
  }

  public async getOfferById(
    {params: {offerId}}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    this.logger.info(`Передано ${offerId}`);
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDTO(OfferSingleResponse, offer));
  }

  public async getComments(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer, object, object>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }

  public async update(
    {body, params: {offerId}}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OfferSingleResponse, updatedOffer));
  }

  public async uploadImages(
    {files, params: {offerId}}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>>,
    res: Response
  ): Promise<void> {
    const fileName = multerFilesToDTO(instanceToPlain(files), 'filename');
    const preview = {preview: fileName[UploadField.Preview][0]};
    const photos = {photos: fileName[UploadField.Photos]};

    const updatedOffer = await this.offerService.updateById(offerId, {...preview, ...photos});
    console.log(updatedOffer);
    this.created(res, fillDTO(UploadOfferImagesResponse, updatedOffer));
  }

  public async delete(
    {params}: Request<Record<string, unknown>>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.deleteById(offerId as string);
    await this.commentService.deleteByOfferId(offerId as string);

    this.noContent(res, offer);
  }
}
