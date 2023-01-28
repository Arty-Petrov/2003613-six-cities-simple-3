import { MockData } from '../../types/type.index.js';
import { generateRandomValue, getRandomItem } from '../../utils/random.js';
import { MockGenerator } from './mock-generator.interface.js';

export default class UserMockGenerator implements MockGenerator {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatars);
    const isPro = generateRandomValue(0,1).toString();

    return [name, email, avatarUrl, isPro].join('\t');
  }
}
