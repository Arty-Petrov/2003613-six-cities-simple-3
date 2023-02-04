import { RatingRange } from '../../modules/comment/comment.constant.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomDate, generateRandomValue, getRandomItem } from '../../utils/random.js';
import { PostDateRange } from './mock-generator.const.js';
import { MockGeneratorInterface } from './mock-generator.interface.js';

export default class CommentMockGenerator implements MockGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const text = getRandomItem<string>(this.mockData.comments);
    const postDate = generateRandomDate(PostDateRange.Min, PostDateRange.Max);
    const rating = generateRandomValue(RatingRange.Min, RatingRange.Max).toString();

    return [text, postDate, rating,].join('\t');
  }
}
