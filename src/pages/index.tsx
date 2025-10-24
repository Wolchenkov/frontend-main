import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useGetUserQuery } from '../store/auth/authApi';
import { UserRole } from '../shared/utility/Constants/userRole';

const MainWrapper = styled.div`
	display: flex;
	justify-content: center;
	height: 300px;
	align-items: center;
	font-size: 30px;
	font-weight: 800;
`;

const Home: NextPage = () => {
	const { data: user } = useGetUserQuery();
	const router = useRouter();

	useEffect(() => {
		user?.role?.name && user?.role?.name !== UserRole.CLIENT && router.push('/my-work');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<>
			<Head>
				<title>Brave</title>
			</Head>
			{user?.role?.name && user?.role?.name === UserRole.CLIENT && <MainWrapper>Brave Главная</MainWrapper>}
		</>
	);
};

export default Home;
