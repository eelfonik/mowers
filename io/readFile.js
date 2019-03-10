const fs = require("fs");
const es = require('event-stream');
const { lineHandler } = require('../app/index');
const { initReadStatus } = require('./model')

const readFile = inputSource =>
  new Promise((resolve, reject) => {
    let readStatus = initReadStatus(inputSource)

    const inputStream = fs.createReadStream(inputSource);
    inputStream.on("error", err => {
      reject(new Error(`iput error: ${err}`));
    });

    const outputStream = fs.createWriteStream("./fs.txt");
    outputStream.on("error", err => {
      reject(new Error(`output error: ${err}`))
    })

    inputStream
    .pipe(es.split())
    .pipe(es.map(lineHandler(readStatus)))
    .pipe(outputStream)

    resolve();
  });

module.exports = { readFile, lineHandler };
