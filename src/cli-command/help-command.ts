import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      ${chalk.inverse.bold('Программа для подготовки данных для REST API сервера.')}

      ${chalk.bold('Пример:')}
          main.js --<command> [--arguments]

      ${chalk.bold('Команды:')}
          --version:                   # выводит номер версии
          --help:                      # печатает этот текст
          --import <path>:             # импортирует данные из TSV
          --generate <n> <path> <url> # генерирует произвольное количество тестовых данных
    `);
  }
}
