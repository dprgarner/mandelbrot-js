const _ = require('underscore');

const createMp4 = require('./animate').createMp4;
const find = require('./find');
const {TEST} = require('./env');

const width = TEST ? 504 / 2 : 504;
const approxHeight = Math.floor(width * 2 / 3);
const height = approxHeight + approxHeight % 2; // Height must be divisible by 2

let startTime = Date.now();
let params = _.extend({}, find({width: 150, height: 100}), {
  width,
  height,
});

if (TEST) params.levels = 8;
console.log(`Found point after ${Math.round((Date.now() - startTime) / 1000)}s`);

// Create trial video
createMp4(params)
.then((outputFile) => {
  let seconds = Math.round((Date.now() - startTime) / 1000);
  console.log(`${outputFile} completed after ${seconds}s`);
})
.catch((err) => {
  console.error(err);
  console.error(`Errored after ${Date.now() - startTime}ms`);
  process.exit(1);
});