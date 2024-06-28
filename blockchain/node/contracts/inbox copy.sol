// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;


contract Lottery {
  address public manager;
  address[] public players;

  constructor() {
    manager = msg.sender;
  }
    
  function enter() public payable {
    require(msg.value > 0.01 ether);
    players.push(msg.sender);
  }

  function random() private view returns (uint) {
    return uint(keccak256(abi.encode(blockhash(block.number - 1), block.timestamp, players)));
    // return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
  }  

  function pickWinner() public auth {
    uint index = random() % players.length;

    address payable winner = payable(players[index]);
    
    winner.transfer(address(this).balance);
    players = new address[](0);
  }

  function getPlayers() public  view returns (address[] memory) {
    return players;    
  }

  modifier auth() {
    require(msg.sender == manager);
    _;
  }

 
} 
