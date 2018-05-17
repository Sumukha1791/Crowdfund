const BigNumber = require('bignumber.js');

// utils
const utils = require('./node_modules/weifund-lib/src/utils');

const campaignDataObject = {blockNumber: 2881424 , expiry:new BigNumber('3241898') };
var secondsDiff = campaignDataObject.expiry.minus(campaignDataObject.blockNumber).times(17).round(0); // eslint-disable-line

  if (secondsDiff.lt(0)) {
    secondsDiff = new BigNumber(0);
  }

  if (secondsDiff.greaterThanOrEqualTo(0)) {
    campaignDataObject.approximateSecondsToGo = secondsDiff;
  }

  campaignDataObject.approximateDaysToGo = secondsDiff.dividedBy(new BigNumber('86400')).round(0);
  console.log(campaignDataObject.approximateDaysToGo);
  campaignDataObject.approximateExpiryTimestamp = secondsDiff.add(new BigNumber((new Date()).getTime() / 1000)).round(0);
  console.log((new BigNumber((new Date()).getTime() / 1000)).round(0));
  console.log(campaignDataObject.approximateExpiryTimestamp.toNumber(10) * 1000);
  campaignDataObject.approximateExpiryDate = new Date(campaignDataObject.approximateExpiryTimestamp.toNumber(10) * 1000);
  console.log(campaignDataObject.approximateExpiryDate);

  // if days to go less than zero
  if (campaignDataObject.approximateDaysToGo.lt(new BigNumber(0))) {
    campaignDataObject.approximateDaysToGo = new BigNumber(0);
  }