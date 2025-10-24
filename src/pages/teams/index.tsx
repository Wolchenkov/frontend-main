import type { NextPage } from 'next';
import Head from 'next/head';
import Teams from '../../widgets/Teams/Teams';
import { useGetUserQuery } from '../../store/auth/authApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TeamsPage: NextPage = () => {
	const { data: user, isLoading } = useGetUserQuery();
	const router = useRouter();
	useEffect(() => {
		if (user && 'role' in user) {
			if (user.role?.name !== 'admin' && user.role?.name !== 'unitMaster') router.push('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<>
			<Head>
				<title>Команды</title>
			</Head>

			{isLoading ? <></> : <Teams />}
		</>
	);
};

export default TeamsPage;
