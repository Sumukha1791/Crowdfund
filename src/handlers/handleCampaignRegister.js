import { campaignRegisterForm } from "../components";
import { campaignRegisterAddressForm } from "../components";
import Contracts from "weifund-contracts";
import { el } from "../document";
import {
  setDefaultAccount,
  getContractEnvironment,
  getCampaign,
  getNetwork,
  getLocale,
  txObject,
  getDefaultAccount
} from "../environment";
import { web3, getTransactionSuccess, setMetamaskProvider } from "../web3";
import { setupIPFSProvider, ipfs } from "../ipfs";

// require contracts
const contracts = new Contracts(getContractEnvironment(), web3.currentProvider);
const campaignRegistry = contracts.CampaignRegistry.instance();
const campaign = contracts.StandardCampaign.factory;
const formData = {
  url: "",
  category: "",
  image: "",
  mainEntity: "",
  name: "",
  alternateName: "",
  description: "",
  disambugatedDescription: "",
  about: "",
  owner: "",
  tokenSymbol: "",
  tokenCap: 0,
  tokenPice: 0,
  fundingGoal: 0,
  fundingCap: 0,
  expiryDays: 0
};

export default function handleCampaignRegister(callback) {
  callback(null, true);

  el('#view-campaign-register').appendChild(campaignRegisterForm({}));
  el('#campaignRegisterForm').style.display = 'block';
  el('#campaignRegister_Next').addEventListener('click', (e) => {
    el('#campaignRegisterForm').style.display = 'none';
    el('#view-campaign-register').appendChild(campaignRegisterAddressForm({}));
  });  

  /* setMetamaskProvider().then(result => {
    var _addrs = [];
    var _amounts = [];
    var _freezePeriod = 0;
    var _lastIssuance = 0;
    var _owner = formData.owner;
    var _name = formData.name;
    var _decimals = 1;
    var _symbol = formData.tokenSymbol;
    var issuedtokenContract = web3.eth.contract([
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_spender", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "approve",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "freezePeriod",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "issuer",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_from", type: "address" },
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transferFrom",
        outputs: [{ name: "success", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "version",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [{ name: "_issuer", type: "address" }],
        name: "setIssuer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [
          { name: "_owner", type: "address" },
          { name: "_spender", type: "address" }
        ],
        name: "allowance",
        outputs: [{ name: "remaining", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "lastIssuance",
        outputs: [{ name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          { name: "_addrs", type: "address[]" },
          { name: "_amounts", type: "uint256[]" },
          { name: "_freezePeriod", type: "uint256" },
          { name: "_lastIssuance", type: "uint256" },
          { name: "_owner", type: "address" },
          { name: "_name", type: "string" },
          { name: "_decimals", type: "uint8" },
          { name: "_symbol", type: "string" }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "_from", type: "address" },
          { indexed: true, name: "_to", type: "address" },
          { indexed: false, name: "_value", type: "uint256" }
        ],
        name: "Transfer",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: "_owner", type: "address" },
          { indexed: true, name: "_spender", type: "address" },
          { indexed: false, name: "_value", type: "uint256" }
        ],
        name: "Approval",
        type: "event"
      }
    ]);
    var issuedtoken = issuedtokenContract.new(
      _addrs,
      _amounts,
      _freezePeriod,
      _lastIssuance,
      _owner,
      _name,
      _decimals,
      _symbol,
      {
        from: result.account.slice(2),
        data:
          "0x60606040526040805190810160405280600781526020017f57464954312e3000000000000000000000000000000000000000000000000000815250600a90805190602001906200005192919062000228565b5034156200005e57600080fd5b6040516200133a3803806200133a8339810160405280805182019190602001805182019190602001805190602001909190805190602001909190805190602001909190805182019190602001805190602001909190805182019190505060008090505b88518110156200017e578781815181101515620000da57fe5b90602001906020020151600160008b84815181101515620000f757fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555087818151811015156200015757fe5b906020019060200201516003600082825401925050819055508080600101915050620000c1565b86600481905550846000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550856005819055508360079080519060200190620001e492919062000228565b5082600860006101000a81548160ff021916908360ff16021790555081600990805190602001906200021892919062000228565b50505050505050505050620002d7565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200026b57805160ff19168380011785556200029c565b828001600101855582156200029c579182015b828111156200029b5782518255916020019190600101906200027e565b5b509050620002ab9190620002af565b5090565b620002d491905b80821115620002d0576000816000905550600101620002b6565b5090565b90565b61105380620002e76000396000f3006060604052600436106100db576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100e0578063095ea7b31461016e5780630a3cb663146101c857806318160ddd146101f15780631d1438481461021a57806323b872dd1461026f578063313ce567146102e857806354fd4d501461031757806355cc4e57146103a557806370a08231146103de5780638da5cb5b1461042b57806395d89b4114610480578063a9059cbb1461050e578063dd62ed3e14610568578063ebdb6063146105d4575b600080fd5b34156100eb57600080fd5b6100f36105fd565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610133578082015181840152602081019050610118565b50505050905090810190601f1680156101605780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561017957600080fd5b6101ae600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061069b565b604051808215151515815260200191505060405180910390f35b34156101d357600080fd5b6101db61078d565b6040518082815260200191505060405180910390f35b34156101fc57600080fd5b610204610793565b6040518082815260200191505060405180910390f35b341561022557600080fd5b61022d610799565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561027a57600080fd5b6102ce600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506107bf565b604051808215151515815260200191505060405180910390f35b34156102f357600080fd5b6102fb6107f1565b604051808260ff1660ff16815260200191505060405180910390f35b341561032257600080fd5b61032a610804565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561036a57808201518184015260208101905061034f565b50505050905090810190601f1680156103975780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156103b057600080fd5b6103dc600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108a2565b005b34156103e957600080fd5b610415600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109a2565b6040518082815260200191505060405180910390f35b341561043657600080fd5b61043e6109eb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561048b57600080fd5b610493610a10565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156104d35780820151818401526020810190506104b8565b50505050905090810190601f1680156105005780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561051957600080fd5b61054e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610aae565b604051808215151515815260200191505060405180910390f35b341561057357600080fd5b6105be600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610bb5565b6040518082815260200191505060405180910390f35b34156105df57600080fd5b6105e7610c3c565b6040518082815260200191505060405180910390f35b60078054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106935780601f1061066857610100808354040283529160200191610693565b820191906000526020600020905b81548152906001019060200180831161067657829003601f168201915b505050505081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60045481565b60035481565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060045414806107d2575060045443115b156107e9576107e2848484610c42565b90506107ea565b5b9392505050565b600860009054906101000a900460ff1681565b600a8054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561089a5780601f1061086f5761010080835404028352916020019161089a565b820191906000526020600020905b81548152906001019060200180831161087d57829003601f168201915b505050505081565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156108fd57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff16600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561099a5780600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061099f565b600080fd5b50565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60098054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610aa65780601f10610a7b57610100808354040283529160200191610aa6565b820191906000526020600020905b815481529060010190602001808311610a8957829003601f168201915b505050505081565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148015610b1b575060006005541480610b1a575060055443105b5b15610b865781600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508160036000828254019250508190555060019050610baf565b60006004541480610b98575060045443115b15610bae57610ba78383610ebe565b9050610baf565b5b92915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60055481565b600081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610d0f575081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b8015610d1b5750600082115b15610eb25781600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050610eb7565b600090505b9392505050565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610f0f5750600082115b1561101c5781600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050611021565b600090505b929150505600a165627a7a72305820d98448a7ed9a9f83e7c3f97e18e0b57c7cd2560be4a362cf5edacee95d5eb78c0029",
        gas: "4465000"
      },
      function(e, Tcontract) {
        console.log(Te, Tcontract);

        if(Te)
        {
            console.log("token contract error "+Te);
        }

        if (typeof Tcontract.address !== "undefined") {
          console.log(
            "Contract mined! address: " +
              Tcontract.address +
              " transactionHash: " +
              Tcontract.transactionHash
          );
          //model1enhancer
          var _tokenCap = formData.tokenCap;
          var _tokenPrice = formData.tokenPrice;
          var _freezePeriod = 0;
          var _token = Tcontract.address;
          var _initFunders = [];
          var _initBalances = [];
          var _owner = formData.owner;
          var _verifier = "";
          var model1enhancerContract = web3.eth.contract([
            {
              constant: true,
              inputs: [],
              name: "freezePeriod",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [{ name: "", type: "address" }],
              name: "balances",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "verifier",
              outputs: [{ name: "", type: "address" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: false,
              inputs: [
                { name: "_sender", type: "address" },
                { name: "_value", type: "uint256" },
                { name: "_blockNumber", type: "uint256" },
                { name: "_amounts", type: "uint256[]" }
              ],
              name: "notate",
              outputs: [{ name: "earlySuccess", type: "bool" }],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "claimMethodABI",
              outputs: [{ name: "", type: "string" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "startBlock",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: false,
              inputs: [],
              name: "claim",
              outputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              constant: false,
              inputs: [{ name: "_campaign", type: "address" }],
              name: "setCampaign",
              outputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              constant: true,
              inputs: [{ name: "_sender", type: "address" }],
              name: "balanceOf",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [{ name: "_value", type: "uint256" }],
              name: "calcTokenAmount",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "tokensIssued",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "campaign",
              outputs: [{ name: "", type: "address" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "owner",
              outputs: [{ name: "", type: "address" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "price",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: false,
              inputs: [{ name: "_price", type: "uint256" }],
              name: "changePrice",
              outputs: [],
              payable: false,
              stateMutability: "nonpayable",
              type: "function"
            },
            {
              constant: true,
              inputs: [{ name: "", type: "address" }],
              name: "claimed",
              outputs: [{ name: "", type: "bool" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "tokenCap",
              outputs: [{ name: "", type: "uint256" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              constant: true,
              inputs: [],
              name: "token",
              outputs: [{ name: "", type: "address" }],
              payable: false,
              stateMutability: "view",
              type: "function"
            },
            {
              inputs: [
                { name: "_tokenCap", type: "uint256" },
                { name: "_tokenPrice", type: "uint256" },
                { name: "_freezePeriod", type: "uint256" },
                { name: "_token", type: "address" },
                { name: "_initFunders", type: "address[]" },
                { name: "_initBalances", type: "uint256[]" },
                { name: "_owner", type: "address" },
                { name: "_verifier", type: "address" }
              ],
              payable: false,
              stateMutability: "nonpayable",
              type: "constructor"
            },
            {
              anonymous: false,
              inputs: [{ indexed: false, name: "_sender", type: "address" }],
              name: "ClaimSuccess",
              type: "event"
            }
          ]);
          var model1enhancer = model1enhancerContract.new(
            _tokenCap,
            _tokenPrice,
            _freezePeriod,
            _token,
            _initFunders,
            _initBalances,
            _owner,
            _verifier,
            {
              from: result.account.slice(2),
              data:
                "0x6060604052341561000f57600080fd5b60405161105e38038061105e833981016040528080519060200190919080519060200190919080519060200190919080519060200190919080518201919060200180518201919060200180519060200190919080519060200190919050506000886008819055508760098190555086600a819055504360048190555085600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600090505b845181101561020a57838181518110151561016957fe5b9060200190602002015160076000878481518110151561018557fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555083818151811015156101e457fe5b906020019060200201516005600082825401925050819055508080600101915050610152565b505050505050505050610e3c806102226000396000f3006060604052600436106100fc576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a3cb6631461010157806327e235e31461012a5780632b7ac3f314610177578063456fe579146101cc57806347eeb75f1461026f57806348cd4cb1146102fd5780634e71d92d146103265780636f540fe01461033b57806370a08231146103745780637b7902dd146103c15780637c48bbda146103f8578063811e539c146104215780638da5cb5b14610476578063a035b1fe146104cb578063a2b40d19146104f4578063c884ef8314610517578063dd54291b14610568578063fc0c546a14610591575b600080fd5b341561010c57600080fd5b6101146105e6565b6040518082815260200191505060405180910390f35b341561013557600080fd5b610161600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105ec565b6040518082815260200191505060405180910390f35b341561018257600080fd5b61018a610604565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156101d757600080fd5b610255600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919080359060200190919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190505061062a565b604051808215151515815260200191505060405180910390f35b341561027a57600080fd5b61028261082f565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102c25780820151818401526020810190506102a7565b50505050905090810190601f1680156102ef5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561030857600080fd5b61031061083a565b6040518082815260200191505060405180910390f35b341561033157600080fd5b610339610840565b005b341561034657600080fd5b610372600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b98565b005b341561037f57600080fd5b6103ab600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c94565b6040518082815260200191505060405180910390f35b34156103cc57600080fd5b6103e26004808035906020019091905050610cdd565b6040518082815260200191505060405180910390f35b341561040357600080fd5b61040b610cf4565b6040518082815260200191505060405180910390f35b341561042c57600080fd5b610434610cfa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561048157600080fd5b610489610d20565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156104d657600080fd5b6104de610d45565b6040518082815260200191505060405180910390f35b34156104ff57600080fd5b6105156004808035906020019091905050610d4b565b005b341561052257600080fd5b61054e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610db0565b604051808215151515815260200191505060405180910390f35b341561057357600080fd5b61057b610dd0565b6040518082815260200191505060405180910390f35b341561059c57600080fd5b6105a4610dd6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600a5481565b60076020528060005260406000206000915090505481565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080858560008061063b83610cdd565b91506009548202905060008211801561065357508281145b80156107875750600073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614806107865750600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d8b964e6856040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561076e57600080fd5b5af1151561077b57600080fd5b505050604051805190505b5b80156107995750600854826005540111155b1561081d576107a789610cdd565b945084600760008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508460056000828254019250508190555060085460055410151561081857600195505b610822565b600080fd5b5050505050949350505050565b610837610dfc565b90565b60045481565b600280600281111561084e57fe5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c040e6b86040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b15156108d357600080fd5b5af115156108e057600080fd5b505050604051805190501415156108f657600080fd5b600a54600454014311801561095b575060001515600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b80156109a657506000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054115b15610b90576001600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b1515610b0657600080fd5b5af11515610b1357600080fd5b505050604051805190501515610b2857600080fd5b7f9b6538c676bbda0f6a873a2e7082fccc22bee69ece901ad4dfcac2fe7c6342bd33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1610b95565b600080fd5b50565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610bf357600080fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610c5057600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600060095482811515610cec57fe5b049050919050565b60055481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610da657600080fd5b8060098190555050565b60066020528060005260406000206000915054906101000a900460ff1681565b60085481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6020604051908101604052806000815250905600a165627a7a72305820515341cb24797e99e987ce0e937e226a67bdbcf2adafb46fb9d8093f08644b0a0029",
              gas: "4465000"
            },
            function(me, mcontract) {
              console.log(me, mcontract);
              
              if(me){
                  console.log("model1enhancer error "+me);
              }

              if (typeof mcontract.address !== "undefined") {
                console.log(
                  "Contract mined! address: " +
                    mcontract.address +
                    " transactionHash: " +
                    mcontract.transactionHash
                );
                //standardContract
                var _name = formData.name;
                var _expiry = calculateExpiry(formData.expiryDays);
                var _fundingGoal = formData.fundingGoal;
                var _fundingCap = formData.fundingCap;
                var _beneficiary = formData.owner;
                var _owner = formData.owner;
                var _enhancer = mcontract.address;
                var standardcampaignContract = web3.eth.contract([
                  {
                    constant: true,
                    inputs: [],
                    name: "name",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [{ name: "", type: "uint256" }],
                    name: "contributions",
                    outputs: [
                      { name: "sender", type: "address" },
                      { name: "value", type: "uint256" },
                      { name: "created", type: "uint256" }
                    ],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "created",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "totalContributions",
                    outputs: [{ name: "amount", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "beneficiary",
                    outputs: [{ name: "", type: "address" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: false,
                    inputs: [{ name: "_amounts", type: "uint256[]" }],
                    name: "contributeMsgValue",
                    outputs: [{ name: "contributionID", type: "uint256" }],
                    payable: true,
                    stateMutability: "payable",
                    type: "function"
                  },
                  {
                    constant: false,
                    inputs: [{ name: "_earlySuccess", type: "bool" }],
                    name: "payoutToBeneficiary",
                    outputs: [],
                    payable: false,
                    stateMutability: "nonpayable",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "version",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "enhancer",
                    outputs: [{ name: "", type: "address" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "earlySuccess",
                    outputs: [{ name: "", type: "bool" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "fundingGoal",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "amountRaised",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [{ name: "", type: "uint256" }],
                    name: "refundsClaimed",
                    outputs: [{ name: "", type: "bool" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "owner",
                    outputs: [{ name: "", type: "address" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "contributeMethodABI",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: false,
                    inputs: [{ name: "_contributionID", type: "uint256" }],
                    name: "claimRefundOwed",
                    outputs: [{ name: "balanceClaim", type: "address" }],
                    payable: false,
                    stateMutability: "nonpayable",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "payoutMethodABI",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [
                      { name: "", type: "address" },
                      { name: "", type: "uint256" }
                    ],
                    name: "contributionsBySender",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "stage",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [{ name: "_sender", type: "address" }],
                    name: "totalContributionsBySender",
                    outputs: [{ name: "amount", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "expiry",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "fundingCap",
                    outputs: [{ name: "", type: "uint256" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [],
                    name: "refundMethodABI",
                    outputs: [{ name: "", type: "string" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    constant: true,
                    inputs: [{ name: "", type: "uint256" }],
                    name: "refundClaimAddress",
                    outputs: [{ name: "", type: "address" }],
                    payable: false,
                    stateMutability: "view",
                    type: "function"
                  },
                  {
                    inputs: [
                      { name: "_name", type: "string" },
                      { name: "_expiry", type: "uint256" },
                      { name: "_fundingGoal", type: "uint256" },
                      { name: "_fundingCap", type: "uint256" },
                      { name: "_beneficiary", type: "address" },
                      { name: "_owner", type: "address" },
                      { name: "_enhancer", type: "address" }
                    ],
                    payable: false,
                    stateMutability: "nonpayable",
                    type: "constructor"
                  },
                  {
                    payable: true,
                    stateMutability: "payable",
                    type: "fallback"
                  },
                  {
                    anonymous: false,
                    inputs: [
                      { indexed: false, name: "_contributor", type: "address" }
                    ],
                    name: "ContributionMade",
                    type: "event"
                  },
                  {
                    anonymous: false,
                    inputs: [
                      {
                        indexed: false,
                        name: "_payoutDestination",
                        type: "address"
                      },
                      { indexed: false, name: "_payoutAmount", type: "uint256" }
                    ],
                    name: "RefundPayoutClaimed",
                    type: "event"
                  },
                  {
                    anonymous: false,
                    inputs: [
                      {
                        indexed: false,
                        name: "_payoutDestination",
                        type: "address"
                      }
                    ],
                    name: "BeneficiaryPayoutClaimed",
                    type: "event"
                  }
                ]);
                var standardcampaign = standardcampaignContract.new(
                  _name,
                  _expiry,
                  _fundingGoal,
                  _fundingCap,
                  _beneficiary,
                  _owner,
                  _enhancer,
                  {
                    from: result.account.slice(2),
                    data:
                      "0x606060405234156200001057600080fd5b60405162001b3838038062001b388339810160405280805182019190602001805190602001909190805190602001909190805190602001909190805190602001909190805190602001909190805190602001909190505086600e90805190602001906200007f9291906200016c565b5085600781905550846004819055508360058190555082600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504360088190555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050505050506200021b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001af57805160ff1916838001178555620001e0565b82800160010185558215620001e0579182015b82811115620001df578251825591602001919060010190620001c2565b5b509050620001ef9190620001f3565b5090565b6200021891905b8082111562000214576000816000905550600101620001fa565b5090565b90565b61190d806200022b6000396000f30060606040526004361061013e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461019a5780631cee070014610228578063325a19f11461029957806337c08923146102c257806338af3eed146102eb5780633a0936ce14610340578063441c3001146103a357806354fd4d50146103c85780636a40515a1461045657806373bdae5b146104ab5780637a3a0e84146104d85780637b3e5e7b146105015780638c3c23d01461052a5780638da5cb5b146105655780638e3390b4146105ba5780639d13156c14610648578063a4d69fd3146106ab578063ac5db33214610739578063c040e6b81461078f578063d52230c4146107b8578063e184c9be14610805578063e3b2594f1461082e578063fb687c2414610857578063ff8f30a1146108e5575b610197600180548060200260200160405190810160405280929190818152602001828054801561018d57602002820191906000526020600020905b815481526020019060010190808311610179575b5050505050610948565b50005b34156101a557600080fd5b6101ad610d2a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101ed5780820151818401526020810190506101d2565b50505050905090810190601f16801561021a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561023357600080fd5b6102496004808035906020019091905050610dc8565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390f35b34156102a457600080fd5b6102ac610e21565b6040518082815260200191505060405180910390f35b34156102cd57600080fd5b6102d5610e27565b6040518082815260200191505060405180910390f35b34156102f657600080fd5b6102fe610e34565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61038d600480803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050610948565b6040518082815260200191505060405180910390f35b34156103ae57600080fd5b6103c660048080351515906020019091905050610e5a565b005b34156103d357600080fd5b6103db610fc8565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561041b578082015181840152602081019050610400565b50505050905090810190601f1680156104485780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561046157600080fd5b610469610fd3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156104b657600080fd5b6104be610ff9565b604051808215151515815260200191505060405180910390f35b34156104e357600080fd5b6104eb61100c565b6040518082815260200191505060405180910390f35b341561050c57600080fd5b610514611012565b6040518082815260200191505060405180910390f35b341561053557600080fd5b61054b6004808035906020019091905050611018565b604051808215151515815260200191505060405180910390f35b341561057057600080fd5b610578611038565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156105c557600080fd5b6105cd61105e565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561060d5780820151818401526020810190506105f2565b50505050905090810190601f16801561063a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561065357600080fd5b6106696004808035906020019091905050611069565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156106b657600080fd5b6106be611347565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156106fe5780820151818401526020810190506106e3565b50505050905090810190601f16801561072b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561074457600080fd5b610779600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611352565b6040518082815260200191505060405180910390f35b341561079a57600080fd5b6107a2611383565b6040518082815260200191505060405180910390f35b34156107c357600080fd5b6107ef600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061147d565b6040518082815260200191505060405180910390f35b341561081057600080fd5b6108186114c9565b6040518082815260200191505060405180910390f35b341561083957600080fd5b6108416114cf565b6040518082815260200191505060405180910390f35b341561086257600080fd5b61086a6114d5565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156108aa57808201518184015260208101905061088f565b50505050905090810190601f1680156108d75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156108f057600080fd5b61090660048080359060200190919050506114e0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60008060405180807f696e207374616765000000000000000000000000000000000000000000000000815250600801905060405180910390a080600281111561098d57fe5b610995611383565b1415156109a157600080fd5b60405180807f696e6e2076616c696420636f6e747269627574696f6e00000000000000000000815250601601905060405180910390a060003414806109eb57506005543460065401115b806109fb57506006543460065401105b15610a0557600080fd5b60405180807f696e20636f6e7472000000000000000000000000000000000000000000000000815250600801905060405180910390a0600a8054809190600101610a4f9190611513565b91506060604051908101604052803373ffffffffffffffffffffffffffffffffffffffff16815260200134815260200143815250600a83815481101515610a9257fe5b906000526020600020906003020160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020155905050600b60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806001018281610b4f9190611545565b916000526020600020900160008490919091505550346006600082825401925050819055507f97a3367c201ad38e0d37322fd0ffa1b93457541ae8baf20eb9aa50bb83fcabef33604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663456fe579333443876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015610cc5578082015181840152602081019050610caa565b5050505090500195505050505050602060405180830381600087803b1515610cec57600080fd5b5af11515610cf957600080fd5b5050506040518051905015610d24576001600260146101000a81548160ff0219169083151502179055505b50919050565b600e8054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610dc05780601f10610d9557610100808354040283529160200191610dc0565b820191906000526020600020905b815481529060010190602001808311610da357829003601f168201915b505050505081565b600a81815481101515610dd757fe5b90600052602060002090600302016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154905083565b60085481565b6000600a80549050905090565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610eb657600080fd5b80600260146101000a81548160ff021916908315150217905550600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff163160405160006040518083038185875af1925050501515610f4057600080fd5b7f8de95bf60f39e968f91141c2aa6b45410fc9369f09a1ef4aa48e440c7d384a56600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a150565b610fd0611571565b90565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260149054906101000a900460ff1681565b60045481565b60065481565b600d6020528060005260406000206000915054906101000a900460ff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611066611571565b90565b600080600160405180807f696e207374616765000000000000000000000000000000000000000000000000815250600801905060405180910390a08060028111156110b057fe5b6110b8611383565b1415156110c457600080fd5b836000600a828154811015156110d657fe5b9060005260206000209060030201905060011515600d600084815260200190815260200160002060009054906101000a900460ff161515148061116957503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b1561117357600080fd5b6001600d600088815260200190815260200160002060006101000a81548160ff021916908315150217905550600a868154811015156111ae57fe5b906000526020600020906003020193508360000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166111eb611585565b808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050604051809103906000f080151561123757600080fd5b945084600c600088815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508473ffffffffffffffffffffffffffffffffffffffff166108fc85600101549081150290604051600060405180830381858888f1935050505015156112cf57600080fd5b7ffc5c909773f8fa60a909a6596944daa96ef6da8d69ca714c1e62811a3830210c858560010154604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a150505050919050565b61134f611571565b90565b600b6020528160005260406000208181548110151561136d57fe5b9060005260206000209001600091509150505481565b6000600754431080156113a9575060001515600260149054906101000a900460ff161515145b80156113b85750600554600654105b156113d157600060028111156113ca57fe5b905061147a565b60075443101580156113f6575060001515600260149054906101000a900460ff161515145b80156114055750600454600654105b1561141e576001600281111561141757fe5b905061147a565b6007544310158015611434575060045460065410155b80611452575060011515600260149054906101000a900460ff161515145b80611461575060055460065410155b156114795760028081111561147257fe5b905061147a565b5b90565b6000600b60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805490509050919050565b60075481565b60055481565b6114dd611571565b90565b600c6020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b8154818355818115116115405760030281600302836000526020600020918201910161153f9190611595565b5b505050565b81548183558181151161156c5781836000526020600020918201910161156b91906115eb565b5b505050565b602060405190810160405280600081525090565b6040516102d18061161183390190565b6115e891905b808211156115e457600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905560028201600090555060030161159b565b5090565b90565b61160d91905b808211156116095760008160009055506001016115f1565b5090565b9056006060604052341561000f57600080fd5b6040516020806102d183398101604052808051906020019091905050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506102568061007b6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806330509bca1461005957806347eeb75f1461006e5780638da5cb5b146100fc575b005b341561006457600080fd5b61006c610151565b005b341561007957600080fd5b6100816101e6565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100c15780820151818401526020810190506100a6565b50505050905090810190601f1680156100ee5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561010757600080fd5b61010f6101f1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101ac57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b6101ee610216565b90565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6020604051908101604052806000815250905600a165627a7a723058203dddf9d75e466d7f921510f3346fa27cfaf3b2db1111cb5a264466060b3d355a0029a165627a7a723058209cecd437757e22454e5fa1216130879403cc20688e53ad955303e014b75ad06e0029",
                    gas: "4465000"
                  },
                  function(se, scontract) {
                    console.log(se, scontract);

                    if(se){
                        console.log("standard campaign error "+se);
                    }

                    if (typeof scontract.address !== "undefined") {
                      console.log(
                        "Contract mined! address: " +
                          scontract.address +
                          " transactionHash: " +
                          scontract.transactionHash
                      );
                      //campaignRegistryContract
                      var campaignRegistryContract = web3.eth.contract([
                        {
                          constant: true,
                          inputs: [{ name: "_campaignID", type: "uint256" }],
                          name: "addressOf",
                          outputs: [{ name: "campaign", type: "address" }],
                          payable: false,
                          stateMutability: "view",
                          type: "function"
                        },
                        {
                          constant: true,
                          inputs: [{ name: "", type: "uint256" }],
                          name: "campaigns",
                          outputs: [
                            { name: "addr", type: "address" },
                            { name: "abi", type: "address" },
                            { name: "registered", type: "uint256" }
                          ],
                          payable: false,
                          stateMutability: "view",
                          type: "function"
                        },
                        {
                          constant: true,
                          inputs: [{ name: "", type: "address" }],
                          name: "ids",
                          outputs: [{ name: "", type: "uint256" }],
                          payable: false,
                          stateMutability: "view",
                          type: "function"
                        },
                        {
                          constant: true,
                          inputs: [{ name: "_campaignID", type: "uint256" }],
                          name: "abiOf",
                          outputs: [{ name: "abi", type: "address" }],
                          payable: false,
                          stateMutability: "view",
                          type: "function"
                        },
                        {
                          constant: true,
                          inputs: [],
                          name: "numCampaigns",
                          outputs: [{ name: "count", type: "uint256" }],
                          payable: false,
                          stateMutability: "view",
                          type: "function"
                        },
                        {
                          constant: true,
                          inputs: [{ name: "_campaignID", type: "uint256" }],
                          name: "registeredAt",
                          outputs: [{ name: "registered", type: "uint256" }],
                          payable: false,
                          stateMutability: "view",
                          type: "function"
                        },
                        {
                          constant: false,
                          inputs: [
                            { name: "_campaign", type: "address" },
                            { name: "_interface", type: "address" }
                          ],
                          name: "register",
                          outputs: [{ name: "campaignID", type: "uint256" }],
                          payable: false,
                          stateMutability: "nonpayable",
                          type: "function"
                        },
                        {
                          constant: true,
                          inputs: [{ name: "_campaign", type: "address" }],
                          name: "idOf",
                          outputs: [{ name: "campaignID", type: "uint256" }],
                          payable: false,
                          stateMutability: "view",
                          type: "function"
                        },
                        {
                          anonymous: false,
                          inputs: [
                            {
                              indexed: false,
                              name: "_campaign",
                              type: "address"
                            },
                            {
                              indexed: false,
                              name: "_interface",
                              type: "address"
                            },
                            {
                              indexed: false,
                              name: "_campaignID",
                              type: "uint256"
                            }
                          ],
                          name: "CampaignRegistered",
                          type: "event"
                        }
                      ]);
                      var campaignregistry = campaignRegistryContract.at(
                        "0x79be4986c6cc777ce1ed91365a935d363ebe4ab6"
                      );
                      campaignregistry.register(
                        scontract.address,
                        "",
                        {
                          from: result.account.slice(2),
                          gas: "4465000"
                        },
                        function(crerr, crcontract) {
                          console.log(err + " " + contract);
                          //SetupIPFS
                          if(typeof crcontract !== "undefined"){
                          addJSONToIPFSAndUpdateCampaignDataRegistry(
                            scontract.address, result.account.slice(2)
                          );
                        }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });*/
}

