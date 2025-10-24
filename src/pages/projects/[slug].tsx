import Head from 'next/head';
import { Projects } from '../../widgets';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetGroupProjectsQuery } from '../../store/groups/groupsApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { Loader } from 'reshaped/bundle';
import styled from 'styled-components';
import { useGetUserQuery } from '../../store/auth/authApi';

const LoaderContainer = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
`;

const ProjectsPage: NextPage = () => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const [projects, setProjects] = useState(undefined);
	const {
		data: currentProjects,
		isSuccess,
		isLoading,
	} = useGetGroupProjectsQuery(typeof projectSlug === 'string' ? projectSlug : skipToken);
	const { data: user } = useGetUserQuery();

	useEffect(() => {
		if (isSuccess) {
			setProjects(currentProjects);
		}
	}, [isSuccess, currentProjects]);

	return (
		<>
			<Head>
				<title>{isSuccess && currentProjects.name}</title>
			</Head>

			{isLoading ? (
				<LoaderContainer>
					<Loader size='medium' />
				</LoaderContainer>
			) : (
				projects && <Projects projects={projects} user={user} />
			)}
		</>
	);
};

export default ProjectsPage;
