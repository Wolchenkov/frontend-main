import Head from 'next/head';
import { FC, useEffect } from 'react';

import styled from 'styled-components';
import { AuthHeader, Footer } from '../../../entities';
import { NewPasswordForm } from '../../../features';
import { useRouter } from 'next/router';

const MainContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 547px;
	text-align: center;
	margin: 96px auto 0 auto;
`;
const Container = styled.div`
	text-align: start;
	width: 360px;
`;
const Wrapper = styled.main`
	overflow: hidden;
`;
const Password: FC = () => {
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
			<Wrapper>
				<MainContainer>
					<AuthHeader svgName='lock-password' marginBottom={32} text='Восстановить забытый пароль' />
					<Container>
						<NewPasswordForm />
					</Container>
				</MainContainer>
				<Footer />
			</Wrapper>
		</>
	);
};

export default Password;