function addJSONToIPFSAndUpdateCampaignDataRegistry(scontractAddress, fromAddress) {
  setupIPFSProvider();

  var schemaJSON = {
    "@context": "http://crowdfund.io",
    "@type": "CampaignContract",
    version: "0.1.0",
    address: "",
    compiler: "solc",
    compilerFlags: "{'optimize': 1}",
    compilerVersion: "0.3.1-1",
    bytecode:
      "6060604052606060405190810160405280602d81526020017f636f6e747269627574654d736756616c756528293a2875696e7432353620636f81526020017f6e747269627574696f6e4944290000000000000000000000000000000000000081526020015060096000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100b257805160ff19168380011785556100e3565b828001600101855582156100e3579182015b828111156100e25782518260005055916020019190600101906100c4565b5b50905061010e91906100f0565b8082111561010a57600081815060009055506001016100f0565b5090565b5050606060405190810160405280602d81526020017f7061796f7574546f42656e656669636961727928293a2875696e74323536206181526020017f6d6f756e74436c61696d65642900000000000000000000000000000000000000815260200150600a6000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101be57805160ff19168380011785556101ef565b828001600101855582156101ef579182015b828111156101ee5782518260005055916020019190600101906101d0565b5b50905061021a91906101fc565b8082111561021657600081815060009055506001016101fc565b5090565b5050604051611094380380611094833981016040528080518201919060200180519060200190919080519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b8360086000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106102d357805160ff1916838001178555610304565b82800160010185558215610304579182015b828111156103035782518260005055916020019190600101906102e5565b5b50905061032f9190610311565b8082111561032b5760008181506000905550600101610311565b5090565b5050826004600050819055508160026000508190555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555033600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50505050610ce6806103ae6000396000f3606060405236156100ed576000357c01000000000000000000000000000000000000000000000000000000009004806306fdde03146100fa5780631cee07001461017557806337c08923146101c557806338af3eed146101e857806354fd4d50146102215780637a3a0e841461029c5780637b3e5e7b146102bf5780638da5cb5b146102e25780638e3390b41461031b578063a4d69fd314610396578063a63c7ba214610411578063ac5db33214610434578063c040e6b814610469578063d52230c41461048c578063db0251e9146104b8578063e184c9be146104db578063fb687c24146104fe576100ed565b6100f85b610002565b565b005b6101076004805050610579565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101675780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61018b600480803590602001909190505061061a565b604051808473ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390f35b6101d2600480505061067a565b6040518082815260200191505060405180910390f35b6101f5600480505061068f565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61022e60048050506106b5565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561028e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102a960048050506106cd565b6040518082815260200191505060405180910390f35b6102cc60048050506106d6565b6040518082815260200191505060405180910390f35b6102ef60048050506106df565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103286004805050610705565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103885780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103a360048050506107a6565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104035780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61041e6004805050610847565b6040518082815260200191505060405180910390f35b61045360048080359060200190919080359060200190919050506109b2565b6040518082815260200191505060405180910390f35b61047660048050506109e7565b6040518082815260200191505060405180910390f35b6104a260048080359060200190919050506109f0565b6040518082815260200191505060405180910390f35b6104c56004805050610a31565b6040518082815260200191505060405180910390f35b6104e86004805050610cc5565b6040518082815260200191505060405180910390f35b61050b6004805050610cce565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561056b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60086000508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106125780601f106105e757610100808354040283529160200191610612565b820191906000526020600020905b8154815290600101906020018083116105f557829003601f168201915b505050505081565b600660005081815481101561000257906000526020600020906003020160005b915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160005054908060020160005054905083565b6000600660005080549050905061068c565b90565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60206040519081016040528060008152602001505b90565b60026000505481565b60036000505481565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60096000508054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561079e5780601f106107735761010080835404028352916020019161079e565b820191906000526020600020905b81548152906001019060200180831161078157829003601f168201915b505050505081565b600a6000508054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561083f5780601f106108145761010080835404028352916020019161083f565b820191906000526020600020905b81548152906001019060200180831161082257829003601f168201915b505050505081565b600060026004600050544210156108685760006001600050819055506108a8565b42600460005054118015610886575060026000505460036000505410155b1561089b5760026001600050819055506108a7565b60016001600050819055505b5b806001600050541415156108bb57610002565b3073ffffffffffffffffffffffffffffffffffffffff163191508150600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600083604051809050600060405180830381858888f19350505050151561093657610002565b7f22c1e24047f1e0c1af6f78290547f44645cdd2ad4d06b09115a162e41460c4d5600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1505b90565b600760005060205281600052604060002060005081815481101561000257906000526020600020900160005b91509150505481565b60016000505481565b6000600760005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050805490509050610a2c565b919050565b60006000600460005054421015610a52576000600160005081905550610a92565b42600460005054118015610a70575060026000505460036000505410155b15610a85576002600160005081905550610a91565b60016001600050819055505b5b80600160005054141515610aa557610002565b600660005080548091906001019090815481835581811511610b3557600302816003028360005260206000209182019101610b349190610ae0565b80821115610b305760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160005060009055600282016000506000905550600301610ae0565b5090565b5b5050509150815060606040519081016040528033815260200134815260200142815260200150600660005083815481101561000257906000526020600020906003020160005b5060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506020820151816001016000505560408201518160020160005055905050600760005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000508054806001018281815481835581811511610c4657818360005260206000209182019101610c459190610c27565b80821115610c415760008181506000905550600101610c27565b5090565b5b5050509190906000526020600020900160005b84909190915055503460036000828282505401925050819055507f97a3367c201ad38e0d37322fd0ffa1b93457541ae8baf20eb9aa50bb83fcabef33604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1505b90565b60046000505481565b60206040519081016040528060008152602001505b9056",
    source: "",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        name: "contributions",
        outputs: [
          {
            name: "sender",
            type: "address"
          },
          {
            name: "value",
            type: "uint256"
          },
          {
            name: "created",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "totalContributions",
        outputs: [
          {
            name: "amount",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "beneficiary",
        outputs: [
          {
            name: "",
            type: "address"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "version",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "fundingGoal",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "amountRaised",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [
          {
            name: "",
            type: "address"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "contributeMethodABI",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "payoutMethodABI",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "payoutToBeneficiary",
        outputs: [
          {
            name: "amountClaimed",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "address"
          },
          {
            name: "",
            type: "uint256"
          }
        ],
        name: "contributionsBySender",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "stage",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [
          {
            name: "_sender",
            type: "address"
          }
        ],
        name: "totalContributionsBySender",
        outputs: [
          {
            name: "amount",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "contributeMsgValue",
        outputs: [
          {
            name: "contributionID",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "expiry",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "refundMethodABI",
        outputs: [
          {
            name: "",
            type: "string"
          }
        ],
        type: "function"
      },
      {
        inputs: [
          {
            name: "_name",
            type: "string"
          },
          {
            name: "_expiry",
            type: "uint256"
          },
          {
            name: "_fundingGoal",
            type: "uint256"
          },
          {
            name: "_beneficiary",
            type: "address"
          }
        ],
        type: "constructor"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: "_contributor",
            type: "address"
          }
        ],
        name: "ContributionMade",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: "_payoutDestination",
            type: "address"
          },
          {
            indexed: false,
            name: "_payoutAmount",
            type: "uint256"
          }
        ],
        name: "RefundPayoutClaimed",
        type: "event"
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            name: "_payoutDestination",
            type: "address"
          },
          {
            indexed: false,
            name: "_payoutAmount",
            type: "uint256"
          }
        ],
        name: "BeneficiaryPayoutClaimed",
        type: "event"
      }
    ],
    transactionHash: "",
    url: formData.url,
    category: formData.category,
    image: formData.image,
    mainEntity: formData.mainEntity,
    i18n: {
      en: {
        name: formData.name,
        alternateName: formData.alternateName,
        disambiguatedDescription: formData.disambugatedDescription,
        description: formData.description
      }
    },
    mailChimp: {
      forms: [
        {
          "@context": "http://crowdfund.io",
          "@type": "subscribe",
          action:
            "//crowdfund.us10.list-manage.com/subscribe/post?u=5fd10dccde0a9e8f200ae4e44&amp;id=6c94b8c26f",
          fields: {
            email: 1
          }
        }
      ]
    },
    relatedContracts: []
  };

  ipfs.addJSON(JSON.stringify(schemaJSON), (err, ipfsresult) => {
    console.log(err, ipfsresult);

    //campaigndataregistry
    if (!err) {
      var campaigndataregistryContract = web3.eth.contract([
        {
          constant: false,
          inputs: [
            { name: "_campaign", type: "address" },
            { name: "_data", type: "string" }
          ],
          name: "register",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ name: "_campaign", type: "address" }],
          name: "storedData",
          outputs: [{ name: "dataStored", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ name: "source", type: "string" }],
          name: "stringToBytes32",
          outputs: [{ name: "result", type: "bytes32" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, name: "_campaign", type: "address" }],
          name: "CampaignDataRegistered",
          type: "event"
        }
      ]);
      var campaigndataregistry = campaigndataregistryContract.at(
        "0x4C0B6A183F6E8E9A76f884f7Da447b37F5016294"
      );
      campaigndataregistry.register(scontractAddress, ipfsresult,  {
        from: fromAddress,
        gas: "4465000"
      },
      function(cdrerr, cdrcontract) {
        if(cdrerr){
            console.log("campaign data registry error "+cdrerr);
        }
      });
    }
  });
}
