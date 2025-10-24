import React, { FC, useEffect, useState } from 'react';
import * as S from './Readiness.styled';
import { useGetMyReadinessQuery, useDeleteMyReadinessItemMutation } from '../../../store/myWork/myWorkApi';
import { Text, useToggle } from 'reshaped/bundle';
import { ReadinessRow } from './Row/Row';
import { ConfirmModal } from '../../../entities';
import { useShowToast } from '../../../shared/utility/Hooks';
import { ApplicationModal } from '../../../entities/Modal/Application/ApplicationModal';
import { getDeclinedNumeral } from '../../../shared/utility/Utils';

const TABLE_COLUMNS = ['Дата', 'Тип', 'Период', 'Количество дней', 'Статус'];

interface IMyWorkReadinessProps {
	isApplicationModalActive: boolean;
	deactivateApplicationModal: () => void;
}

export const MyWorkReadiness: FC<IMyWorkReadinessProps> = ({
	isApplicationModalActive,
	deactivateApplicationModal,
}) => {
	const [myReadiness, setMyReadiness] = useState<[string, IMyWorkReadinessRecord[]][]>();
	const [vacationDays, setVacationDays] = useState<number>();
	const [deletedItem, setDeletedItem] = useState<number>();

	const {
		active: isDeleteModalActive,
		activate: activateDeleteModal,
		deactivate: deactivateDeleteModal,
	} = useToggle(false);

	const { data: readiness } = useGetMyReadinessQuery();
	const [deleteItem] = useDeleteMyReadinessItemMutation();

	const showToast = useShowToast();

	useEffect(() => {
		if (readiness?.available_vacation_days) {
			setVacationDays(readiness.available_vacation_days);
		}
		if (readiness?.records) {
			const readinessData = Object.entries(Object.assign({}, readiness.records))
				.sort((a, b) => +b[0] - +a[0])
				.map((item) => {
					const newItem = [...item];
					newItem[1] = [...item[1]].sort(
						(a, b) =>
							new Date(b.created_at).getTime() - new Date(a.created_at).getTime() ||
							new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
					);
					return newItem;
				});

			setMyReadiness(readinessData as [string, IMyWorkReadinessRecord[]][]);
		}
	}, [readiness]);

	const handleOpenModal = (itemId: number) => {
		setDeletedItem(itemId);
		activateDeleteModal();
	};

	const handleDeleteItem = () => {
		deactivateDeleteModal();
		deleteItem(deletedItem)
			.unwrap()
			.then(() => {
				showToast('Заявление удалено');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			})
			.finally(() => {
				setDeletedItem(undefined);
			});
	};

	return (
		<>
			{myReadiness && (
				<>
					{vacationDays && (
						<Text
							variant='title-3'
							attributes={{ style: { margin: '0 20px 45px', fontWeight: 700, letterSpacing: '-0.02em' } }}
						>
							Доступно {getDeclinedNumeral(vacationDays, ['день', 'дня', 'дней'])} отпуска
						</Text>
					)}

					{myReadiness.length ? (
						<>
							{myReadiness.map(([year, records]) => (
								<S.Table key={year}>
									<Text
										variant='featured-3'
										color='neutral-faded'
										attributes={{ style: { margin: '0 20px 24px', letterSpacing: '-0.01em' } }}
									>
										{year} год
									</Text>

									<S.TableHead>
										{TABLE_COLUMNS.map((column) => (
											<S.TableHeadText key={column} variant='caption-1' color='neutral-faded'>
												{column}
											</S.TableHeadText>
										))}
									</S.TableHead>

									{records.map((item) => (
										<ReadinessRow key={item.id} data={item} openModal={handleOpenModal} />
									))}
								</S.Table>
							))}
							<ConfirmModal
								active={isDeleteModalActive}
								deactivate={deactivateDeleteModal}
								confirmDel={handleDeleteItem}
								text='Вы действительно хотите удалить заявление?'
							/>
						</>
					) : (
						<></>
					)}
				</>
			)}

			{myReadiness && isApplicationModalActive && (
				<ApplicationModal
					isActive={isApplicationModalActive}
					closeModal={deactivateApplicationModal}
					busyData={
						myReadiness.length
							? myReadiness
									.map(([_, records]) => records)
									.flat()
									.filter(({ status }) => status !== 'rejected')
									.map(({ date_start, date_end }) => [date_start, date_end])
							: []
					}
				/>
			)}
		</>
	);
};
