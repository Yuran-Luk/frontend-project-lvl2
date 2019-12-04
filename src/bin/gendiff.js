#!/usr/bin/env node
import commander from 'commander';
import fs from 'fs';
import parse from '..';
import render from '../utils';

commander.version('0.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const first = JSON.parse(fs.readFileSync(firstConfig));
    const second = JSON.parse(fs.readFileSync(secondConfig));
    console.log(render(parse(first, second)));
  });

commander.parse(process.argv);
