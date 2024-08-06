export interface QuotationResponse {
	token?: Token;
	vote?: Vote;
	my_vote?: MyVote;
}

export interface MyVote {
	liked?: number;
}

export interface Token {
	address?: string;
	symbol?: string;
	name?: string;
	decimals?: number;
	price?: number;
	logo?: string;
	price_1m?: number;
	price_5m?: number;
	price_1h?: number;
	price_6h?: number;
	price_24h?: number;
	volume_24h?: number;
	swaps_5m?: number;
	swaps_1h?: number;
	swaps_6h?: number;
	swaps_24h?: number;
	liquidity?: number;
	max_supply?: null;
	total_supply?: number;
	holder_count?: number;
	biggest_pool_address?: string;
	chain?: string;
	creation_timestamp?: null;
	open_timestamp?: number;
	circulating_supply?: null;
	high_price?: number;
	high_price_timestamp?: number;
	low_price?: null;
	low_price_timestamp?: null;
	buys_1m?: number;
	sells_1m?: number;
	swaps_1m?: number;
	volume_1m?: number;
	buy_volume_1m?: number;
	sell_volume_1m?: number;
	net_in_volume_1m?: number;
	buys_5m?: number;
	sells_5m?: number;
	volume_5m?: number;
	buy_volume_5m?: number;
	sell_volume_5m?: number;
	net_in_volume_5m?: number;
	buys_1h?: number;
	sells_1h?: number;
	volume_1h?: number;
	buy_volume_1h?: number;
	sell_volume_1h?: number;
	net_in_volume_1h?: number;
	buys_6h?: number;
	sells_6h?: number;
	volume_6h?: number;
	buy_volume_6h?: number;
	sell_volume_6h?: number;
	net_in_volume_6h?: number;
	buys_24h?: number;
	sells_24h?: number;
	buy_volume_24h?: number;
	sell_volume_24h?: number;
	net_in_volume_24h?: number;
	fdv?: number;
	market_cap?: number;
	circulating_market_cap?: null;
	link?: Link;
	pool_info?: PoolInfo;
	creator_address?: string;
	is_open_source?: number;
	is_honeypot?: number;
	buy_tax?: number;
	sell_tax?: number;
	lp_holders?: LpHolder[];
	warning?: Warning;
	lockInfo?: LockInfo;
	flags?: any[];
	social_links?: SocialLinks;
	is_in_token_list?: boolean;
	hot_level?: number;
	is_show_alert?: boolean;
	renounced?: number;
	call_num_24h?: number;
	smart_buy_24h?: number;
	smart_sell_24h?: number;
	creator_token_balance?: string;
	creator_close?: boolean;
	creator_token_status?: string;
	twitter_name_change_history?: any[];
	top_10_holder_rate?: number;
	dexscr_ad?: number;
	dexscr_update_link?: number;
	cto_flag?: number;
}

export interface Link {
	geckoterminal?: string;
	gmgn?: string;
}

export interface LockInfo {
	isLock?: boolean;
	lockDetail?: LockDetail[];
	lockTag?: string[];
	lockPercent?: number;
	leftLockPercent?: number;
}

export interface LockDetail {
	percent?: string;
	pool?: string;
	isBlackHole?: boolean;
	leftTimeLast?: number;
	leftTime?: string;
}

export interface LpHolder {
	tag?: string;
	value?: null;
	address?: string;
	balance?: string;
	percent?: string;
	NFT_list?: null;
	is_locked?: number;
	is_contract?: number;
}

export interface PoolInfo {
	address?: string;
	exchange?: string;
	token0_address?: string;
	token1_address?: string;
	base_address?: string;
	quote_address?: string;
	quote_symbol?: string;
	liquidity?: number;
	base_reserve?: string;
	quote_reserve?: string;
	initial_liquidity?: number;
	initial_base_reserve?: string;
	initial_quote_reserve?: string;
	creation_timestamp?: number;
	base_reserve_value?: string;
	quote_reserve_value?: string;
}

export interface SocialLinks {
	id?: number;
	chain?: string;
	address?: string;
	twitter_username?: string;
	website?: string;
	telegram?: string;
	description?: null;
	bitbucket?: null;
	discord?: null;
	facebook?: null;
	github?: null;
	instagram?: null;
	linkedin?: null;
	medium?: null;
	reddit?: null;
	tiktok?: null;
	youtube?: null;
	updated_at?: number;
}

export interface Warning {
	show?: boolean;
	msg?: string;
}

export interface Vote {
	like_count?: number;
	unlike_count?: number;
}

export interface RugHistoryResponse {
	chain?: string;
	token_address?: string;
	name?: string;
	symbol?: string;
	logo?: string;
	rug_ratio?: number;
	holder_rugged_num?: number;
	holder_token_num?: number;
	history?: History[];
}

export interface History {
	token_address?: string;
	rugged_type?: string;
	website?: null;
	website_ip?: null;
	creator?: string;
	rugged_at?: number;
	rugged_duration?: number;
	updated_at?: number;
	address?: string;
	name?: string;
	symbol?: string;
	logo?: string;
	creation_timestamp?: number;
	open_timestamp?: number | null;
	telegram?: string;
	twitter_username?: string;
}

export interface QuotationStatsResponse {
	signal_count?: number;
	degen_call_count?: number;
	rat_trader_count?: number;
	top_rat_trader_count?: number;
	top_smart_degen_count?: number;
	top_fresh_wallet_count?: number;
	top_rat_trader_amount_percentage?: number;
}

export interface WalletResponse {
	eth_balance?: string;
	sol_balance?: string;
	total_value?: number;
	unrealized_profit?: number;
	unrealized_pnl?: null;
	realized_profit?: number;
	pnl?: number;
	pnl_7d?: number;
	pnl_30d?: number;
	realized_profit_7d?: number;
	realized_profit_30d?: number;
	winrate?: null;
	all_pnl?: number;
	total_profit?: number;
	total_profit_pnl?: null;
	buy_30d?: number;
	sell_30d?: number;
	buy_7d?: number;
	sell_7d?: number;
	buy?: number;
	sell?: number;
	history_bought_cost?: number;
	token_avg_cost?: number;
	token_sold_avg_profit?: number;
	token_num?: number;
	profit_num?: number;
	pnl_lt_minus_dot5_num?: number;
	pnl_minus_dot5_0x_num?: number;
	pnl_lt_2x_num?: number;
	pnl_2x_5x_num?: number;
	pnl_gt_5x_num?: number;
	last_active_timestamp?: number;
	is_contract?: boolean;
	updated_at?: number;
	refresh_requested_at?: null;
}