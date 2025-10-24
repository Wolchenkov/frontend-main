import * as S from './Projects.styled';
import { useToggle } from 'reshaped/bundle';
import { ProjectsHeader } from './ProjectsHeader/ProjectsHeader';
import { ProjectsPanel } from './ProjectsPanel/ProjectsPanel';
import { ProjectsResult } from './ProjectsResult/ProjectsResult';
import { AddProjectModal } from './AddProjectModal/AddProjectModal';
import { FC } from 'react';
import { CurrentGroup } from './ProjectsTypes';
import { PROJECTS_TABS, useProjectsController } from './ProjectsController';
import { ProjectsTemplates } from './ProjectsTemplates/ProjectsTemplates';
import { Documents } from '../Documents/Documents';

interface ProjectsProps {
	projects: CurrentGroup;
	user: IMember | undefined;
}

export const Projects: FC<ProjectsProps> = ({ projects, user }) => {
	const { active, activate, deactivate } = useToggle(false);
	const { handleTabChange, mainTabValue, isTemplateChoice, currentFolder, setCurrentFolder } =
		useProjectsController(PROJECTS_TABS);

	return (
		<S.ProjectsWrap>
			{isTemplateChoice ? (
				<></>
			) : (
				<>
					<ProjectsHeader groupName={projects.name} projects={projects.projects} userRole={user?.role?.name} />

					<ProjectsPanel
						openModal={activate}
						handleTabChange={handleTabChange}
						mainTabValue={mainTabValue}
						userRole={user?.role?.name}
						currentFolder={currentFolder}
					/>
				</>
			)}

			{mainTabValue.name === 'list' ? (
				<ProjectsResult openModal={activate} projects={projects.projects} userRole={user?.role?.name} />
			) : mainTabValue.name === 'templates' ? (
				<ProjectsTemplates isTemplateChoice={isTemplateChoice} user={user} />
			) : (
				<Documents currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} type='groups' />
			)}
			{active && <AddProjectModal groupId={projects.id} active={active} onClose={deactivate} />}
		</S.ProjectsWrap>
	);
};
