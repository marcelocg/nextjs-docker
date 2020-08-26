'use strict';

const semver = require('semver');

const { execDocker, getLatestNextjsRelease } = require('./utils');
const { NEXTJS_IMAGE_NAME, NODE_VERSIONS, LATEST_NODE_VERSION } = require('./constants');

module.exports = {
  buildNextjsImages,
};

async function buildNextjsImages({ version, shouldPush = false } = {}) {
  if (version === 'latest' || !version) {
    version = await getLatestNextjsRelease();
  }

  if (semver.valid(version) === null) {
    throw new Error('Invalid Next.js version provided: ' + version);
  }

  const createdTags = [];

  for (const nodeVersion of NODE_VERSIONS) {
    const tags = await buildNextjsImage({
      nodeVersion,
      version,
      shouldPush,
    });

    createdTags.push(...tags);
  }

  return createdTags.map(tag => `${NEXTJS_IMAGE_NAME}:${tag}`);
}

async function buildNextjsImage({ nodeVersion, version, shouldPush = false }) {
  let tmpImg = `${NEXTJS_IMAGE_NAME}:tmp`;

  await execDocker([
    'build',
    '--build-arg',
    `NODE_VERSION=${nodeVersion}-alpine`,
    '--build-arg',
    `NEXTJS_VERSION=${version}`,
    '-t',
    tmpImg,
    './nextjs',
  ]);

  const tags = buildNextjsTags({ version, nodeVersion });

  for (let tag of tags) {
    await execDocker(['tag', tmpImg, `${NEXTJS_IMAGE_NAME}:${tag}`]);

    if (shouldPush) {
      await execDocker(['push', `${NEXTJS_IMAGE_NAME}:${tag}`]);
    }
  }

  await execDocker(['image', 'rm', tmpImg]);

  return tags;
}

function buildNextjsTags({ version: nextjsVersion, nodeVersion }) {
  let tags = [];
  let versions = [nextjsVersion];

  for (const version of versions) {
    tags.push(`${version}-node${nodeVersion}`);

    if (nodeVersion === LATEST_NODE_VERSION) {
      tags.push(`${version}`);
    }
  }

  if (nodeVersion === LATEST_NODE_VERSION) {
    tags.push('latest');
  }

  return tags;
}
