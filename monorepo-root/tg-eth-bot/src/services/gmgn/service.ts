import { request } from './request';
import { QuotationResponse, QuotationStatsResponse, RugHistoryResponse, WalletResponse } from './types';

export class Service {
	/**
	 * 获取报价
	 * @param tokenAddress
	 */
	async getQuotation(tokenAddress: string) {
		return request.get<QuotationResponse, QuotationResponse>(
			`/defi/quotation/v1/tokens/eth/${tokenAddress}`,
		);
	}

	/**
	 * 获取 rug 历史
	 * @param tokenAddress
	 */
	async getRugHistory(tokenAddress: string) {
		return request.get<RugHistoryResponse, RugHistoryResponse>(
			`/defi/quotation/v1/tokens/rug_history/eth/${tokenAddress}`,
		);
	}

	/**
	 * 获取报价统计
	 * @param tokenAddress
	 */
	async getQuotationStats(tokenAddress: string) {
		return request.get<QuotationStatsResponse, QuotationStatsResponse>(
			`/defi/quotation/v1/tokens/stats/eth/${tokenAddress}`
		);
	}

	/**
	 * 获取钱包
	 * @param walletAddress
	 */
	async getWallet(walletAddress: string) {
		return request.get<WalletResponse, WalletResponse>(
			`/defi/quotation/v1/smartmoney/eth/walletNew/${walletAddress}`,
		);
	}
}