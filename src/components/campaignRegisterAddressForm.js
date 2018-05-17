import yo from "yo-yo";

export default function campaignRegisterAddressForm() {

    return yo`
    <div id="campaignRegisterAddressForm" style="display:none">
        <div class="row center-block container" style="margin-top: 80px; margin-bottom: 150px; width:60%">
        <h2>Address and Token details</h2>
            <div class="row center-block">
            <br />
            <br />
                <form class="container-fluid"> 
                    <input type="text" class="form-control" id="owner_address" placeholder="Address of the Owner"/>
                    <br />
                    <br />
                    <input type="text" class="form-control" id="owner_address" placeholder="Address of the Beneficiary"/>
                    <br />
                    <br />
                    <input type="text" class="form-control" id="owner_address" placeholder="Funding goal in wei"/>
                    <br />
                    <br />
                    <input type="text" class="form-control" id="owner_address" placeholder="Expiry"/>
                    <br />
                    <br />
                    <input type="text" class="form-control" id="owner_address" placeholder="Token name"/>
                    <br />
                    <br />
                    <input type="text" class="form-control" id="owner_address" placeholder="Token symbol"/>
                    <br />
                    <br />
                    <input type="text" class="form-control" id="owner_address" placeholder="Token cap"/>
                    <br />
                    <br />
                    <input type="text" class="form-control" id="owner_address" placeholder="Token price"/>
                    <br />
                    <br />
                    <a id="backRegister" class="btn btn-primary btn-back">Back</a>
                    <a id="Register" class="register btn btn-primary">Register</a>
                </form>
            </div>
        </div>     
    </div>   
    `;
}