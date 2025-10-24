import React, { FC } from 'react';
import { Text } from 'reshaped/bundle';
import * as S from './Header.styled';

export const ManagementHeader: FC = () => {
	return (
		<S.ManagementHeader>
			<Text variant='title-2' attributes={{ style: { letterSpacing: '-0.015em' } }}>
				Администрирование
			</Text>
		</S.ManagementHeader>
	);
};
