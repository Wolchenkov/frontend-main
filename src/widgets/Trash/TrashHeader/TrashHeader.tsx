import React, { FC } from 'react';
import { Button, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './TrashHeader.styled';
import { useDeleteAllTrashMutation } from '../../../store/trash/trashApi';
import { useShowToast } from '../../../shared/utility/Hooks';

interface ITrashHeaderProps {
	data: ITrash | null;
}

export const TrashHeader: FC<ITrashHeaderProps> = ({ data }) => {
	const [deleteAllTrash] = useDeleteAllTrashMutation();
	const showToast = useShowToast();

	const handleDeleteAllTrash = () => {
		deleteAllTrash()
			.unwrap()
			.then(() => {
				showToast('Корзина очищена');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	return (
		<S.TrashHeader>
			<Text variant='title-2' color='neutral' attributes={{ style: { letterSpacing: '-0.015em' } }}>
				Корзина
			</Text>

			{data && Object.keys(data).length ? (
				<S.TrashHeaderRight>
					<Text variant='caption-2' attributes={{ style: { fontWeight: '600', color: '#898B8F' } }}>
						Объекты, которым более 30 дней, автоматически удаляются навсегда
					</Text>
					<Button
						size='small'
						color='black'
						startIcon={<SvgComponent name='delete-bin-light' />}
						onClick={handleDeleteAllTrash}
					>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							Очистить корзину
						</Text>
					</Button>
				</S.TrashHeaderRight>
			) : (
				<></>
			)}
		</S.TrashHeader>
	);
};
