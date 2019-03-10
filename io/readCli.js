const readline = require("readline");
const { lineHandler } = require('../app/index');
const { initReadStatus } = require('./model')

const questions = [
  `What is the lawn size in x & y? (separate x y by space)\nEX: 5 5\n`,
  `What is the initial position & orientation of mower1? (separate by space)\nEX: 3 4 E\n`,
  `What is the commands of mower1? (available commands are F(forward), L(turn Left), and R(turn Right))\n`
];

const ask = (rl, question) =>
  new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });

const askQuestions = () =>
  new Promise(async resolve => {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let readStatus = initReadStatus('cli input')
    
    for (let i = 0; i < questions.length; i++) {
      const answer = await ask(rl, questions[i]);
      readStatus.lineCount = i;
      lineHandler(readStatus)(answer)
    }
    rl.close();
    resolve(readStatus);
  });

module.exports = { askQuestions, ask };
