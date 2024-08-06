export * as AlchemyService from './alchemy';
export * as GMGNService from './gmgn';
export * as DexService from './dexscreener';

export const getCheckLinks = (tokenAddress: string) => {
	return [
		{
			label: 'GoPlus',
			url: `https://gopluslabs.io/token-security/1/${tokenAddress}`,
		},
		{
			label: 'Honeypot',
			url: `https://honeypot.is/ethereum?address=${tokenAddress}`,
		},
		{
			label: 'TokenSniffer',
			url: `https://tokensniffer.com/token/eth/${tokenAddress}`,
		}
	];
};

export const getBuyLinks = (tokenAddress: string) => {
	return [
		{
			label: 'Ave.ai',
			url: `https://ave.ai/token/${tokenAddress}-eth`,
		},
		{
			label: 'DEXScreener',
			url: `https://dexscreener.com/ethereum/${tokenAddress}`,
		},
		{
			label: 'DEXTools',
			url: `https://www.dextools.io/app/cn/ether/pair-explorer/${tokenAddress}`
		},
		{
			label: 'GMGN',
			url: `https://gmgn.ai/eth/token/${tokenAddress}`
		}
	];
};
