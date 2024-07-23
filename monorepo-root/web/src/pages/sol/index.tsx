import './index.scss';

import { App, Button, Card, Flex, Input, InputNumber, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
	Connection,
	Keypair,
	PublicKey,
	SystemProgram,
	TransactionMessage,
	VersionedTransaction
} from '@solana/web3.js';
import bs58 from 'bs58';

const LAMPORTS_PER_SOL = 1000000000;

export const SolPage = () => {
	const [secret, setSecret] = useState<string>('');
	const [toAddress, setToAddress] = useState<string>('');
	const [txCount, setTxCount] = useState<number>(50);
	const [value, setValue] = useState<number>(0.01);
	const [balance, setBalance] = useState<number>(0);

	const [hashList, setHashList] = useState<string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const doneCountRef = useRef<number>(0);

	const sendTransaction = async () => {
		const connect = new Connection('https://devnet.sonic.game');
		const pay = Keypair.fromSecretKey(
			bs58.decode(secret)
		);

		const _sendTransaction = async () => {
			console.log('doneCountRef.current: ', doneCountRef.current);
			if (doneCountRef.current >= txCount) {
				return;
			}

			const instruction = SystemProgram.transfer({
				fromPubkey: pay.publicKey,
				toPubkey: new PublicKey(toAddress),
				lamports: LAMPORTS_PER_SOL * value,
			});
			const latestBlockhash = await connect.getLatestBlockhash();
			const messageV0 = new TransactionMessage({
				payerKey: pay.publicKey,
				recentBlockhash: latestBlockhash.blockhash,
				instructions: [instruction]
			}).compileToV0Message();
			const transaction = new VersionedTransaction(messageV0);
			transaction.sign([pay]);  // 签名
			const signature = await connect.sendTransaction(transaction);

			const balance = await connect.getBalance(pay.publicKey);
			setBalance(balance / LAMPORTS_PER_SOL);

			setHashList(prevState => [...prevState, signature]);
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
						<div>当前sol余额: {balance}</div>
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
