import { Expose, Transform } from 'class-transformer';

export default class UploadOfferImagesResponse {
  @Expose()
  @Transform(({ value }) => `http://localhost:4000/upload/preview/${value}`)
  public preview?: string;

  @Expose()
  @Transform(({value}) => {
    const fileNames = value as string[];
    return fileNames.map((item) => `http://localhost:4000/upload/photos/${item}`);
  })
  public photos?: string[];
}
