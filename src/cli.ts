#!/usr/bin/env node

import CLIApplication from './cli-command/cli-application.js';
import HelpCommand from './cli-command/help-command.js';
import ImportCommand from './cli-command/import-command.js';
import VersionCommand from './cli-command/version-command.js';

const myManager = new CLIApplication();
myManager.registerCommand([
  new VersionCommand(), new HelpCommand(), new ImportCommand()
]);
myManager.processCommand(process.argv);
