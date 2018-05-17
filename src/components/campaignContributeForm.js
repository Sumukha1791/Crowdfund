import yo from 'yo-yo';
import BigNumber from 'bignumber.js';
import { etherScanAddressUrl } from 'weifund-util';

import campaignContributeNav from './campaignContributeNav';
import { getNetwork, txObject } from '../environment';
import { web3 } from '../web3';

export default function campaignContributeForm(options) {
  const campaignObject = options.campaignObject;
  const defaultAccount = options.defaultAccount;
  const gasPrice = web3.toWei('0.00000002', 'ether');
  const actualGasCost = (new BigNumber(txObject().gas)).times(gasPrice);
  const t = options.t;

  return yo`<div>
  <div id="view-campaign-contribute-form" class="row center-block container"
    style="margin-top: 80px; margin-bottom: 150px;">
    <div class="col-xs-12 col-sm-6 col-md-8 no-border-xs no-border-sm"
      style="padding-right: 50px;">
      <h3>Contribution Amount</h3>
      <h4>Please select the amount you want to contribute to this campaign.</h4>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-8">
          <div class="input-slider input-slider-lg"
            id="campaign_contributeSlider"
            data-value-max="1"
            data-input-id="campaign_contributeAmount">
            <div class="input-slider-rail">
              <div id="contribute-highlight-rail" class="input-slider-rail-highlight"></div>
              <div class="input-slider-bar"></div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-4">
          <div class="input-group" id="campaign_contributeAmountGroup">
            <input type="text" id="campaign_contributeAmount" value="0.125"
              class="form-control input-lg" placeholder="i.e. 1" aria-describedby="basic-addon2" />
            <span class="input-group-addon" id="basic-addon2">ether</span>
          </div>
        </div>
      </div>



      <input type="hidden" id="campaignFormID" value="${campaignObject.id}" />

      <div id="campaignContribution_inputs">
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <button id="campaign-contribute-review-button" class="btn btn-primary btn-lg">
        Review Contribution
      </button>
      <br /><br />
      <div id="campaign-contribute-form-response"
        class="alert alert-dismissible alert-warning" style="display: none;">
        <h4>Warning!</h4>
        <p></p>
      </div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 no-padding-xs text-break-all"
      style="border-left: 3px solid #E1E1E1; padding-left: 50px;">
      <h3>Technical Details</h3>
      <br />
      <h4>Network</h4>
      <h5>Ethereum (ETH) ${getNetwork()} Network*</h5>
      <br />
      <h4>Selected Account</h4>
      <h5 id="defaultAccountAddress">0x</h5>
      <br />
      <h4>Selected Account Balance</h4>
      <h5><span id="defaultAccountBalance">0</span> Ether (ETH)</h5>
      <br />
      <h4>Token Price</h4>
      <h5><span id="contribute-token-price">0.125</span> Ether (ETH)</h5>
      <br />
      <h4>Approx. Gas Cost</h4>
      <h5><span>${web3.fromWei(actualGasCost, 'ether').toString(10)}</span> Ether (ETH)</h5>
      <br />
      <h4>Contract Address</h4>
      <h5>${campaignObject.addr}</h5>
      <br />
      <h4>Contract ABI</h4>
      <pre style="height: 150px; overflow: scroll;">${
        JSON.stringify(campaignObject.abi, null, 2)
      }</pre>
      <br />
      <h4>Contribute Method ABI</h4>
      <h5>${campaignObject.contributeMethodABI}</h5>
      <br />
      <h4>Provider</h4>
      <h5>Hooked Web3 Provider</h5>
    </div>
    ${campaignContributeNav({
      backURL: `/campaign/${options.campaignObject.id}/contribute/`,
      showNextButton: false,
    })}
  </div></div>`;
}
