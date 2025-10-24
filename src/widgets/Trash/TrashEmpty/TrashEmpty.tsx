import React, { FC } from 'react';
import * as S from './TrashEmpty.styled';
import { Avatar } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface ITrashEmptyProps {
	filter: { value: string; label: string };
}

export const TrashEmpty: FC<ITrashEmptyProps> = ({ filter }) => {
	return (
		<S.Empty>
			<Avatar squared={true} icon={<SvgComponent name='delete-bin' />} />
			<S.EmptyTitle variant='body-1'>
				{filter.value === 'all' ? 'Корзина пуста' : 'Такие объекты в корзине не обнаружены'}
			</S.EmptyTitle>
		</S.Empty>
	);
};
