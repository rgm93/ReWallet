export const REWALLET_ADDRESS = '0xd57b37a008b3bdc144cff5f58f4bc296b5bc45e7';
export const REWALLET_SC = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fullname",
				"type": "string"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_age",
				"type": "string"
			},
			{
				"name": "_city",
				"type": "string"
			},
			{
				"name": "_message",
				"type": "string"
			}
		],
		"name": "escribirMail",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fullname",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "email",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "age",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "city",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "message",
				"type": "string"
			}
		],
		"name": "NuevoMail",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contador",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mails",
		"outputs": [
			{
				"name": "id",
				"type": "uint256"
			},
			{
				"name": "fullname",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "age",
				"type": "string"
			},
			{
				"name": "city",
				"type": "string"
			},
			{
				"name": "message",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];