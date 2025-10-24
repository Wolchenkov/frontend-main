import React, { FC, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../../shared';
import { getInitials } from '../../../../shared/utility/Utils';
import Link from 'next/link';
import { ConfirmModal } from '../../../../entities';
import { CalendarMenu } from '../../../../entities/ProjectLineViewTable/CalendarMenu/CalendarMenu';
import { Performer } from '../Summary/Performer/Performer';
import * as S from './ChildTask.styled';
import { useChildTaskController } from './ChildTaskController';
interface IChildTaskProps {
	child: ITaskInTask;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	dataProject: IOneProject;
	refetchTaskData: any;
}

export const ChildTask: FC<IChildTaskProps> = ({ child, setTaskState, dataProject, refetchTaskData }) => {
	const { projectSlug, changeStatus, delChild, isClientRole } = useChildTaskController({
		setTaskState,
		refetchTaskData,
		dataProject,
	});

	const [isHover, setIsHover] = useState(false);

	const { active, activate, deactivate: deactivateConfirmModal } = useToggle();

	return (
		<S.ChildRow isHover={isHover} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
			<S.LeftSide>
				<SvgComponent
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={!isClientRole ? () => changeStatus(child) : undefined}
					name={child.completed_on ? 'checkbox-task-detail-completed' : 'checkbox-task-detail'}
				/>
				<Link href={`/project/${projectSlug}?modal=${child.id}`}>
					<div>
						<S.MyText
							variant='caption-1'
							color={child.completed_on ? 'neutral-faded' : 'neutral'}
							isCompleted={child.completed_on}
						>
							{child.name}
						</S.MyText>
					</div>
				</Link>
			</S.LeftSide>
			{
				// isHover &&
				<S.RightSide>
					<div style={{ opacity: child.completed_on ? '0.5' : '1', marginRight: '20px' }}>
						{child.completed_on ? (
							child.delegate_id && child.delegate ? (
								<AvatarCustom
									src={child?.delegate?.avatar ? child.delegate.avatar : ''}
									color='positive-faded'
									initials={getInitials(child.delegate.name ? child.delegate.name : '')}
									size={6}
								/>
							) : (
								<SvgComponent name='not-delegated' />
							)
						) : (
							<Performer
								taskState={child as ITaskDetail}
								setChildState={setTaskState}
								dataProject={dataProject}
								refetchTaskData={refetchTaskData}
								isClientRole={isClientRole}
							/>
						)}
					</div>
					{!isClientRole && (
						<>
							<S.CalendarContainer>
								<CalendarMenu
									issueId={child.id}
									date={child.deadline}
									minDate={child.date_start}
									isFinished={child.completed_on}
									refetchTaskData={refetchTaskData}
									isTaskDetail={true}
									projectSlugData={dataProject.slug}
								/>
							</S.CalendarContainer>
							<div style={{ width: '28px' }}>
								<S.DelButton
									size='small'
									variant='ghost'
									onClick={activate}
									startIcon={<SvgComponent name='close-line' />}
								/>
							</div>
						</>
					)}
				</S.RightSide>
			}
			{!isClientRole && (
				<ConfirmModal
					text='Вы действительно хотите удалить подзадачу?'
					active={active}
					deactivate={deactivateConfirmModal}
					confirmDel={() => delChild(child.id)}
				/>
			)}
			{/* <ConfirmModal
				active={isModalConfirmActive}
				deactivate={deactivateConfirmModal}
				confirmDel={() => changeStatus(taskState)}
				text='Вы не выполнили подзадачи. Все равно завершить эту задачу?'
			/> */}
		</S.ChildRow>
	);
};
