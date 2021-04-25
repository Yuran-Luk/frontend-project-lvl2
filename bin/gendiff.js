#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import program from 'commander';
import diff from '../index.js';

// const program = new Command();
program.version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2));
  });

program.parse(process.argv);
