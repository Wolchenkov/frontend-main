import { FC } from 'react';
import { Badge, Button, Divider, Tooltip } from 'reshaped/bundle';
import { getInitials } from '../../../shared/utility/Utils';
import * as S from './Row.styled';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { formatTime } from '../../../shared/utility/Utils/formatTime';
import { PillCalendar } from '../../Pills/PillCalendar/PillCalendar';
import { PillTrackedTime } from '../../Pills/PillsTimer/PillTrackedTime/PillTrackedTime';
import { PillTypeWork } from '../../Pills/PillsTimer/PillTypeWork/PillTypeWork';
import { format } from 'date-fns';
import { useRowController } from './RowController';

interface IRow {
	row: ITimeRecords;
	index: number;
	refetchTaskData: any;
}

export const Row: FC<IRow> = ({ row, index, refetchTaskData }) => {
	const {
		isHover,
		setIsHover,
		active,
		deactivate,
		activate,
		date,
		updateTaskDate,
		inputTimeValue,
		setInputTimeValue,
		isActiveTypeWork,
		activateTypeWork,
		deactivateTypeWork,
		typeWork,
		setTypeWork,
		typesWork,
		isBillable,
		setIsBillable,
		comment,
		setComment,
		closeEditMode,
		approveRecordTime,
	} = useRowController({
		row,
		refetchTaskData,
	});

	return (
		<>
			{index === 0 && <Divider />}
			<S.MainContainer
				isApproved={row.is_approved}
				isHover={isHover}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<S.NameContainer>
					<AvatarCustom
						src={row.user.avatar ? row.user.avatar : undefined}
						color='positive'
						initials={getInitials(row.user.name ? row.user.name : '')}
						size={6}
					/>
					<S.MyText variant='caption-1'>{row.user.name}</S.MyText>
				</S.NameContainer>
				<S.TypeWorkContainer>
					<S.MyText variant='caption-1'>{typeWork?.type}</S.MyText>
				</S.TypeWorkContainer>
				<S.CommentContainer>{row.has_comment && <SvgComponent name='chat-4-line-faded' />}</S.CommentContainer>
				<S.BilliableContainer>
					{row.is_billable && (
						<Badge size='small' color='primary' variant='faded'>
							₽
						</Badge>
					)}
				</S.BilliableContainer>
				<S.TimeContainer>
					<S.MyText variant='caption-1'>{formatTime(row.time_amount)}</S.MyText>
				</S.TimeContainer>
				<S.EditButtonContainer>
					{(isHover || active) && (
						<Button
							size='small'
							variant='ghost'
							startIcon={<SvgComponent name='pencil-line' />}
							onClick={active ? deactivate : activate}
						/>
					)}
				</S.EditButtonContainer>
			</S.MainContainer>
			{active && (
				<S.TimerTrackDropdownWrapper>
					<S.TimerTrackDropdownPillsWrapper>
						<PillCalendar
							title={format(new Date(), 'dd.MM')}
							value={date}
							name='data_start'
							onChange={updateTaskDate}
							maxDate={new Date()}
							inTask={true}
						/>
						<PillTrackedTime inputValue={inputTimeValue} setInputValue={setInputTimeValue} />
						<PillTypeWork
							active={isActiveTypeWork}
							activate={activateTypeWork}
							deactivate={deactivateTypeWork}
							typeWork={typeWork}
							setTypeWork={setTypeWork}
							typesWork={typesWork}
						/>
						<Tooltip position='top' text={isBillable ? 'Задача оплачивается' : 'Задача не оплачивается'}>
							{(attributes) => (
								<Button
									variant='solid'
									color={isBillable ? 'primary' : 'neutral'}
									startIcon={
										<SvgComponent name={isBillable ? 'money-ruble-circle-white' : 'money-ruble-circle-line'} />
									}
									size='small'
									attributes={{ ...attributes, style: { width: '36px' } }}
									onClick={() => setIsBillable(!isBillable)}
								/>
							)}
						</Tooltip>
					</S.TimerTrackDropdownPillsWrapper>
					<S.MyText variant='caption-1'>Комментарий</S.MyText>
					<S.TimerTrackDropdownTextArea value={comment} onChange={(e) => setComment(e.target.value)} />
					<S.TimerTrackDropdownBottomWrapper>
						<Button variant='ghost' size='small' onClick={closeEditMode}>
							Отменить
						</Button>
						<Button
							variant='ghost'
							color='primary'
							size='small'
							onClick={approveRecordTime}
							disabled={inputTimeValue.length < 5}
						>
							Сохранить
						</Button>
					</S.TimerTrackDropdownBottomWrapper>
				</S.TimerTrackDropdownWrapper>
			)}
			<Divider />
		</>
	);
};
