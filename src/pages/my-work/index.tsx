/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useGetUserQuery } from '../../store/auth/authApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MyWork } from '../../widgets/MyWork/MyWork';
import { UserRole } from '../../shared/utility/Constants/userRole';

const ManagementPage: NextPage = () => {
	const { data: user } = useGetUserQuery();
	const router = useRouter();

	useEffect(() => {
		if (!user) return;
		if (user.role?.name === UserRole.CLIENT) router.push('/404');
	}, [user]);

	return (
		<>
			<Head>
				<title>Моя работа</title>
			</Head>

			{user && user.role?.name !== UserRole.CLIENT && <MyWork user={user} />}
		</>
	);
};

export default ManagementPage;
