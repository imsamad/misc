import HDWalletProvider from '@truffle/hdwallet-provider';

import Web3 from 'web3';

import compiledSrc from './compile';

const { bytecode, abi } = compiledSrc();
const menemonic = `excess galaxy fiscal whip nasty book ocean brief bleak erase shine program`;
// 0fd21b9805e173f6b2cf10042addde159c8d01bf1ba1479fdbb0a340980f4b8e

const provider = new HDWalletProvider(menemonic);

// excess galaxy fiscal whip nasty book ocean brief bleak erase shine program

// Pub Key :- 0xa07150F82247C10fF5E19221e7fE286529419C4e
