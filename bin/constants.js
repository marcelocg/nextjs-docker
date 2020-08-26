'use strict';

const ORG = process.env.ORG || 'marcelocg';
const REPO = 'vercel/next.js';
const BASE_IMAGE_NAME = `${ORG}/nextjs-base`;
const NEXTJS_IMAGE_NAME = `${ORG}/nextjs`;
const NODE_VERSIONS = [12];
const LATEST_NODE_VERSION = 12;

module.exports = {
  ORG,
  REPO,
  BASE_IMAGE_NAME,
  NEXTJS_IMAGE_NAME,
  NODE_VERSIONS,
  LATEST_NODE_VERSION,
};
