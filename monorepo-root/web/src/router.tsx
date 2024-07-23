import { createHashRouter, Navigate } from 'react-router-dom';

import { EthPage } from '@/pages/eth';
import { SolPage } from '@/pages/sol';
import { HomePage } from '@/pages/home';

export const router = createHashRouter([
	{
		path: '/',
		element: <HomePage/>
	},
	{
		path: '/eth',
		element: <EthPage/>
	},
	{
		path: '/sol',
		element: <SolPage/>
	},
	{
		path: '*',
		element: <Navigate to="/"/>
	}
]);
