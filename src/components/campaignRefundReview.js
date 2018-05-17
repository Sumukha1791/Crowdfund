import yo from 'yo-yo';

// main import
import methodABIInputsReview from './methodABIInputsReview';

// main export
export default function campaignRefundReview(options) {
  const campaignObject = options.campaignObject;
  const defaultAccount = options.defaultAccount;
  const t = options.t;

  return yo`
  <div id="view-campaign-refund-review" class="center-block container" style="margin-top: 40px; margin-bottom: 150px; display: none;">
    <div id="campaign-refund-header" class="row center-block container" style="margin-top: 80px;">
      <input type="hidden" value="${campaignObject.id}" id="campaign_id" />

      <div class="row center-block container text-center" style="margin-bottom: 60px;">
        <a href="/campaign/${campaignObject.id}/" target="_blank" style="color: #333; text-decoration: none;">
          <h1 class="text-pretty-huge">${campaignObject.name}</h1>
        </a>
        <h4>by ${campaignObject.owner}</h4>
      </div>
    </div>

      <div class="row">
        <div class="col-xs-12">
          <h3>Review Refund
            <a href="javascript:window.print()">
              <button class="btn btn-sm text-gray" style="float: right;">
                Save Review Copy
              </button>
            </a>
          </h3>
          <h4>Almost done! Please review your refund information before proceeding.</h4>
          <br />
          <br />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-6">
          <div id="campaign_contributeReviewInputs">
            ${methodABIInputsReview({
              campaignObject: campaignObject,
              methodType: 'refund',
            })}</div>

       

        </div>
      </div>
    </div>`;
}
