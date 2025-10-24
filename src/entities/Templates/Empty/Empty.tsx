import React, { FC } from 'react';
import * as S from './Empty.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

export const Empty: FC = () => {
	return (
		<S.Empty>
			<Avatar squared={true} icon={<SvgComponent name='to-do' />} />
			<S.EmptyTitle variant='body-1'>Создайте первый шаблон</S.EmptyTitle>
			<S.EmptyText variant='caption-1' color='neutral-faded'>
				Для этого перейдите в проект и выберите в меню проекта «Сохранить как шаблон»
			</S.EmptyText>
		</S.Empty>
	);
};
