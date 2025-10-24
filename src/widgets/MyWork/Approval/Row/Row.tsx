import React, { FC } from 'react';
import * as S from './Row.styled';
import { Actionable, Badge, Button, Text, Tooltip, View } from 'reshaped/bundle';
import { format } from 'date-fns';
import { AvatarCustom, SvgComponent } from '../../../../shared';
import { READINESS_STATUSES, Readiness } from '../../MyWorkController';
import { getInitials } from '../../../../shared/utility/Utils';

interface IApprovalRowProps {
	data: IMyWorkApprovalRecord;
	activateApproveModal: (id: number) => void;
	activateRejectModal: (id: number) => void;
}

export const ApprovalRow: FC<IApprovalRowProps> = ({ data, activateApproveModal, activateRejectModal }) => {
	const { id, created_at, type, date_start, date_end, count_day, status, comment, user } = data;
	const dateCreated = format(new Date(created_at), 'dd.MM.yy');
	const dateStart = format(new Date(date_start), 'dd.MM.yy');
	const dateEnd = format(new Date(date_end), 'dd.MM.yy');

	const isDateExpired = (date: string) => {
		const today = new Date().setHours(0, 0, 0, 0);
		const currentDate = new Date(date).setHours(0, 0, 0, 0);

		return today > currentDate;
	};

	if (!user) return null;

	return (
		<S.Row isExpired={isDateExpired(date_start)}>
			<S.RowCell>
				<S.RowCellText variant='caption-1'>{dateCreated}</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				<View direction='row' gap={1} align='center'>
					<div
						style={
							isDateExpired(date_start) ? { filter: 'grayscale(1)', WebkitFilter: 'grayscale(1)', opacity: 0.5 } : {}
						}
					>
						<AvatarCustom src={user.avatar ?? undefined} color='neutral' initials={getInitials(user.name)} size={6} />
					</div>
					<Text
						variant='caption-1'
						color='neutral'
						attributes={{
							style: { fontWeight: '500', letterSpacing: '-0.01em', paddingLeft: 8 },
						}}
					>
						{user.name}
					</Text>
				</View>
			</S.RowCell>
			<S.RowCell>
				<S.RowCellText variant='caption-1'>{type}</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				<Tooltip position='bottom-start' text={comment}>
					{(attributes) => (
						<Actionable
							attributes={{
								...attributes,
								style: { cursor: 'default', overflow: 'hidden' },
							}}
						>
							<S.RowCellText
								variant='caption-1'
								attributes={{ style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}
							>
								{comment}
							</S.RowCellText>
						</Actionable>
					)}
				</Tooltip>
			</S.RowCell>
			<S.RowCell>
				<S.RowCellText variant='caption-1' attributes={{ style: { textAlign: 'center' } }}>
					{dateStart === dateEnd ? dateStart : `${dateStart}-${dateEnd}`}
				</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				<S.RowCellText variant='caption-1'>{count_day}</S.RowCellText>
			</S.RowCell>
			<S.RowCell>
				{status === Readiness.ON_APPROVAL && !isDateExpired(date_start) ? (
					<>
						<Button
							variant='ghost'
							size='small'
							startIcon={<SvgComponent name='check' />}
							attributes={{ style: { transform: 'none' } }}
							onClick={() => activateApproveModal(id)}
						/>
						<Button
							variant='ghost'
							size='small'
							startIcon={<SvgComponent name='close-fill' />}
							attributes={{ style: { transform: 'none' } }}
							onClick={() => activateRejectModal(id)}
						/>
					</>
				) : (
					<Badge
						color={
							!isDateExpired(date_start) ? READINESS_STATUSES.find(({ name }) => name === status)?.color : undefined
						}
						size='small'
						variant='faded'
						attributes={{ style: { textAlign: 'center' } }}
					>
						{READINESS_STATUSES.find(({ name }) => name === status)?.text}
					</Badge>
				)}
			</S.RowCell>
		</S.Row>
	);
};
