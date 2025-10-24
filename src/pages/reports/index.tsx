import type { NextPage } from 'next';
import Head from 'next/head';
import { useGetUserQuery } from '../../store/auth/authApi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Reports } from '../../widgets/Reports/Reports';
import { UserRole } from '../../shared/utility/Constants/userRole';

const ReportsPage: NextPage = () => {
	const { data: user, isLoading } = useGetUserQuery();
	const router = useRouter();
	useEffect(() => {
		if (user && 'role' in user) {
			if (user.role?.name === UserRole.CLIENT || user.role?.name === UserRole.MEMBER) router.push('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<>
			<Head>
				<title>Отчеты</title>
			</Head>

			{!isLoading && <Reports role={user?.role?.name}/>}
		</>
	);
};

export default ReportsPage;
