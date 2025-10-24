import Head from 'next/head';
import { FC, useEffect } from 'react';
import { Footer } from '../../entities';
import { FirstLoginForm } from '../../features';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.main`
	overflow: hidden;
`;

const FirstAutn: FC = () => {
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
				<title>Установка пароля и имени | Brave</title>
			</Head>
			<Container>
				<FirstLoginForm />
				<Footer />
			</Container>
		</>
	);
};

export default FirstAutn;
