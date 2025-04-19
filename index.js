const { ethers } = require("ethers");

const PROVIDER_URL = "https://tea-sepolia.g.alchemy.com/public";
const PRIVATE_KEY = "";
const CONTRACT_ADDRESS = "0xa075abba5f490a1aac67f441894d3c79bc93b68b";
const ABI = [
    
    {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "count",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const NUM_TRANSACTIONS = 1000;
    
    const currentGasPrice = await provider.getGasPrice();
    const adjustedGasPrice = currentGasPrice.mul(110).div(100);

    for (let i = 0; i < NUM_TRANSACTIONS; i++) {
        try {
            const tx = await contract.increment({
                gasPrice: adjustedGasPrice,
                gasLimit: 50000 
            });
            console.log(`Tx ${i+1} success: ${tx.hash}`);
            
            await new Promise(resolve => setTimeout(resolve, 5000));
        } catch (error) {
            console.error(`Gagal tx ${i+1}:`, error.message);
        }
    }
}

main().catch(console.error);