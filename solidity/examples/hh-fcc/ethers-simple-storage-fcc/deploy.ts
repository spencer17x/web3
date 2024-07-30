import { ethers } from 'ethers';
import * as fs from 'fs-extra';
import 'dotenv/config';

async function main() {
	// http://127.0.0.1:7545
	const provider = new ethers.JsonRpcProvider(
		process.env.RPC_URL
	);
	const encryptedJsonKey = fs.readFileSync('./.encryptedJsonKey.json', 'utf8');
	const wallet = (
		await ethers.Wallet
			.fromEncryptedJson(encryptedJsonKey, process.env.PRIVATE_KEY_PASS!)
	).connect(provider);

	const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
	const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin', 'utf8');
	const contraFactory = new ethers.ContractFactory(abi, binary, wallet);

	console.log('Deploying, please wait...');
	const contract = await contraFactory.deploy();
	const transactionReceipt = await contract.deploymentTransaction()?.wait(1);
	console.log('contract', contract);
	console.log('transactionReceipt', transactionReceipt);

	const favoriteNumber = await (contract as any).retrieve();
	console.log(`favoriteNumber: ${favoriteNumber.toString()}`);
	await (contract as any).store(13);
	const updatedFavoriteNumber = await (contract as any).retrieve();
	console.log(`updatedFavoriteNumber: ${updatedFavoriteNumber.toString()}`);
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});