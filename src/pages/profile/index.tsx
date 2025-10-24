import type { NextPage } from 'next';
import Head from 'next/head';
import { Profile } from '../../widgets/Profile/Profile';

const ProfilePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Профиль</title>
			</Head>

			<Profile />
		</>
	);
};

export default ProfilePage;
