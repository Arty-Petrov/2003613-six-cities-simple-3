import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { transformErrors } from '../../utils/common.js';
import ValidationError from '../errors/validation-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export class ValidateDtoMiddleware implements MiddlewareInterface {
  constructor(private dto: ClassConstructor<object>) {}

  public async execute({body, path}: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      if (errors.length > 0) {
        throw new ValidationError(`Validation error: "${path}"`, transformErrors(errors));
      }
    }

    next();
  }
}
