#!/usr/bin/env node
import commander from 'commander';
import diff from '..';

commander.version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(diff(firstConfig, secondConfig));
  });

commander.parse(process.argv);
