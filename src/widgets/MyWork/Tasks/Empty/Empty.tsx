import React, { FC } from 'react';
import * as S from './Empty.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';

export const TasksEmpty: FC = () => {
	return (
		<S.Empty>
			<Avatar squared={true} icon={<SvgComponent name='list' />} />
			<S.EmptyTitle variant='body-1'>У вас нет задач</S.EmptyTitle>
		</S.Empty>
	);
};
