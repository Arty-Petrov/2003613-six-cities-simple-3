import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export class ValidateAnonymousMiddleware implements MiddlewareInterface {
  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (req.user) {
      throw new HttpError(
        StatusCodes.NOT_ACCEPTABLE,
        'Only unauthorised users can register',
        'ValidateAnonymousMiddleware'
      );
    }

    return next();
  }
}
