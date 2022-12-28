import TSVFileReader from '../common/tsv-file-reader.js';
import { CliCommand } from './cli-command.interface.js';

export default class ImportCommand implements CliCommand {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
