#!/usr/bin/env node
import commander from 'commander';
import diff from '../src';

commander.version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'diff')
  .action((firstConfig, secondConfig) => {
    console.log(diff(firstConfig, secondConfig, commander.format));
  });

commander.parse(process.argv);
