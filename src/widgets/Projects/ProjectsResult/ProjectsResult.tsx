import React, { FC } from 'react';
import * as S from './ProjectsResult.styled';
import { ProjectsTable } from '../ProjectsTable/ProjectsTable';
import { ProjectsEmpty } from '../ProjectsEmpty/ProjectsEmpty';
import { ProjectsGroup } from '../ProjectsTypes';

interface IProjectsResultProps {
	openModal: () => void;
	projects: ProjectsGroup[];
	userRole: string | undefined;
}

export const ProjectsResult: FC<IProjectsResultProps> = ({ openModal, projects, userRole }) => {
	return (
		<S.ProjectsResult>
			{projects.length ? (
				<ProjectsTable data={projects} openModal={openModal} userRole={userRole} />
			) : (
				<ProjectsEmpty openModal={openModal} userRole={userRole} />
			)}
		</S.ProjectsResult>
	);
};
