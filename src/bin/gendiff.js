#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';
import diff from '..';

commander.version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const first = JSON.parse(fs.readFileSync(firstConfig));
    const second = JSON.parse(fs.readFileSync(secondConfig));
    console.log(diff(first, second));
  });

commander.parse(process.argv);
