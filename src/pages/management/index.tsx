/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Head from 'next/head';
import { useGetUserQuery } from '../../store/auth/authApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Management } from '../../widgets/Management/Management';
import { UserRole } from '../../shared/utility/Constants/userRole';

const ManagementPage: NextPage = () => {
	const { data: user } = useGetUserQuery();
	const router = useRouter();

	useEffect(() => {
		if (!user) return;
		if (user.role?.name !== UserRole.ADMIN) router.push('/');
	}, [user]);

	return (
		<>
			<Head>
				<title>Администрирование</title>
			</Head>

			{user && <Management />}
		</>
	);
};

export default ManagementPage;
