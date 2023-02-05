import { Expose } from 'class-transformer';

export default class UploadOfferImagesResponse {
  @Expose()
  public preview?: string;

  @Expose()
  public photos?: string[];
}
