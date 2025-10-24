import { FC, useState } from 'react';
import { Button, Divider, DropdownMenu, useToggle } from 'reshaped/bundle';
import * as S from './ExpensesRow.styled';
import { getInitials } from '../../../shared/utility/Utils';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { ExpensesModal } from '../../Modal/Expenses/ExpensesModal';
import { ConfirmModal } from '../../Modal/ConfirmModal/ConfirmModal';
import { useDeleteExpenseMutation } from '../../../store/expenses/expensesApi';
import { useRouter } from 'next/router';
import { useShowToast } from '../../../shared/utility/Hooks';

interface IExpensesTableProps {
	data: IOneExpense;
	setExpensesData: React.Dispatch<React.SetStateAction<IOneExpense[] | undefined>>;
	projectMembers: IMember[];
}

export const ExpensesRow: FC<IExpensesTableProps> = ({ data, projectMembers, setExpensesData }) => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const [hoverRow, setHoverRow] = useState(false); // стейт для hover над строкой
	function convertDateFormat(inputDate: string) {
		const date = new Date(inputDate);

		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = String(date.getFullYear()).slice(-2);

		return `${day}.${month}.${year}`;
	}
	const {
		active: isDropdownMoreActive,
		activate: activateDropdownMore,
		deactivate: deactivateDropdownMore,
	} = useToggle(false); // дропдаун для строки
	const { active: isEditModalActive, activate: activateEditModal, deactivate: deactivateEditModal } = useToggle(false); // модалка редактирования
	const {
		active: isDeleteModalActive,
		activate: activateDeleteModal,
		deactivate: deactivateDeleteModal,
	} = useToggle(false); // модалка удаления

	const handleDropdownMenuMoreClick = () => {
		isDropdownMoreActive ? deactivateDropdownMore() : activateDropdownMore();
	};

	const showToast = useShowToast();
	const [deleteExpense] = useDeleteExpenseMutation();
	function delExpense() {
		deleteExpense({ projectSlug, id: data.id }).then(() => showToast('Запись удалена'));
	}

	return (
		<>
			<S.MyTr onMouseEnter={() => setHoverRow(true)} onMouseLeave={() => setHoverRow(false)} hover={hoverRow}>
				<td style={{ padding: '10px 24px 10px 20px' }}>
					<S.FlexContainerAlignItems style={{ width: 266, gap: '8px' }}>
						<AvatarCustom
							src={data?.user?.avatar ? data?.user?.avatar : undefined}
							color='positive'
							initials={getInitials(data?.user?.name ? data?.user?.name : '')}
							size={6}
						/>
						<S.MyText variant='caption-1'>{data?.user.name}</S.MyText>
					</S.FlexContainerAlignItems>
				</td>
				<td>
					<S.MyText variant='caption-1'>{data?.description}</S.MyText>
				</td>
				<td>
					<S.MyText variant='caption-1' align='center'>
						{convertDateFormat(data?.date)}
					</S.MyText>
				</td>
				<td style={{ paddingRight: 20 }}>
					<S.FlexContainerAlignItems style={{ gap: '24px', flexDirection: 'row-reverse' }}>
						<div style={{ width: '28px' }}>
							{(hoverRow || isDropdownMoreActive) && (
								<DropdownMenu active={isDropdownMoreActive} onClose={deactivateDropdownMore}>
									<DropdownMenu.Trigger>
										{(attributes) => (
											<Button
												{...attributes}
												variant='ghost'
												size='small'
												onClick={handleDropdownMenuMoreClick}
												startIcon={<SvgComponent name='more-fill' />}
											/>
										)}
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Item onClick={activateEditModal}>
											<S.Container>
												Редактировать
												<SvgComponent name='pencil-line' />
											</S.Container>
										</DropdownMenu.Item>
										<DropdownMenu.Item onClick={activateDeleteModal}>
											<S.Container>
												Удалить
												<SvgComponent name='close-line' />
											</S.Container>
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu>
							)}
						</div>
						<S.MyText variant='caption-1' align='end'>
							{data?.cost.toLocaleString('ru-RU') + ' ₽'}
						</S.MyText>
					</S.FlexContainerAlignItems>
				</td>
			</S.MyTr>
			<tr>
				<td colSpan={4}>
					<Divider />
				</td>
			</tr>
			<ExpensesModal
				active={isEditModalActive}
				onClose={deactivateEditModal}
				projectMembers={projectMembers}
				data={data}
				setExpensesData={setExpensesData}
			/>
			<ConfirmModal
				active={isDeleteModalActive}
				deactivate={deactivateDeleteModal}
				confirmDel={delExpense}
				text='Вы действительно хотите удалить запись?'
			/>
		</>
	);
};
