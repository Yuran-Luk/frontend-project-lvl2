#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import commander from 'commander';
import diff from '../index.js';

commander.version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((firstConfig) => {
    console.log(diff(firstConfig));
  });

commander.parse(process.argv);
