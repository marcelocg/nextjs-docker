#!/usr/bin/env node
'use strict';

const yargs = require('yargs');

const { buildNextjsImages } = require('./nextjs');

async function run() {
  const shouldPush = argv.push;
  const version = argv.nextjsVersion;

  const images = await buildNextjsImages({ shouldPush: shouldPush });
  logImages(images);

}

const argv = yargs
  .option('push', {
    alias: 'p',
    describe: 'Should push the image after creating it',
    default: process.env.PUSH || false,
    type: 'boolean',
  })
  .option('nextjsVersion', {
    describe: 'Next.js version to build',
    default: process.env.NEXTJS_VERSION || 'latest',
    type: 'string',
  })
  .version(false)
  .help('h')
  .alias('h', 'help').argv;

if (argv.help) {
  yargs.showHelp();
  return;
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});

function logImages(imgs) {
  console.log('---------------------------------------');
  console.log('Images created:');
  console.log(imgs.map(img => `- ${img}`).join('\n'));
  console.log('---------------------------------------');
}
