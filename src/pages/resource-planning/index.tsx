import { FC } from 'react';
import Head from 'next/head';
import ResourcePlanning from '../../widgets/ResourcePlanning/ResourcePlanning';

const ResourcePlanningPage: FC = () => {
	return (
		<>
			<Head>
				<title>Ресурсное планирование</title>
			</Head>
			<ResourcePlanning />
		</>
	);
};

export default ResourcePlanningPage;
