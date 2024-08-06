import {
	Alchemy,
	AlchemySettings,
	AssetTransfersCategory,
	AssetTransfersWithMetadataResult,
	OwnedToken
} from 'alchemy-sdk';

export class Service extends Alchemy {
	client: Alchemy;

	constructor(settings: AlchemySettings) {
		super(settings);
		this.client = new Alchemy(settings);
	}

	/**
	 * 获取指定地址的所有 token
	 * @param address
	 */
	async getTokensByAddress(address: string) {
		const tokens: OwnedToken[] = [];

		let pageKey: undefined | string;
		do {
			const tokensForOwnerResponse = await this.client.core.getTokensForOwner(address, {
				pageKey
			});
			tokens.push(...tokensForOwnerResponse.tokens);
			pageKey = tokensForOwnerResponse.pageKey;
		} while (pageKey);

		return tokens;
	}

	/**
	 * 获取指定地址创建的所有 token
	 * @param address
	 */
	async getCreatedTokensByAddress(address: string) {
		const transfers: AssetTransfersWithMetadataResult[] = [];

		let pageKey: undefined | string;
		do {
			const tokensForOwnerResponse = await this.client.core.getAssetTransfers({
				pageKey,
				fromBlock: '0x0',
				toBlock: 'latest',
				fromAddress: address,
				excludeZeroValue: false,
				category: [AssetTransfersCategory.EXTERNAL],
				withMetadata: true
			});
			pageKey = tokensForOwnerResponse.pageKey;
			transfers.push(...tokensForOwnerResponse.transfers);
		} while (pageKey);

		const deployments = transfers.filter((transfer) => transfer.to === null);
		const txHashes = deployments.map((deployment) => deployment.hash);
		const transactionReceipts = await Promise.all(
			txHashes.map((txHash) =>
				this.client.core.getTransactionReceipt(txHash)
			)
		);

		const tokenMetadataResponses = await Promise.all(
			transactionReceipts.map((token) => {
				return this.client.core.getTokenMetadata(token?.contractAddress || '');
			})
		);
		return tokenMetadataResponses.map(((item, index) => {
			return {
				transactionReceipts: transactionReceipts[index],
				meta: item,
			};
		}));
	}
}