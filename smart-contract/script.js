var web3;
/**
 * 실습 환경에 맞는 값 할당
 */
const SSAFY_URL = 'http://20.196.209.2:8545';
const CA = '0x6defd7cE3567a93cA68096268F48955bB696A4E1';
const STORAGE_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "currencyAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "animalNftAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "saleId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "saleAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ticketId",
				"type": "uint256"
			}
		],
		"name": "SaleCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintedAt",
				"type": "uint256"
			}
		],
		"name": "createDonate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "mintedAt",
				"type": "uint256"
			}
		],
		"name": "createFree",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "animalId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startedAt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endedAt",
				"type": "uint256"
			}
		],
		"name": "createSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCountDonates",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCountFrees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCountSales",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "donateId",
				"type": "uint256"
			}
		],
		"name": "getDonateAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletAddr",
				"type": "address"
			}
		],
		"name": "getDonateIdsByWallet",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "animalId",
				"type": "uint256"
			}
		],
		"name": "getDonatesOfAnimal",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "saleId",
				"type": "uint256"
			}
		],
		"name": "getSaleAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "walletAddr",
				"type": "address"
			}
		],
		"name": "getSaleIdsByWallet",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "animalId",
				"type": "uint256"
			}
		],
		"name": "getSalesOfAnimal",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "donateId",
				"type": "uint256"
			}
		],
		"name": "ownerOfDonate",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "saleId",
				"type": "uint256"
			}
		],
		"name": "ownerOfSale",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const privateKey = '';
var sender;
var senderAddress;
var storageContract;
/**
 * TODO:
 * web3 객체 만들기 
 */
 window.ethereum
 .request({ method: "eth_requestAccounts" })
 .then(accounts => {
   console.log(accounts);
 })

window.addEventListener('load', () => {
	console.log("typeof",typeof web3);
    if( typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        window.web3 = new Web3(web3.currentProvider);
    	console.log(web3.currentProvider);
    } else {
		console.log(web3.currentProvider);
    }
    startApp();
});

//web3.eth.estimateGas(callObject [, callback]);

    // web3.eth.estimateGas({
    // to: "0x6defd7cE3567a93cA68096268F48955bB696A4E1",
    // data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    // })
    // .then(console.log);
/**
 * TODO:
 * 계정 정보 생성 및 초기 값 세팅
 */
var ipfsImage, ipfsUri, rank, number, species;
function startApp() {
    // 1. 계정 정보 
	const animalNFTContract = new web3.eth.Contract(STORAGE_ABI, CA);
    // 2. storage 컨트랙트 인스턴스 
	
	const testCheck = async () => {
		//res = await animalNFTContract.methods._testImage().send({ from: "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6" });
		//console.log("진짜결과");
		//console.log(res);
		// species = await animalNFTContract.methods._getSpecies(0).call();
		// rank = await animalNFTContract.methods._getRank(0).call();
		// ipfsImage = await animalNFTContract.methods._getIpfsImage(0).call();
		// ipfsUri = await animalNFTContract.methods._getIpfsUri(0).call();
		// number = await animalNFTContract.methods._getNumber(0).call();
		 //var res = await animalNFTContract.methods.createDonate(0).send({ from: "0x49192B6b4b1b4acAEF5BE5C5cba8F1A5ba1A4C55" });
		//  var res = await animalNFTContract.methods.createFree(0).send({ 
		// 	from: "0x49192B6b4b1b4acAEF5BE5C5cba8F1A5ba1A4C55",
		// 	gas: 25000000,
		// 	gasLimit: 25000000
		//  });
		//  var res = await animalNFTContract.methods.createSale(0, 2, 0, 3).send({ 
			// from: "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6",
			// gas: 250000000000,
			// gasLimit: 2500000000000
		//  });
		var res = await animalNFTContract.methods.createDonate(0).send({
			from: "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6",
			gas: 250000000000,
			gasLimit: 2500000000000
		});
		//await animalNFTContract.methods.createSale().send({ from: "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6" });
		console.log("진짜결과");
		console.log(res);
	}
	console.log("test맨 아랫줄");
	testCheck();
    // 3. 화면에 초기 값 세팅 
}

/**
 * TODO:
 * retrieve() 함수 호출 후 화면에 결과 표시 
 */
function retrieve() {
}


/**
 * TODO:
 * store() 함수 호출 후 화면에 결과 표시
 */
function store() {
  
}
