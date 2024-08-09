import 'dotenv/config';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import * as fs from 'node:fs';
import { Network } from 'alchemy-sdk';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';

import { AlchemyService, DexService, getBuyLinks, getCheckLinks, GMGNService } from './services';
import { formatNumbro, formatPeoples, percent, renderStateUI } from './utils';
import { alchemyApiKey, botToken } from './config';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

const main = async () => {
	const gmgnService = new GMGNService.Service();
	const alchemyService = new AlchemyService.Service({
		apiKey: alchemyApiKey,
		network: Network.ETH_MAINNET
	});
	const dexService = new DexService.Service();

	const bot = new Telegraf(botToken);
	await new Promise((resolve) => bot.launch(() => resolve(null)));
	console.log(`Bot 启动成功: ${new Date().toString()}`);

	bot.start((ctx) => ctx.reply(`Hello ${ctx.from?.first_name}!`));
	bot.on(message('text'), async (ctx) => {
		const tokenAddress = ctx.message?.text;
		const isContractAddress = await alchemyService.core.isContractAddress(tokenAddress).catch(() => false);
		if (!isContractAddress) {
			return;
		}

		console.log(`开始查询 ${tokenAddress} 的信息`);
		const tokenPair = await dexService.getTokenPair(tokenAddress);

		const quotationResponse = await gmgnService.getQuotation(tokenAddress);
		fs.writeFileSync('./logs/quotationResponse.json', JSON.stringify(quotationResponse, null, 2));
		const { token } = quotationResponse;
		const percent5m = `${tokenPair?.priceChange?.m5}%`;
		const percent1h = `${tokenPair?.priceChange?.h1}%`;
		const percent6h = `${tokenPair?.priceChange?.h6}%`;
		const percent24h = `${tokenPair?.priceChange?.h24}%`;
		const tokenTemplate = [
			`*${token?.symbol} (${token?.name})*`,
			`\`${tokenAddress}\``,
			`|——市值：${formatNumbro(token?.market_cap)}`,
			`|——FDV：${formatNumbro(token?.fdv)}`,
			`|——价格：${formatNumbro(token?.price)}`,
			`|——持有者：${formatPeoples(token?.holder_count)}`,
			`|——5m|1h|6h|24h：${percent5m}|${percent1h}|${percent6h}|${percent24h}`
		];
		console.log('基础信息查询完成');

		const { pool_info } = token || {};
		const lockInfos = (token?.lockInfo?.lockDetail || []).map(lockInfo => {
			return [percent(lockInfo.percent), lockInfo.pool, lockInfo.leftTime].filter(Boolean).join('-');
		});
		const poolCreationTimestamp = (pool_info?.creation_timestamp || 0) * 1000;
		const poolTemplate = [
			'池子',
			`|——类型：${(pool_info?.exchange || '-').toUpperCase()}`,
			`|——创建时间：${dayjs(poolCreationTimestamp).format('YYYY-MM-DD HH:mm:ss')} (${dayjs(poolCreationTimestamp).fromNow()})`,
			`|——初始池子：${formatNumbro(pool_info?.initial_quote_reserve)}E`,
			`|——当前池子：${formatNumbro(pool_info?.quote_reserve)}E`,
			`|——池子详情: ${lockInfos.join(' | ')}`
		];
		console.log('池子信息查询完成');

		const quotationStatsResponse = await gmgnService.getQuotationStats(tokenAddress);
		fs.writeFileSync('./logs/quotationStatsResponse.json', JSON.stringify(quotationStatsResponse, null, 2));
		const rugHistoryResponse = await gmgnService.getRugHistory(tokenAddress);
		fs.writeFileSync('./logs/rugHistoryResponse.json', JSON.stringify(rugHistoryResponse, null, 2));
		const holder_rugged_num = rugHistoryResponse.holder_rugged_num || '-';
		const holder_token_num = rugHistoryResponse.holder_token_num || '-';
		const rugPercent = rugHistoryResponse.rug_ratio ? percent(rugHistoryResponse.rug_ratio) : '-';
		const securityTemplate = [
			'安全',
			`|——老鼠仓：${percent(quotationStatsResponse.top_rat_trader_amount_percentage)}`,
			`|——跑路概率：${rugPercent} (${holder_rugged_num}/${holder_token_num})`,
			`|——买/卖税率：${percent(token?.buy_tax)} / ${percent(token?.sell_tax)}`,
			`|——开源：${renderStateUI(token?.is_open_source)} / 丢权限：${renderStateUI(token?.renounced)}`,
			`|——锁/烧池子：${renderStateUI(token?.lockInfo?.isLock)}`,
			`|——Top10：${percent(token?.top_10_holder_rate)}`
		];
		console.log('安全信息查询完成');

		const walletResponse = await gmgnService.getWallet(token?.creator_address || '');
		fs.writeFileSync('./logs/walletResponse.json', JSON.stringify(walletResponse, null, 2));
		const createdTokenResponses = await alchemyService.getCreatedTokensByAddress(token?.creator_address || '');
		const holdTokens = await alchemyService.getTokensByAddress(token?.creator_address || '');
		const creatorTemplate = [
			`开发者([${token?.creator_address?.slice(-6)}](https://etherscan.io/address/${token?.creator_address}))`,
			`|——钱包余额：${formatNumbro(walletResponse.eth_balance)}E`,
			`|——创建代币：${createdTokenResponses.map(item => `[${item.meta.symbol}](${dexService.getPageUrl(item.transactionReceipts?.contractAddress || '')})`).join(' | ') || '-'}`,
			`|——持有代币：${holdTokens.map(item => `[${item.symbol}](${dexService.getPageUrl(item.contractAddress)})`).join(' | ') || '-'}`
		];
		console.log('开发者信息查询完成');

		const socialLinks = [
			...(tokenPair?.info?.websites || []),
			...(tokenPair?.info?.socials || []).map(item => ({ label: item.type, url: item.url }))
		];
		const socialTemplate = [
			`社交链接`,
			`|——${socialLinks.map(link => `[${link.label}](${link.url})`).join(' | ')}`,
		];
		console.log('社交信息查询完成');

		const othersTemplate = [
			`相关链接`,
			`|——${getCheckLinks(tokenAddress).map(link => `[${link.label}](${link.url})`).join(' | ')}`,
			`|——${getBuyLinks(tokenAddress).map(link => `[${link.label}](${link.url})`).join(' | ')}`
		];
		console.log('相关链接查询完成');

		const template = [
			tokenTemplate.join('\n'),
			poolTemplate.join('\n'),
			securityTemplate.join('\n'),
			creatorTemplate.join('\n'),
			socialTemplate.join('\n'),
			othersTemplate.join('\n'),
		].join('\n\n');

		ctx
			.reply(
				template,
				{ parse_mode: 'Markdown', link_preview_options: { is_disabled: true } }
			)
			.catch(console.error);
	});
};

main()
	.catch(error => {
		console.error(error);
		process.exit(1);
	});