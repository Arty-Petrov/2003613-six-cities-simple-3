import { readFileSync } from 'fs';
import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCommand implements CliCommandInterface {
  readonly name = '--version';
  private readVersion(): string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    return JSON.parse(contentPageJSON);
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(version);
  }
}
