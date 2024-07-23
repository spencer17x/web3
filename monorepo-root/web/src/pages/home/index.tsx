import './index.scss';

import { App, Button, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
	const navigate = useNavigate();

	return <App className="home-page">
		<Flex vertical={true} align="center" gap={8}>
			<Button type="primary" onClick={() => navigate('/eth')}>eth</Button>
			<Button type="primary" onClick={() => navigate('/sol')}>sol</Button>
		</Flex>
	</App>;
};
