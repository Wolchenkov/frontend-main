import Head from 'next/head';
import { Project } from '../../widgets';
import { NextPage } from 'next';
import { useGetProjectQuery } from '../../store/projects/projectsApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useRouter } from 'next/router';

const ProjectPage: NextPage = () => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const { data: dataProject, isLoading } = useGetProjectQuery(
		projectSlug && projectSlug && typeof projectSlug === 'string' ? projectSlug : skipToken
	);

	return (
		<>
			<Head>
				<title>{dataProject && dataProject.name}</title>
			</Head>

			{dataProject && <Project data={dataProject} isLoading={isLoading} />}
		</>
	);
};

export default ProjectPage;
