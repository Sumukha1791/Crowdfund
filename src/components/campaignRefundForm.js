import yo from 'yo-yo';
import methodABIInputsForm from './methodABIInputsForm';

/* <div id="campaignContribution_inputs">
  ${methodABIInputsForm({campaignObject: campaignObject, methodType: 'refund'})}
</div> */

// main export
export default function campaignRefundForm(options) {
  const campaignObject = options.campaignObject;
  const defaultAccount = options.defaultAccount;
  const t = options.t;

  return yo`
  <div id="view-campaign-refund-form" class="row center-block container" style="margin-top: 80px; margin-bottom: 150px; display: none;">

    <div class="row center-block container">
      <input type="hidden" value="${campaignObject.id}" id="campaign_id" />

      <div class="row center-block container text-center" style="margin-bottom: 60px;">
        <a href="/campaign/${campaignObject.id}/" target="_blank" style="color: #333; text-decoration: none;">
          <h1 class="text-pretty-huge">${campaignObject.name}</h1>
        </a>
        <h4>by ${campaignObject.owner}</h4>
      </div>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-8 no-border-xs no-border-sm" style="border-right: 3px solid #E1E1E1; padding-right: 50px;">



      <br />

      <br />
      <h4>Selected Account</h4>
      <h5>${defaultAccount()}</h5>
      <br />
      <h4>Selected Account Balance</h4>
      <h5>30 Ether (ETH)</h5>
      <br />
      <h4>Contract Address</h4>
      <h5>${campaignObject.addr}</h5>
      <br />
      <h4>Contract ABI</h4>
      <pre style="height: 150px; overflow: scroll;">${JSON.stringify(campaignObject.abi, null, 2)}</pre>
      <br />
      <h4>Contribute Method ABI</h4>
      <h5>${campaignObject.refundMethodABI}</h5>
      <br />
      <h4>Web3 Provider</h4>
      <h5>--</h5>
    </div>
  </div>`;
}
