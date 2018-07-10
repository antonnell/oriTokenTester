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


giveBalance(account.address, () => {
  startStaking(balance)
})


//CLAIM TOKENS ON THE ACCOUNT
/*claimTokens(account.address, () => {
  getClaimableBalance(account.address, () => {
    getBalance(account.address, () => {
      console.log("OK")
    })
  })
})*/

//CHECK BALANCE
/*getClaimableBalance(account.address, () => {
  getBalance(account.address, () => {
    console.log("OK")
  })
})*/

//GET TOTAL SUPPLY
/*getTotalSupply(() => {
  console.log("OK")
})*/


// STAKE OUR TOKENS
createNewClaimer(account.address, () => {
  getClaimableBalance(account.address, () => {
    claimTokens(account.address, () => {
      getBalance(account.address, (balance) => {
        startStaking(balance, () => {
          stakeOf(account.address, () => {
            console.log("OK")
          })
        })
      })
    })
  })
})

// getBalance(account.address, (balance) => {
//   startStaking(balance, () => {
//     stakeOf(account.address, () => {
//       console.log("OK")
//     })
//   })
// })

// getBalance(account.address, (balance) => {
//   stopStaking(balance, () => {
//     stakeOf(account.address, () => {
//       console.log("OK")
//     })
//   })
// })

function stopStaking(balance, callback) {
  OriginTokenContract.methods.stopStaking(balance)
    .call()
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
    .call()
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
      callback()
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
