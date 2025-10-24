import React, { FC, useEffect } from 'react';
import * as S from './ProjectHeader.styled';
import {
	//Button,
	Text,
} from 'reshaped/bundle';
// import { SvgComponent } from '../../../shared';
import { ProjectMoreMenu } from '../ProjectMoreMenu/ProjectMoreMenu';
import { useGetUserQuery } from '../../../store/auth/authApi';
import { ProjectTimer } from '../ProjectTimer/ProjectTimer';
import { useAppDispatch } from '../../../store';
import { setTimers } from '../../../store/auth/authSlice';

interface ProjectHeaderProps {
	dataProject: IOneProject;
	groupId: number;
	isClientRole: boolean;
	isMemberRole: boolean;
}

export const ProjectHeader: FC<ProjectHeaderProps> = ({ dataProject, groupId, isClientRole, isMemberRole }) => {
	const { data: user, refetch: refetchUser } = useGetUserQuery();
	const dispatch = useAppDispatch();
	useEffect(() => {
		user && dispatch(setTimers(user?.timers));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<S.ProjectHeader>
			<Text variant='title-2' attributes={{ style: { letterSpacing: '-0.015em' } }}>
				{dataProject?.name}
			</Text>
			<S.ProjectHeaderRight>
				{!isClientRole && user && <ProjectTimer user={user} refetchUser={refetchUser} />}
				{/* <Button
					variant='ghost'
					startIcon={<SvgComponent name='search' />}
					size='small'
					// onClick={() => { }}
				/> */}
				{!isClientRole && (
					<ProjectMoreMenu
						dataProject={dataProject}
						groupId={groupId}
						isMemberRole={isMemberRole}
						userRole={user?.role?.name}
					/>
				)}
			</S.ProjectHeaderRight>
		</S.ProjectHeader>
	);
};
