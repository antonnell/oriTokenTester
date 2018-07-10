var Web3 = require('web3');
const config = require('./config.js');

const ABI =  config.originTokenABI;
const ADDRESS = config.originTokenAddress;
const PROVIDER = config.provider;
const PRIVATE_KEY = config.privateKey;

let web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER));

const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;


var OriginTokenContract = new web3.eth.Contract(ABI, ADDRESS);

// OriginTokenContract.methods.getAmbassadorMonthlyRewardsByPosition(20)
//   .call()
//   .then((result)  => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   });


// console.log(web3.eth.defaultAccount)
// OriginTokenContract.methods.owner()
//   .call()
//   .then((result)  => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   });
//
// OriginTokenContract.methods.voteOpen()
//   .call()
//   .then((result)  => {
//     console.log(result)
//   })
//   .catch((err) => {
//     console.log(err)
//   });


//ADD THE FOUNDATION TO THE CONTRACT. REGISTER!
// createNewClaimer(account.address, () => {
//   setFoundationAddress(account.address, () => {
//     getClaimableBalance(account.address, () => {
//       getBalance(account.address, () => {
//         claimTokens(account.address, () => {
//           getClaimableBalance(account.address, () => {
//             getBalance(account.address, () => {
//               console.log("OK")
//             })
//           })
//         })
//       })
//     })
//   })
// })

//SET FOUNDATION ADDRESS
// setFoundationAddress(account.address, () => { /* 0x0000000000000000000000000000000000000000 */
//   getClaimableBalance(account.address, () => {
//     console.log("OK")
//   })
// })

//GET FOUNDATION ADDRESS
// getFoundationAddress(() => {
//   console.log("OK")
// })

//ADD THE CLAIMER TO THE CONTRACT. REGISTER!
// createNewClaimer(account.address, () => {
//   getClaimableBalance(account.address, () => {
//     getBalance(account.address, () => {
//       console.log("OK")
//     })
//   })
// })

//CLAIM TOKENS ON THE ACCOUNT
// claimTokens(account.address, () => {
//   getClaimableBalance(account.address, () => {
//     getBalance(account.address, () => {
//       console.log("OK")
//     })
//   })
// })

//CHECK BALANCE
// getClaimableBalance(account.address, () => {
//   getBalance(account.address, () => {
//     console.log("OK")
//   })
// })

//GET TOTAL SUPPLY
// getTotalSupply(() => {
//   console.log("OK")
// })


// CREATE CLAIMER, CLAIM THEN STAKE OUR TOKENS
// createNewClaimer(account.address, () => {
//   getClaimableBalance(account.address, () => {
//     claimTokens(account.address, () => {
//       getBalance(account.address, (balance) => {
//         startStaking(balance, () => {
//           stakeOf(account.address, () => {
//             console.log("OK")
//           })
//         })
//       })
//     })
//   })
// })

// START STAKING TOKENS
// getBalance(account.address, (balance) => {
//   stakeOf(account.address, () => {
//     startStaking(balance, () => {
//       getBalance(account.address, (balance) => {
//         stakeOf(account.address, () => {
//           console.log("OK")
//         })
//       })
//     })
//   })
// })

// STOP STAKING TOKENS
// getBalance(account.address, (balance) => {
//   stakeOf(account.address, (stake) => {
//     stopStaking(stake, () => {
//       getBalance(account.address, (balance) => {
//         stakeOf(account.address, () => {
//           console.log("OK")
//         })
//       })
//     })
//   })
// })

// getBalance(account.address, (balance) => {
//   stakeOf(account.address, () => {
//     console.log("OK")
//   })
// })


// START THE VOTING PROCESS
// startVote(() => {
//   console.log("OK")
// })

// ADD CANDIDATES TO THE SMART CONTRACt
// addToCandidateList(account.address, 'Person', 'A', 'Code Reviewer', () => {
//   addToCandidateList('0xB39F32F5E906fD32d51d88751f1d768EDf98F317', 'Person', 'B', 'Influencer', () => {
//     console.log("OK")
//   })
// })

//GET THE CANDIDATES BY INDEX
// getCandidateList(0, () => {
//   getCandidateList(1, () => {
//     console.log("OK")
//   })
// })

// CAST VOTE!
// getCandidateList(0, (candidate) => {
//   castVote(account.address, () => {
//     getCandidateList(0, () => {
//       console.log("OK")
//     })
//   })
// })

// END THE VOTING PROCESS
// endVote(() => {
//   getAmbassadorList(0, () => {
//     getAmbassadorList(1, () => {
//       console.log("OK")
//     })
//   })
// })

