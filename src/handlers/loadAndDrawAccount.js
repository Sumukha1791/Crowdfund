// requires
import { keyStore } from 'eth-lightwallet';
import store from 'store';

// utils
import { log, etherScanAddressUrl, parseSolidityMethodName,
  etherScanTxHashUrl, oneDay, emptyWeb3Address } from 'weifund-util';

// document helper
import { el } from '../document';

// env
import { setDefaultAccount, getDefaultAccount, getCampaign, setCampaign,
  getNetwork, getLocale, getContractEnvironment, txObject } from '../environment';

// components
import { viewLoader } from '../components';

// web3
import { web3 } from '../web3';
import { ipfs } from '../ipfs';
import { refreshPageButtons } from '../router';
import { t } from '../i18n';

// Contracts
import Contracts from 'weifund-contracts';
const contracts = new Contracts(getContractEnvironment(), web3.currentProvider);
const IssuedToken = contracts.IssuedToken.factory;

// export module
module.exports = loadAndDrawAccount;

// draw account page
function loadAndDrawAccount(callback) {
  // draw loader
  el('#view-focus').innerHTML = viewLoader({t: t});

  web3.eth.getAccounts((err, accounts) => {
    if (!accounts) {
      accounts = ['0xc5b14f77554e4d6f1060b2d95f26a31191bd46c9'];
    }

    el('#accountAddress').innerHTML = accounts[0];

    web3.eth.getBalance(accounts[0], (err, balance) => {
      el('#accountBalanceEther').innerHTML = web3.fromWei(balance, 'ether');
      el('#accountBalanceWei').innerHTML = web3.fromWei(balance, 'wei');
    });

    loadToken('0x1c79ee86aa0720eb7a5a77d0cb715c489850f421');

    function loadToken(addr) {
      const token = IssuedToken.at(addr);

      token.name((err, name) => {
        token.balanceOf(accounts[0], (err, accountTokenBalance) => {
          token.decimals((err, decimals) => {
            token.totalSupply((err, totalSupply) => {
              token.symbol((err, symbol) => {
                token.version((err, version) => {
                  const tokenHTML = `<div class="row">
                  <div class="col-sm-12">
                    <h3>${name} <small>(${symbol})</small></h3>
                    <div class="row">
                      <div class="col-sm-4">
                        <h4 style="text-overflow:ellipsis; overflow: hidden; width: 100px;">
                          ${token.address}
                        </h4>
                      </div>
                      <div class="col-sm-2">
                       <h4> v${version} </h4>
                      </div>
                      <div class="col-sm-6">
                        <h4>
                          total supply ${totalSupply.toString(10)}
                        </h4>
                      </div>
                    </div>

                    <hr />

                    <div class="row">
                      <div class="col-sm-6 text-left">
                        <h4>${accountTokenBalance.toString(10)} <small>${symbol}</small><h4>
                      </div>
                      <div class="col-sm-6 text-right">
                        <button id="openTransferBriad" class="btn btn-primary">Transfer</button>
                        <button id="openDebitBriad" class="btn btn-primary">Debit</button>
                        <button id="claimBriad" class="btn btn-success">Claim</button>
                      </div>
                    </div>

                    <div class="row" id="briadDebitWindow" style="display: none;">
                      <div class="col-sm-12">
                        <hr />
                      </div>

                      <div class="col-sm-5">
                        <input type="text" id="braidDebitAccount" placeholder="address" class="form-control"  />
                      </div>

                      <div class="col-sm-4 col-md-4 col-lg-4">
                        <input type="number" id="braidDebitAmount" placeholder="token amount" class="form-control" />
                      </div>

                      <div class="col-sm-3 text-right">
                        <button id="debitBriad" class="btn btn-primary">Debit Amount</butto>
                      </div>
                    </div>

                    <div class="row" id="briadTransferWindow" style="display: none;">
                      <div class="col-sm-12">
                        <hr />
                      </div>

                      <div class="col-sm-5">
                        <input type="text" id="braidTransferAccount" placeholder="address" class="form-control"  />
                      </div>

                      <div class="col-sm-4 col-md-4 col-lg-4">
                        <input type="number" id="braidTransferAmount" placeholder="token amount" class="form-control" />
                      </div>

                      <div class="col-sm-3 text-right">
                        <button id="transferBriad" class="btn btn-primary">Transfer Amount</butto>
                      </div>
                    </div>
                  </div>
                  </div>`;
                  el('#tokens').innerHTML = tokenHTML;

                  var open = 'none';

                  function updateTransferWindows(openWindow) {
                    if (openWindow === open) {
                      openWindow = 'none';
                    }

                    if (openWindow == 'none') {
                      el('#briadTransferWindow').style.display = 'none';
                      el('#briadDebitWindow').style.display = 'none';
                    } else if (openWindow == 'transfer') {
                      el('#briadTransferWindow').style.display = 'block';
                      el('#briadDebitWindow').style.display = 'none';
                    } else if (openWindow == 'debit') {
                      el('#briadTransferWindow').style.display = 'none';
                      el('#briadDebitWindow').style.display = 'block';
                    }

                    open = openWindow;
                  }

                  el('#openTransferBriad').onclick = () => {
                    updateTransferWindows('transfer');
                  };

                  el('#openDebitBriad').onclick = () => {
                    updateTransferWindows('debit');
                  };

                  el('#transferBriad').onclick = () => {
                    const transferAccount = el('#braidTransferAccount').value;
                    const transferAmount = el('#braidTransferAmount').value;

                    token.transfer(transferAccount, transferAmount, { from: accounts[0], gas: 3000000 }, (err, result) => {
                      console.log('trasfer!');
                    });
                  };

                  el('#debitBriad').onclick = () => {
                    const debitAccount = el('#braidDebitAccount').value;
                    const debitAmount = el('#braidDebitAmount').value;

                    token.approve(debitAccount, () => {
                      console.log('approve!');
                    });
                  };
                });
              });
            });
          });
        });
      });
    }
  });

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(store.get('lightwallet'));
  var dlAnchorElem = document.getElementById('downloadLightWallet');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "weifund-eth-lightwallet.json");

  // the seed is stored encrypted by a user-defined password
  el('#generateLightWallet').onclick = () => {
    var password = prompt('Enter password for encryption', 'password');

    keyStore.createVault({
      password: password,
      // seedPhrase: seedPhrase, // Optionally provide a 12-word seed phrase
      // salt: fixture.salt,     // Optionally provide a salt.
                                 // A unique salt will be generated otherwise.
      // hdPathString: hdPath    // Optional custom HD Path String
    }, function (err, ks) {
      store.set('lightwallet', ks.serialize());
    });
  };
}