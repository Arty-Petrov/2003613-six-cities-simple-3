import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import * as crypto from 'crypto';
import * as jose from 'jose';
import { DEFAULT_STATIC_IMAGES } from '../app/application.constant.js';
import { City } from '../types/city.enum.js';
import { Feature } from '../types/feature.enum.js';
import { Location } from '../types/location.type.js';
import { Lodging } from '../types/lodging.enum.js';
import { Offer } from '../types/offer.type.js';
import { ServiceError } from '../types/service-error.enum.js';
import { UnknownObject } from '../types/unknown-object.type.js';
import { ValidationErrorField } from '../types/validation-error-field.type.js';

export const createComment = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    text, postDate, rating,
  ] = tokens;
  return {
    text: text,
    postDate: postDate,
    rating: Number.parseInt(rating,10),
  };
};

export const createOffer = (row: string): Offer => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, postDate, cityName,
    preview, photos, isPremium, lodgingName,
    roomsCount, guestsCount, price, features,
    latitude, longitude] = tokens;
  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[cityName as keyof typeof City],
    preview,
    photos: photos.split(';'),
    isPremium: isPremium as unknown as boolean,
    lodging: lodgingName as Lodging,
    roomsCount: Number.parseInt(roomsCount,10),
    guestsCount: Number.parseInt(guestsCount,10),
    price: Number.parseInt(price,10),
    features: features.split(';').map((feature) => feature as Feature),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude)
    } as Location,
  };
};

export const createUser = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    name, email, avatarUrl, isPro,
  ] = tokens;
  return {
    name: name,
    email: email,
    avatar: avatarUrl,
    isPro: Boolean(isPro),
  };
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const multerFilesToDTO = (files: Record<string, Array<Record<string, string>>>, multerFileField: string): Record<string, string[]> => {
  let dto: {[index: string]: string[]} = {};
  const fieldKeys = Object.keys(files);//?
  for (const key of fieldKeys) {
    const values = files[key].map((item) => item[multerFileField]);
    dto = {...dto, [key]: [...values]};//?
  }
  return dto;
};

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;
const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        console.log('transformProperty', key);
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  const getRootPath = (fileName: unknown | string) => DEFAULT_STATIC_IMAGES.includes(fileName as string) ? staticPath : uploadPath;
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      if (Array.isArray(target[property])){
        const fileNames = target[property] as unknown[];
        fileNames.map((fileName) => `${getRootPath(fileName)}/${fileName}`);
        target = {...target, [property]: fileNames};
      }

      target[property] = `${getRootPath(target[property])}/${target[property]}`;
    }));
};

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
