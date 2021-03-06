import yo from 'yo-yo';
import { el } from '../document';
import { web3 } from '../web3';
import BigNumber from 'bignumber.js';
import { getAccountBalance, txObject, getTokenPrice } from '../environment';

export default function handleCampaignContributeReview(campaignData) {
  const campaignContributeID = el('#campaignFormID').value;
  const contributeAmount = el('#campaign_contributeAmount').value;

  const contirbuteAmountBN = new BigNumber(contributeAmount);
  const accountBalance = getAccountBalance();
  const gasPrice = web3.toWei('0.00000002', 'ether');
  const actualGasCost = (new BigNumber(txObject().gas)).times(gasPrice);
  const contributionAmountWei = new BigNumber(web3.toWei(contributeAmount, 'ether'));
  const contributeTotal = contirbuteAmountBN.add(web3.fromWei(actualGasCost, 'ether'));
  const units = new BigNumber(contirbuteAmountBN.dividedBy(getTokenPrice()).toFixed(0)).times(getTokenPrice());

  // parse float
   if (!units.eq(contirbuteAmountBN)) {
    el('#campaign-contribute-review-button').href = ``;
    el('#campaign_contributeAmountGroup').style.border = `red solid 1px`;
    el('#campaign_contributeAmount').focus();
    el('#campaign_contributeAmount').blur();

    // promt error
    el('#campaign-contribute-form-response').innerHTML = '';
    el('#campaign-contribute-form-response').style.display = 'block';
    el('#campaign-contribute-form-response').appendChild(yo`<span>
      <h2>Invalid Contribution Amount</h2>
      <p>
        You are attempting to contribute an invalid amount.
        You may only contribute in increments of ${getTokenPrice().toString(10)} ether.
        <br />
        <br />
        <small>Note, this is to avoid unnecessary ether from being contributed.</small>
      </p>
    </span>`);

    return;
  } else {
    el('#campaign_contributeAmountGroup').style.border = `none`;
  }

  // parse float
  if ((contributionAmountWei.add(campaignData.amountRaised)).gt(campaignData.fundingCap)) {
    el('#campaign-contribute-review-button').href = ``;
    el('#campaign_contributeAmountGroup').style.border = `red solid 1px`;
    el('#campaign_contributeAmount').focus();
    el('#campaign_contributeAmount').blur();

    // promt error
    el('#campaign-contribute-form-response').innerHTML = '';
    el('#campaign-contribute-form-response').style.display = 'block';
    el('#campaign-contribute-form-response').appendChild(yo`<span>
      <h2>Invalid Contribution Amount</h2>
      <p>You are attempting to contribute more than the funding cap.</p>
    </span>`);

    return;
  } else {
    el('#campaign_contributeAmountGroup').style.border = `none`;
  } 

  // parse float
   if (contributionAmountWei.add(actualGasCost).gt(accountBalance)) {
    el('#campaign-contribute-review-button').href = ``;
    el('#campaign_contributeAmountGroup').style.border = `red solid 1px`;
    el('#campaign_contributeAmount').focus();
    el('#campaign_contributeAmount').blur();

    // promt error
    el('#campaign-contribute-form-response').innerHTML = '';
    el('#campaign-contribute-form-response').style.display = 'block';
    el('#campaign-contribute-form-response').appendChild(yo`<span>
      <h2>Invalid Contribution Amount</h2>
      <p>You are attempting to contribute more Ether than you have in your balance (with gas costs included).</p>
    </span>`);

    return;
  } else {
    el('#campaign_contributeAmountGroup').style.border = `none`;
  } 

  // parse float
  if (contirbuteAmountBN.lt(getTokenPrice())) {
    el('#campaign-contribute-review-button').href = ``;
    el('#campaign_contributeAmountGroup').style.border = `red solid 1px`;
    el('#campaign_contributeAmount').focus();
    el('#campaign_contributeAmount').blur();

    // promt error
    el('#campaign-contribute-form-response').innerHTML = '';
    el('#campaign-contribute-form-response').style.display = 'block';
    el('#campaign-contribute-form-response').appendChild(yo`<span>
      <h2>Invalid Contribution Amount</h2>
      <p>You must select a contribution amount greater than ${getTokenPrice().toString(10)} Ether (ETH).</p>
    </span>`);

    return;
  } else {
    el('#campaign_contributeAmountGroup').style.border = `none`;
  }

  

  el('#campaign_contribute_info_response').style.display = 'none';
  el('#campaign_contribute_warning_response').style.display = 'none';

  el('#campaign-contribute-form-response').style.display = 'none';
  el('#campaign_contributeReview_contributeGas').innerHTML = '';
  el('#campaign_contributeReview_contributeGas').appendChild(yo`<span>${web3.fromWei(actualGasCost, 'ether').toString(10)}</span>`);
  el('#campaign_contributeReview_contributeAmount').innerHTML = '';
  el('#campaign_contributeReview_contributeAmount').appendChild(yo`<span>${contributeAmount}</span>`);
  el('#campaign_contributeReview_totalContributeAmount').innerHTML = '';
  el('#campaign_contributeReview_totalContributeAmount').appendChild(yo`<span>${contributeTotal.toString(10)}</span>`);

  // return true;
  return true;
};
