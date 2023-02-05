import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export class AuthorizeOwnerMiddleware implements MiddlewareInterface {
  constructor(
    private service: DocumentExistsInterface,
    private param: string
  ) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!req?.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }
    const documentId = req.params[this.param];
    const userId = req.user?.id;

    if (!await this.service.checkOwnership(userId, documentId)) {
      return next(new HttpError(
        StatusCodes.FORBIDDEN,
        'You are not owner to this resource',
        'AuthorizeOwnerMiddleware'
      ));
    }
    return next();
  }
}
