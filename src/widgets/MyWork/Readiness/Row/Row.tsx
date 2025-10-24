import React, { FC, useState } from 'react';
import * as S from './Row.styled';
import { Badge } from 'reshaped/bundle';
import { format } from 'date-fns';
import { SvgComponent } from '../../../../shared';
import { READINESS_STATUSES, Readiness } from '../../MyWorkController';

interface IReadinessRowProps {
	data: IMyWorkReadinessRecord;
	openModal: (itemId: number) => void;
}

export const ReadinessRow: FC<IReadinessRowProps> = ({ data, openModal }) => {
	const { id, created_at, type, date_start, date_end, count_day, status } = data;
	const dateCreated = format(new Date(created_at), 'dd.MM.yy');
	const dateStart = format(new Date(date_start), 'dd.MM.yy');
	const dateEnd = format(new Date(date_end), 'dd.MM.yy');

	const [isRowHovered, setIsRowHovered] = useState(false);

	const isDateExpired = (date: string) => {
		const today = new Date().setHours(0, 0, 0, 0);
		const currentDate = new Date(date).setHours(0, 0, 0, 0);

		return today > currentDate;
	};

	return (
		<S.Row
			isExpired={isDateExpired(date_start)}
			isHovered={isRowHovered}
			onMouseEnter={() => setIsRowHovered(true)}
			onMouseLeave={() => setIsRowHovered(false)}
		>
			<S.RowCell>
				<S.RowCellText variant='caption-1'>{dateCreated}</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				<S.RowCellText variant='caption-1'>{type}</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				<S.RowCellText variant='caption-1'>
					{dateStart === dateEnd ? dateStart : `${dateStart}-${dateEnd}`}
				</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				<S.RowCellText variant='caption-1'>{count_day}</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				<Badge
					color={!isDateExpired(date_start) ? READINESS_STATUSES.find(({ name }) => name === status)?.color : undefined}
					size='small'
					variant='faded'
				>
					{READINESS_STATUSES.find(({ name }) => name === status)?.text}
				</Badge>
			</S.RowCell>
			{status !== Readiness.AGREED ? (
				<S.RowButton
					variant='ghost'
					size='small'
					startIcon={<SvgComponent name='close-fill' />}
					isVisible={isRowHovered}
					onClick={() => openModal(id)}
				/>
			) : (
				<></>
			)}
		</S.Row>
	);
};
