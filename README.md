## Prerequisite
- Clone or download this repo, and make sure you have [node](https://nodejs.org/en/) installed locally (Or use [nvm](https://github.com/creationix/nvm)), required node.js > 8.
- From the root of repo, run `npm i` to install dependencies (dependencies are mostly for unit test, except `event-stream`, we do nothing fancy with `express`, `hapi` or `kafka-node`)

## Run with default txt file
- `npm run txt`
- check the `fs.txt` generated at the root of repo for result

## Run with other txt file
- `node index.js --file=path/to/your.txt` ( EX: `node index.js --file=./test2.txt`, which contains not validated inputs and should throw errors )
- check the `fs.txt` generated if success

## Run experimental test that takes cli input
- `npm run cli`
- answer the questions (for now only support one mower 👀)
- check console output if success (or errored out in console)

## Run unit test
`npm run test`