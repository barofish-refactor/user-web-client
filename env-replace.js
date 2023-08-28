/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs'); // Node.js가 16이상이면 "node:fs", 아니면 "fs"

const CHARSET = 'utf8';

const args = process.argv.slice(2);
let selectedEnv = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--mode') {
    selectedEnv = args[i + 1];
    break;
  }
  if (args[i] === '-h' || args[i] === '--help') {
    console.log('Usage: node env-replace.js --mode [env]');
    console.log('env: dev, master');
    process.exit(0);
  }
}

fs.readFile(`.env.${selectedEnv}`, CHARSET, (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    fs.writeFile('.env', data, CHARSET, err => {
      if (err) throw new Error(err);
    });
  }
});
