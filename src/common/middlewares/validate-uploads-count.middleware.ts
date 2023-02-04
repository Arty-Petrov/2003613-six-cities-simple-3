import { instanceToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { multerFilesToDTO } from '../../utils/common.js';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export class ValidateUploadsCountMiddleware implements MiddlewareInterface {
  constructor(
    private readonly field: string,
    private readonly filesCount: number,
  ) {
  }

  public async execute({files}: Request, _res: Response, next: NextFunction): Promise<void> {
    if (files === undefined) {
      throw new HttpError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'There are no files to check. Please put this middleware after UploadMiddleware',
        'ValidateUploadsCountMiddleware'
      );
    }
    const fieldFilePaths = multerFilesToDTO(instanceToPlain(files), 'path');
    const fieldFilePathsCount = fieldFilePaths[this.field].length;
    if (fieldFilePathsCount !== this.filesCount) {
      const paths = Object.values(fieldFilePaths).flat();
      console.log(paths);
      for (const path of paths) {
        await fs.promises.unlink(path);
        console.log('deleted', path);
      }
      throw new HttpError(
        StatusCodes.PARTIAL_CONTENT,
        `Upload failed. The field "${this.field}" expected exactly ${this.filesCount} files but contains only ${fieldFilePathsCount}`,
        'ValidateUploadsCountMiddleware'
      );
    }
    next();
  }
}
