#!/usr/bin/env node
/* eslint-disable import/extensions */
import commander from 'commander';
import diff from '../index.js';

commander.version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig>')
  .action((firstConfig) => {
    console.log(diff(firstConfig));
  });

commander.parse(process.argv);
