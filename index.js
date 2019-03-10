const Logger = require('./app/utils/logger')
const { readFile } = require('./io/readFile');
const { askQuestions } = require('./io/readCli');

const main = async () => {
  let inputSource;
  let mode;
  for (const arg of process.argv.slice(2)) {
    const option = arg.split('=')
    if (option[0] === '--mode') {
      mode = option[1];
    }
    if (option[0] === '--file') {
      inputSource = option[1] || './test.txt'
    }
  }
  const useCLI = mode === 'cli';
  try {
    useCLI ? await askQuestions() : await readFile(inputSource);
  } catch(err) {
    Logger.error(err);
  };
}

main()
