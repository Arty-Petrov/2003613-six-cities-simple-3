import {config} from 'dotenv';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/type.index.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {ConfigInterface} from './config.interface.js';
import {configSchema, ConfigSchema} from './config.schema.js';

@injectable()
export default class ConfigService implements ConfigInterface {
  private readonly config: ConfigSchema;
  private readonly logger: LoggerInterface;

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configSchema.load({});
    configSchema.validate({allowed: 'warn', output: this.logger.info});

    this.config = configSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}
