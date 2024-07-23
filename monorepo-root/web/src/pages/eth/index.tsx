import './index.scss';

import { App, Button, Card, Flex, Input, InputNumber, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { ethers, Wallet } from 'ethers';

export const EthPage = () => {
	const [secret, setSecret] = useState('');
	const [toAddress, setToAddress] = useState('');
	const [txCount, setTxCount] = useState<number>(50);
	const [value, setValue] = useState<number>(0.01);
	const [balance, setBalance] = useState<number>(0);

	const [hashList, setHashList] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const doneCountRef = useRef(0);

	const sendTransaction = async () => {
		const provider = ethers.getDefaultProvider('https://rpc.sepolia.org');
		const wallet = new Wallet(secret, provider);

		const _sendTransaction = async () => {
			console.log('doneCountRef.current: ', doneCountRef.current);
			if (doneCountRef.current >= txCount) {
				return;
			}

			const response = await wallet.sendTransaction({
				to: toAddress,
				value: ethers.parseEther(value.toString())
			});

			const balance = await provider.getBalance(wallet.address);
			setBalance(+ethers.formatEther(balance));

			setHashList(prevState => [...prevState, response.hash]);
			doneCountRef.current += 1;

			await _sendTransaction();
		};

		setLoading(true);
		try {
			await _sendTransaction();
			message.success('转账完成');
		} catch (e) {
			console.log('error: ', e);
			if (e instanceof Error) {
				message.error(e.message);
			}
		}
		setLoading(false);
	};

	// 修改钱包密钥或者地址时, 数据重置
	useEffect(() => {
		setHashList([]);
		doneCountRef.current = 0;
	}, [secret, toAddress]);

	return <Flex vertical={true} align="center" className="eth-page">
		<Card style={{ width: 600, margin: 20 }}>
			<Flex vertical={true} gap={8}>
				<label className="label">
					<div>输入 from 钱包密钥:</div>
					<Input value={secret} onChange={e => setSecret(e.target.value)}/>
				</label>
				<label className="label">
					<div>输入 to 钱包地址:</div>
					<Input value={toAddress} onChange={e => setToAddress(e.target.value)}/>
				</label>
				<label className="label">
					<div>输入转账次数:</div>
					<InputNumber value={txCount} onChange={(value) => setTxCount(value as number)}/>
				</label>
				<label className="label">
					<div>输入转账金额:</div>
					<InputNumber value={value} onChange={(value) => setValue(value as number)}/>
				</label>
				<Button loading={loading} type="primary" onClick={sendTransaction}>开始转账</Button>
				<App>
					<div>日志:</div>
					<div className="log">
						<div>当前eth余额: {balance}</div>
						<div>已完成转账次数: {hashList.length}</div>
						{
							hashList.map((hash, index) => {
								return <div key={index}>hash: {hash}</div>;
							})
						}
					</div>
				</App>
			</Flex>
		</Card>
	</Flex>;
};
