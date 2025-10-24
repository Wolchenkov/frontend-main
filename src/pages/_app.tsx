import type { AppProps } from 'next/app';
import { RootState, useAppDispatch, useAppSelector, wrapper } from '../store';
import { Reshaped } from 'reshaped/bundle';
import { Layout } from '../shared';
import 'reshaped/bundle.css';
import '../themes/braveManagerTheme/theme.css';
import { Sidebar } from '../widgets';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { setCurrentHost } from '../store/host/hostSlice';
import { setToken } from '../store/auth/authSlice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MyApp({ Component, pageProps }: AppProps) {
	const dispatch = useAppDispatch();

	const router = useRouter();

	const token = useAppSelector((state: RootState) => state.auth.token);
	const [isAuth, setIsAuth] = useState(false);

	const path = router.asPath;
	useEffect(() => {
		if (!token) {
			const localToken = localStorage.getItem('token');
			if (localToken && localToken !== 'null') {
				dispatch(setToken({ token: localToken }));
				setIsAuth(true);
			} else {
				if (!path.includes('auth')) router.push('/auth');
			}
		} else {
			setIsAuth(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [path]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const host = window.location.host;
			localStorage.setItem('currentHost', host);
			dispatch(setCurrentHost(host));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//убираем нажатие TAB
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener(
				'keydown',
				function (e) {
					if (e.key === 'Tab') {
						e.stopPropagation();
					}
				},
				true
			);
		}
	}, []);

	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<DndProvider backend={HTML5Backend}>
				<Reshaped theme='braveManagerTheme'>
					{isAuth ? (
						<Layout>
							<Sidebar />
							<Component {...pageProps} />
						</Layout>
					) : (
						<Component {...pageProps} />
					)}
				</Reshaped>
			</DndProvider>
		</>
	);
}

const wrappedApp = wrapper.withRedux(MyApp);

export default wrappedApp;
