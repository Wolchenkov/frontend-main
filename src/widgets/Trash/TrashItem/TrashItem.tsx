import React, { FC, useState } from 'react';
import { Button, Icon, Text, DropdownMenu, useToggle } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import * as S from './TrashItem.styled';
import { getInitials } from '../../../shared/utility/Utils';
import { useDeleteTrashItemMutation, useRecoverTrashItemMutation } from '../../../store/trash/trashApi';
import { useShowToast } from '../../../shared/utility/Hooks';

interface ITrashItemProps {
	data: ITrashItem;
	groupName: string;
}

export const TrashItem: FC<ITrashItemProps> = ({ data, groupName }) => {
	const { entity_name: itemName, entity_id: itemId } = data;
	const [isHovered, setIsHovered] = useState(false);
	const { active, activate, deactivate } = useToggle(false);

	const [recoverTrashItem] = useRecoverTrashItemMutation();
	const [deleteTrashItem] = useDeleteTrashItemMutation();
	const showToast = useShowToast();

	const handleRecover = () => {
		recoverTrashItem({ itemName, itemId })
			.unwrap()
			.then(() => {
				showToast('Восстановление успешно выполнено');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	const handleDelete = () => {
		deleteTrashItem({ itemName, itemId })
			.unwrap()
			.then(() => {
				showToast('Удаление завершено успешно');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	return (
		<S.TrashItem
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				deactivate();
			}}
			hovered={isHovered}
		>
			{itemName === 'user' ? (
				<AvatarCustom
					src={(data as ITrashUserItem).additional_info.avatar || undefined}
					initials={getInitials((data as ITrashUserItem).additional_info.user_name) || ''}
					size={6}
				/>
			) : ((itemName === 'docs' && (data as ITrashDocsItem)?.additional_info?.is_folder) || itemName === 'group') ? (
				<Icon size={4} svg={<SvgComponent name={`trash-project`} />} />
			) : (
				<Icon size={4} svg={<SvgComponent name={`trash-${groupName}`} />} />
			)}

			<Text
				variant='caption-1'
				color='neutral'
				attributes={{
					style: { letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
				}}
			>
				{itemName === 'user' ? (
					(data as ITrashUserItem).additional_info.user_name
				) : itemName === 'comment' ? (
					<>
						{(data as ITrashCommentItem).additional_info.user_comment_by}:{' '}
						<span style={{ color: '#898B8F' }}>{(data as ITrashCommentItem).additional_info.user_comment_text}</span>
					</>
				) : (
					(data as ITrashCommonItem).item_name
				)}
			</Text>
			<DropdownMenu position='bottom-end' active={active}>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button
							{...attributes}
							className='Trash_TrashButton'
							onClick={activate}
							size='small'
							startIcon={<SvgComponent name='three-dots' />}
							variant='ghost'
							attributes={{ style: { marginLeft: 'auto', padding: '3px 17px' } }}
						/>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item onClick={handleRecover}>Восстановить</DropdownMenu.Item>
					<DropdownMenu.Item onClick={handleDelete}>Удалить навсегда</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		</S.TrashItem>
	);
};
