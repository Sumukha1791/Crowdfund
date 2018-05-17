import yo from "yo-yo";
import campaignRegisterAddressForm from "./campaignRegisterAddressForm";

export default function campaignRegisterForm() {
  //const campaignObject = options.campaignObject;
  //const defaultAccount = options.defaultAccount;

  return yo`
  <div id="campaignRegisterForm" style="display:none">
   <div class="row center-block container" style="margin-top: 80px; margin-bottom: 150px; width:60%">
    <div class="row center-block">
    <h2>Register your dream campaign</h2>
    <br />
    <br />
      <form class="container-fluid"> 
             <input type="text" class="form-control" id="campaign_name" placeholder="Name of the Campaign"/>
              <br />
              <br />
              <input type="text" class="form-control" id="campaign_category" placeholder="Category" />
              <br />
              <br />
              <input type="text" class="form-control" id="campaign_description" placeholder="Description"/>
              <br />
              <br />
              <input type="text" class="form-control" id="campaign_url" placeholder="Link to campaign"/>
              <br />
              <br />
              <input type="text" class="form-control" id="campaign_video" placeholder="Link to introduction video"/>
              <br />
              <br />
              <input type="text" class="form-control" id="campaign_image" placeholder="Link to banner image" />
              <br />
              <br />
              <textarea class="form-control" id="campaign_about" placeholder="About the Campaign" rows="10" cols="10"></textarea>
              <br />
              <br />   
              <a id="campaignRegister_Next"class="btn btn-primary" >Next</a>
      </form>
     </div>
    </div>
   </div>`;
}
