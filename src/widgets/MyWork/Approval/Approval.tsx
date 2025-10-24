import React, { FC, useEffect, useState } from 'react';
import * as S from './Approval.styled';
import { useGetMyApprovalQuery, useProcessApplicationMutation } from '../../../store/myWork/myWorkApi';
import { ApprovalEmpty } from './Empty/Empty';
import { ApprovalRow } from './Row/Row';
import { Text, useToggle } from 'reshaped/bundle';
import { ConfirmModal } from './ConfirmModal/ConfirmModal';
import { Readiness } from '../MyWorkController';
import { useShowToast } from '../../../shared/utility/Hooks';
import { MONTHS } from '../../../shared/utility/Constants/months';

const TABLE_COLUMNS = ['Дата', 'От кого', 'Тип', 'Комментарий', 'Период', 'Количество дней', ''];

export const MyWorkApproval: FC = () => {
	const [myApproval, setMyApproval] = useState<[string, [string, IMyWorkApprovalRecord[]][]][]>();
	const [activeItem, setActiveItem] = useState<number>();

	const {
		active: isApproveModalActive,
		activate: activateApproveModal,
		deactivate: deactivateApproveModal,
	} = useToggle(false);
	const {
		active: isRejectModalActive,
		activate: activateRejectModal,
		deactivate: deactivateRejectModal,
	} = useToggle(false);

	const { data: approval } = useGetMyApprovalQuery();
	const [processApplication] = useProcessApplicationMutation();

	const showToast = useShowToast();

	useEffect(() => {
		if (approval) {
			const approvalData = Object.entries(Object.assign({}, approval))
				.sort((a, b) => +b[0] - +a[0])
				.map((yearItem) => {
					const yearName = yearItem[0];
					const monthData = yearItem[1];

					const newMonthData = Object.entries(Object.assign({}, monthData))
						.sort((a, b) => MONTHS.indexOf(b[0]) - MONTHS.indexOf(a[0]))
						.map((monthItem) => {
							const newMonthsItem = [...monthItem];
							newMonthsItem[1] = [...monthItem[1]].sort(
								(a, b) =>
									new Date(b.created_at).getTime() - new Date(a.created_at).getTime() ||
									new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
							);
							return newMonthsItem;
						});

					return [yearName, newMonthData];
				});

			setMyApproval(approvalData as [string, [string, IMyWorkApprovalRecord[]][]][]);
		}
	}, [approval]);

	const handleApproveModalOpen = (id: number) => {
		activateApproveModal();
		setActiveItem(id);
	};

	const handleRejectModalOpen = (id: number) => {
		activateRejectModal();
		setActiveItem(id);
	};

	const handleApprove = () => {
		deactivateApproveModal();
		processApplication({ itemId: activeItem, body: { status: Readiness.AGREED } })
			.unwrap()
			.then(() => {
				showToast('Заявление согласовано');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			})
			.finally(() => {
				setActiveItem(undefined);
			});
	};

	const handleReject = () => {
		deactivateRejectModal();
		processApplication({ itemId: activeItem, body: { status: Readiness.REJECTED } })
			.unwrap()
			.then(() => {
				showToast('Заявление отклонено');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			})
			.finally(() => {
				setActiveItem(undefined);
			});
	};

	return (
		<>
			{myApproval &&
				(myApproval.length ? (
					<>
						{myApproval.map(([year, monthData]) => (
							<S.YearTable key={year}>
								<Text
									variant='featured-3'
									color='neutral-faded'
									attributes={{ style: { margin: '0 20px 24px', letterSpacing: '-0.01em' } }}
								>
									{year} год
								</Text>

								{monthData.map(([month, records]) => (
									<S.MonthTable key={month}>
										<Text
											variant='body-medium-2'
											color='neutral-faded'
											attributes={{ style: { margin: '0 20px 20px', letterSpacing: '-0.02em' } }}
										>
											{month}
										</Text>
										<S.TableHead>
											{TABLE_COLUMNS.map((column) => (
												<S.TableHeadText key={column} variant='caption-1' color='neutral-faded'>
													{column}
												</S.TableHeadText>
											))}
										</S.TableHead>
										{records.map((item) => (
											<ApprovalRow
												key={item.id}
												data={item}
												activateApproveModal={handleApproveModalOpen}
												activateRejectModal={handleRejectModalOpen}
											/>
										))}
									</S.MonthTable>
								))}
							</S.YearTable>
						))}
					</>
				) : (
					<ApprovalEmpty />
				))}

			<ConfirmModal
				isActive={isApproveModalActive}
				text='Вы действительно хотите согласовать заявление?'
				deactivateModal={deactivateApproveModal}
				confirm={handleApprove}
			/>

			<ConfirmModal
				isActive={isRejectModalActive}
				text='Вы действительно хотите отклонить заявление?'
				deactivateModal={deactivateRejectModal}
				confirm={handleReject}
			/>
		</>
	);
};
