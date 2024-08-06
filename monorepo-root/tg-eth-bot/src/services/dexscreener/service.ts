import axios from 'axios';
import { load } from 'cheerio';

export class Service {
	/**
	 * 获取页面数据
	 * @param tokenAddress
	 */
	async getHtmlInfo(tokenAddress: string) {
		const htmlResponse = await axios.get(
			`https://dexscreener.com/ethereum/${tokenAddress}`,
			{
				headers: {
					'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
					'accept-language': 'zh-CN,zh;q=0.9',
					'cache-control': 'no-cache',
					'cookie': '_ga_532KFVB4WT=deleted; __cuid=f4abb27f013c4039862b77e94f5223ca; amp_fef1e8=2dc1753d-3ce8-487e-8d67-8f05b8c87e6aR...1hnit2gd5.1hnit2to9.8.0.8; chakra-ui-color-mode=dark; cf_clearance=cU6Z8cdRqXd7lpYCP2fqD8wZ93.gEaAc2ieK832RNFU-1722845678-1.0.1.1-WEekhK5gAlgmINDcUax352EWNYXLJRv0vvuuRjigeuBNkxpvWFBUB1hLzOYNh2mx5yis_Lv9iKePmK5VmP2hhg; _gid=GA1.2.727084106.1722845821; _ga_CFY1SSGE2N=GS1.1.1722861925.3.1.1722861990.0.0.0; _ga_RD6VMQDXZ6=GS1.1.1722863162.12.1.1722864509.0.0.0; __cf_bm=SAn4qe3EsrYpLiHhMSxFj87Dl2RDbDz4NvY_9MmawDQ-1722865578-1.0.1.1-hGRKF.RgKxHTC65B9kpB2rbRwLABu67ZYAl9GPqWkH7LO0boW3wIBTPP3ufT6wg3o19VRlOJEVcuG6VRIefhOpEes79vAKYJUmrrrvYVljM; _ga=GA1.1.507894363.1705724656; _ga_532KFVB4WT=GS1.1.1722861886.661.1.1722866625.57.0.0; __cf_bm=7qWVM20pNGyxv1raUHPKgMxDz1U9mi9ZQ7htobExk.w-1722868727-1.0.1.1-Oo9yk2nUGvR5IAi4fb8KwcrSl2eiBB5rzGgSnJ9keNtv0jO91tHK1FGbDD2CXCfFYkYIiTVzbshkDf6S25cjJ7xdSE9oL8BCu4wrzXDAZ38',
					'pragma': 'no-cache',
					'priority': 'u=0, i',
					'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
					'sec-ch-ua-arch': '"arm"',
					'sec-ch-ua-bitness': '"64"',
					'sec-ch-ua-full-version': '"127.0.6533.89"',
					'sec-ch-ua-full-version-list': '"Not)A;Brand";v="99.0.0.0", "Google Chrome";v="127.0.6533.89", "Chromium";v="127.0.6533.89"',
					'sec-ch-ua-mobile': '?0',
					'sec-ch-ua-model': '""',
					'sec-ch-ua-platform': '"macOS"',
					'sec-ch-ua-platform-version': '"14.5.0"',
					'sec-fetch-dest': 'document',
					'sec-fetch-mode': 'navigate',
					'sec-fetch-site': 'same-origin',
					'sec-fetch-user': '?1',
					'upgrade-insecure-requests': '1',
					'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
				}
			}
		);

		const $ = load(htmlResponse.data);
		const teams = $('div.chakra-accordion__item')
			.map((_, element) => {
				return {
					name: $(element).find('button').eq(0).text(),
					description: $(element).find('p.chakra-text').eq(0).text(),
					links: $(element)
						.find('a[class^="chakra-link"]')
						.map((_, element) => {
							return {
								label: $(element).text(),
								url: $(element).attr('href') || '',
							};
						})
						.get(),
				};
			})
			.get();

		return {
			teams
		};
	}
}