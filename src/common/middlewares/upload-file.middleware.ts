import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mime from 'mime-types';
import multer, { diskStorage, Field, FileFilterCallback } from 'multer';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fields: Field[],
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: (_req, file, callback) =>
        callback(null, `${this.uploadDirectory}/${file.fieldname}`),
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      }
    });

    const uploadFilter = (
      _req: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback,
    ) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(null, true);
      } else {
        return callback(new HttpError(
          StatusCodes.BAD_REQUEST,
          `Unsupported file type ${extname(file.originalname)}, only *.jpeg, jpg and png file types allowed`,
          'UploadFileMiddleware',
        ));
      }
    };

    const uploadFilesMiddleware = multer({
      storage: storage,
      fileFilter: uploadFilter,
    }).fields(this.fields);

    uploadFilesMiddleware(req, res, next);
  }
}
