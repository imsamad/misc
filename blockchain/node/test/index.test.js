import assert from 'assert';
import Web3 from 'web3';
import ganache from 'ganache-cli';

import compiled from '../compile.js';

const { abi, bytecode } = compiled();

const web3 = new Web3('http://127.0.0.1:8545');
// const web3 = new Web3(ganache.provider());

let accounts, inbox;

beforeEach(async () => {
  try {
    // get a list of accounts
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(abi)
      .deploy({
        data: '0x' + bytecode,
        arguments: ['Hello world!'],
      })
      .send({
        from: accounts[0],
        gas: '1000000',
        // gasPrice: 1000000000,
      });

    console.log('first');
    // Use one of the account to deply contract
  } catch (error) {
    console.log('error: ', error);
  } finally {
    console.log('-==========================================================-');
  }
});

describe('Inbox', () => {
  it('deploy contract', () => {
    try {
      console.log('accounts ', accounts);
      console.log('inbox ', inbox);
    } catch (err) {
      console.log('err: ', err);
    }
  });
});