// getBalance('0xb258aD4125e84068F3A47fbBC4F6aCeD2bC148EC', (balance) => {
//   console.log("OK")
// })

// getAmbassadorList(1, () => {
//   console.log("OK")
// })

// getStakeHistory(() => {
//   console.log("OK")
// })

// getUserStakeHistory(account.address, () => {
//   console.log("OK")
// })

function getUserStakeHistory(address, callback) {
  OriginTokenContract.methods.getUserStakeHistory(address)
    .call()
    .then((res) => {
      console.log("getUserStakeHistory: ", res)
      callback(res)
    })
    .catch((err) => {
      console.log(err)
    });
}

function getStakeHistory(callback) {
  OriginTokenContract.methods.getStakeHistory()
    .call()
    .then((res) => {
      console.log("getStakeHistory: ", res)
      callback(res)
    })
    .catch((err) => {
      console.log(err)
    });
}

function getAmbassadorList(index, callback) {
  OriginTokenContract.methods.getAmbassadorList(index)
    .call()
    .then((res) => {
      console.log("getAmbassadorList: ", res)
      callback(res)
    })
    .catch((err) => {
      console.log(err)
    });
}

function endVote(callback) {
  OriginTokenContract.methods.endVote()
    .send({from: web3.eth.defaultAccount, gas: 400000})
    .then((res) => {
      console.log('endVote successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function castVote(address, callback) {
  OriginTokenContract.methods.castVote(address)
    .send({from: web3.eth.defaultAccount, gas: 200000})
    .then((res) => {
      console.log('castVote successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function startVote(callback) {
  OriginTokenContract.methods.startVote()
    .send({from: web3.eth.defaultAccount, gas: 200000})
    .then((res) => {
      console.log('startVote successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}


function getCandidateList(index, callback) {
  OriginTokenContract.methods.getCandidateList(index)
    .call()
    .then((res) => {
      console.log("getCandidateList: ", res)
      callback(res)
    })
    .catch((err) => {
      console.log(err)
    });
}

function addToCandidateList(address, name, surname, metadata, callback) {
  OriginTokenContract.methods.addToCandidateList(address, name, surname, metadata)
    .send({from: web3.eth.defaultAccount, gas: 200000})
    .then((res) => {
      console.log('addToCandidateList successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function stopStaking(balance, callback) {
  OriginTokenContract.methods.stopStaking(balance)
    .send({from: web3.eth.defaultAccount, gas: 400000})
    .then((res) => {
      console.log('stopStaking successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function startStaking(balance, callback) {
  OriginTokenContract.methods.startStaking(balance)
    .send({from: web3.eth.defaultAccount, gas: 400000})
    .then((res) => {
      console.log('startStaking successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function stakeOf(address, callback) {
  OriginTokenContract.methods.stakeOf(address)
    .call()
    .then((res) => {
      console.log("stakeOf: ", res)
      callback(res)
    })
    .catch((err) => {
      console.log(err)
    });
}

function getFoundationAddress(callback) {
  OriginTokenContract.methods.getFoundationAddress()
    .call()
    .then((res) => {
      console.log("getFoundationAddress: ", res)
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function setFoundationAddress(address, callback) {
  OriginTokenContract.methods.setFoundationAddress(address)
    .send({from: web3.eth.defaultAccount, gas: 200000})
    .then((result)  => {
      console.log('setFoundationAddress successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function createNewClaimer(address, callback) {
  OriginTokenContract.methods.createNewClaimer(address, 2000000)
    .send({from: web3.eth.defaultAccount, gas: 200000})
    .then((result)  => {
      console.log('createNewClaimer successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function getTotalSupply(callback) {
  OriginTokenContract.methods.totalSupply()
    .call()
    .then((res) => {
      console.log("getTotalSupply: ", res)
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function getClaimableBalance(address, callback) {
  OriginTokenContract.methods.getClaimableBalance(address)
    .call()
    .then((res) => {
      console.log("getClaimableBalance: ", res)
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}

function getBalance(address, callback) {
  OriginTokenContract.methods.balanceOf(address)
    .call()
    .then((res) => {
      console.log("getBalance: ", res)
      callback(res)
    })
    .catch((err) => {
      console.log(err)
    });
}

function claimTokens(address, callback) {
  OriginTokenContract.methods.claim()
    .send({from: web3.eth.defaultAccount, gas: 200000})
    .then((result)  => {
      console.log('claimTokens successful')
      callback()
    })
    .catch((err) => {
      console.log(err)
    });
}
