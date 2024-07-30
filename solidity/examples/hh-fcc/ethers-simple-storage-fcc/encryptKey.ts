import { ethers } from 'ethers';
import 'dotenv/config';
import * as fs from 'node:fs';

async function main() {
	const wallet = new ethers.Wallet(
		process.env.PRIVATE_KEY!,
	);
	const encryptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASS!);
	fs.writeFileSync('./.encryptedJsonKey.json', encryptedJsonKey);
}

main().catch(error => {
	console.error(error);
	process.exit(1);
});