import { MockData } from '../../types/mock-data.type.js';
import { MockGenerator } from './mock-generator.interface.js';

export default class CityMockGenerator implements MockGenerator {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const citiesData = this.mockData.cities;
    let result = '';
    for (const line of citiesData){
      const values = line.split(', ');
      const [name, latitude, longitude] = values;
      result += `${[name, latitude, longitude].join('\t')}\n`;
    }
    return result.trimEnd();
  }
}
