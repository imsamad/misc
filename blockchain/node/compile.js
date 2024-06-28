import path from 'path';
import fs from 'fs';
import solc from 'solc';

const inboxPath = path.resolve(process.cwd(), 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compiledSrc = () => {
  const compiledSrc2 = JSON.parse(solc.compile(JSON.stringify(input)));

  const abi = compiledSrc2.contracts['Inbox.sol'].Inbox.abi;

  const bytecode =
    compiledSrc2.contracts['Inbox.sol'].Inbox.evm.bytecode.object;

  return {
    abi,
    bytecode,
    interface: abi,
  };
};

export default compiledSrc;
