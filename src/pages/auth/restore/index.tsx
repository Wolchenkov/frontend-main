import Head from 'next/head';
import { FC, useEffect } from 'react';
import { Footer } from '../../../entities';
import { RestoreForm } from '../../../features';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.main`
	overflow: hidden;
`;

const Restore: FC = () => {
	const router = useRouter();
	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (localToken) {
			router.push('/');
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);
	return (
		<>
			<Head>
				<title>Восстановление пароля | Brave</title>
			</Head>
			<Container>
				<RestoreForm />
				<Footer />
			</Container>
		</>
	);
};

export default Restore;
