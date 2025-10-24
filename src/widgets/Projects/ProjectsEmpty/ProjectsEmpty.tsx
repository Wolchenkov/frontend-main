import React, { FC } from 'react';
import * as S from './ProjectsEmpty.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { UserRole } from '../../../shared/utility/Constants/userRole';

interface IProjectsEmptyProps {
	userRole: string | undefined;
	openModal: () => void;
}

export const ProjectsEmpty: FC<IProjectsEmptyProps> = ({ userRole, openModal }) => {
	return (
		<S.ProjectsEmpty>
			<Avatar squared={true} icon={<SvgComponent name='to-do' />} attributes={{ style: { marginBottom: '20px' } }} />
			<S.ProjectsEmptyTitle variant='body-1'>Создайте первый проект</S.ProjectsEmptyTitle>
			<S.ProjectsEmptyText variant='caption-1' color='neutral-faded'>
				Проекты помогут сохранять организованность работы команды
			</S.ProjectsEmptyText>
			{userRole && !(userRole === UserRole.CLIENT || userRole === UserRole.MEMBER) && (
				<S.ProjectsEmptyButton variant='outline' size='small' onClick={openModal}>
					Создать новый проект
				</S.ProjectsEmptyButton>
			)}
		</S.ProjectsEmpty>
	);
};
