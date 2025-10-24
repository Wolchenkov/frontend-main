import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import * as S from './TableHead.styled';
import { SvgComponent } from '../../../shared';
import { Divider } from 'reshaped/bundle';
import { UserRole } from '../../../shared/utility/Constants/userRole';

const TABlE_COLUMNS = [
	{
		id: 'name',
		name: 'Задачи',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'children',
		name: '',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'delegate',
		name: '',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'priority',
		name: 'Приоритет',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'deadline',
		name: 'Дата окончания',
		access: [UserRole.CLIENT, UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'estimate',
		name: 'Оценка',
		access: [UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'time_amount',
		name: 'Факт',
		access: [UserRole.MEMBER, UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'budget',
		name: 'Бюджет',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'consumption',
		name: 'Расход',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
	{
		id: 'balance',
		name: 'Остаток',
		access: [UserRole.MANAGER, UserRole.UNITMASTER, UserRole.ADMIN],
	},
];

interface ITableHeadProps {
	userRole: string | undefined;
	sortOption: { type: string; direction: string };
	setSortOption: Dispatch<SetStateAction<{ type: string; direction: string }>>;
}

export const TableHead: FC<ITableHeadProps> = ({ userRole, sortOption, setSortOption }) => {
	const [hoveredCell, setHoveredCell] = useState('');

	const handleSortButtonClick = (id: string) => {
		if (sortOption.type !== id) {
			setSortOption({ type: id, direction: 'down' });
		} else if (sortOption.type === id && sortOption.direction === 'down') {
			setSortOption((prevState: { type: string; direction: string }) => ({
				...prevState,
				direction: 'up',
			}));
		} else if (sortOption.type === id && sortOption.direction === 'up') {
			setSortOption({ type: '', direction: '' });
		}
	};

	return (
		<>
			<S.TableHead>
				{TABlE_COLUMNS.filter((tab) => tab.access.includes(userRole as UserRole)).map(({ id, name }) => (
					<S.TableHeadCell key={id} className={`TableHeadCell__${id}`}>
						<S.TableHeadCellText
							variant='caption-1'
							color='neutral-faded'
							attributes={{
								onMouseEnter: () => setHoveredCell(id),
								onMouseLeave: () => setHoveredCell(''),
							}}
						>
							{name}
							{name && (
								<S.TableHeadSortButton
									variant='ghost'
									size='small'
									startIcon={
										<SvgComponent
											name={
												sortOption.type !== id
													? 'sort-desc'
													: sortOption.direction === 'down'
													? 'sort-desc-fill'
													: 'sort-desc-fill-rotated'
											}
										/>
									}
									isVisible={hoveredCell === id || sortOption.type === id}
									onClick={() => handleSortButtonClick(id)}
								/>
							)}
						</S.TableHeadCellText>
					</S.TableHeadCell>
				))}
			</S.TableHead>
			<Divider />
		</>
	);
};
