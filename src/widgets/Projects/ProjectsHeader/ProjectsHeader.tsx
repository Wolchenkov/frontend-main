import React, { FC } from 'react';
import * as S from './ProjectsHeader.styled';
import {
	//  Button,
	Text,
} from 'reshaped/bundle';
// import { SvgComponent } from '../../../shared';
import { ProjectsMoreMenu } from '../ProjectsMoreMenu/ProjectsMoreMenu';
import { ProjectsGroup } from '../ProjectsTypes';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface ProjectsHeaderProps {
	groupName: string;
	projects: ProjectsGroup[];
	userRole: string | undefined;
}

export const ProjectsHeader: FC<ProjectsHeaderProps> = ({ groupName, projects, userRole }) => {
	return (
		<S.ProjectsHeader>
			<Text variant='title-2' attributes={{ style: { letterSpacing: '-0.015em' } }}>
				{groupName}
			</Text>
			<S.ProjectsHeaderRight>
				{/* <Button
					variant='ghost'
					startIcon={<SvgComponent name='search' />}
					size='small'
					// onClick={() => { }}
				/>
				{userRole && userRole !== UserRole.CLIENT && (
					<Button
						variant='ghost'
						startIcon={<SvgComponent name='timer' />}
						size='small'
						// onClick={() => { }}
					/>
				)} */}
				{userRole && (userRole === UserRole.ADMIN || userRole === UserRole.UNITMASTER || userRole === UserRole.MANAGER) && (
					<ProjectsMoreMenu isHasProjects={Boolean(projects.length)} groupName={groupName} />
				)}
			</S.ProjectsHeaderRight>
		</S.ProjectsHeader>
	);
};
