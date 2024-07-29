declare global {
	namespace NodeJS {
		interface ProcessEnv {
			RPC_URL: string;
			PRIVATE_KEY_PASS: string;
			PRIVATE_KEY: string;
		}
	}
}

export {};