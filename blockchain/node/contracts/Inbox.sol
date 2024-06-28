// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;


contract Inbox {
  string public message;

  constructor(string memory name) {
    message = name;
  }

  function setMessage(string memory name) public {
    message = name;    
  }
} 
