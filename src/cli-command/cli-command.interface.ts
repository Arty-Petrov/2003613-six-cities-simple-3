export interface CliCommand {
  readonly name: string;
  execute(...parameters: string[]): void;
}
