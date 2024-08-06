export interface TokensResponse {
	schemaVersion?: string;
	pairs?: Pair[];
}

export interface Pair {
	chainId?: string;
	dexId?: string;
	url?: string;
	pairAddress?: string;
	labels?: string[];
	baseToken?: EToken;
	quoteToken?: EToken;
	priceNative?: string;
	priceUsd?: string;
	txns?: Txns;
	volume?: PriceChange;
	priceChange?: PriceChange;
	liquidity?: Liquidity;
	fdv?: number;
	pairCreatedAt?: number;
	info?: Info;
}

export interface EToken {
	address?: string;
	name?: string;
	symbol?: string;
}

export interface Info {
	imageUrl?: string;
	websites?: Website[];
	socials?: Social[];
}

export interface Social {
	type?: string;
	url?: string;
}

export interface Website {
	label?: string;
	url?: string;
}

export interface Liquidity {
	usd?: number;
	base?: number;
	quote?: number;
}

export interface PriceChange {
	h24?: number;
	h6?: number;
	h1?: number;
	m5?: number;
}

export interface Txns {
	m5?: H1;
	h1?: H1;
	h6?: H1;
	h24?: H1;
}

export interface H1 {
	buys?: number;
	sells?: number;
}

export interface Link {
	label: string;
	url: string;
}

export interface Team {
	name: string;
	description: string;
	links: Link[];
}

export interface HtmlResponse {
	teams: Team[];
	checkLinks: Link[];
	buyLinks: Link[];
}