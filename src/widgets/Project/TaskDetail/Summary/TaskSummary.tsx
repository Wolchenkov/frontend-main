import React, { FC, useEffect, useState } from 'react';
import { SvgComponent } from '../../../../shared';
import { Icon, Text, View } from 'reshaped/bundle';
import * as S from './TaskSummary.styled';
import { FilterCalendar } from '../../ProjectFilter/FilterCalendar/FilterCalendar';
import { SubscribersPill } from './Subscribers/Subscribers';
import { Performer } from './Performer/Performer';
import { usePeriodController } from './Period/PeriodController';
import { Step } from './Step/Step';
import { Priority } from './Priority/Priority';
import { Estimate } from './Estimate/Estimate';
import { useUpdateIssueMutation } from '../../../../store/projects/projectsApi';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	dataProject: IOneProject;
	refetchTaskData: any;
	isClientRole: boolean;
	isMemberRole: boolean;
}

export const TaskSummaryComponent: FC<ITaskSummaryProps> = ({
	taskState,
	setTaskState,
	dataProject,
	refetchTaskData,
	isClientRole,
	isMemberRole,
}) => {
	const { changeDate } = usePeriodController({ taskState, refetchTaskData, dataProject, setTaskState }); // период
	const { slug: projectSlug } = dataProject;

	const [updateIssue] = useUpdateIssueMutation();

	const [isHide, setIsHide] = useState(taskState.hide_from_client);
	function hideFromClient() {
		setIsHide(!isHide);
		const body = { hide_from_client: !taskState.hide_from_client };
		const payload = { projectSlug, body, projectIssueId: taskState.id };
		updateIssue(payload).then(() => refetchTaskData());
	}

	const [dates, setDates] = useState<[string | null, string | null] | null>(null);

	useEffect(() => {
		taskState && setDates([taskState.date_start, taskState.deadline]);
	}, [taskState]);

	const commonProps = [
		{
			name: 'Этап',
			icon: 'checkbox-circle-line',
			trigger: (
				<Step
					dataProject={dataProject}
					taskState={taskState}
					refetchTaskData={refetchTaskData}
					isClientRole={isClientRole}
					setTaskState={setTaskState}
				/>
			),
		},
		{
			name: 'Приоритет',
			icon: 'alert-line-faded',
			trigger: (
				<Priority
					taskState={taskState}
					setTaskState={setTaskState}
					refetchTaskData={refetchTaskData}
					isClientRole={isClientRole}
					projectSlugData={dataProject.slug}
				/>
			),
		},
		{
			name: 'Исполнитель',
			icon: 'user-line-faded',
			trigger: (
				<Performer
					dataProject={dataProject}
					taskState={taskState}
					setTaskState={setTaskState}
					refetchTaskData={refetchTaskData}
					isClientRole={isClientRole}
				/>
			),
		},
		{
			name: 'Подписчики',
			icon: 'user-search-faded',
			trigger: (
				<SubscribersPill
					dataProject={dataProject}
					taskState={taskState}
					setTaskState={setTaskState}
					refetchTaskData={refetchTaskData}
					isClientRole={isClientRole}
				/>
			),
		},
		{
			name: `${!taskState.deadline || taskState.deadline === taskState.date_start ? 'Дата окончания' : 'Период'}`,
			icon: 'calendar-check',
			trigger: (
				<FilterCalendar value={null} onChange={changeDate} isTaskDetail date={dates} isClientRole={isClientRole} />
			),
		},
	];
	const provateMemberProps = !isClientRole
		? [
				{
					name: 'Оценка',
					icon: 'time-line-faded',
					trigger: (
						<Estimate
							taskState={taskState}
							setTaskState={setTaskState}
							refetchTaskData={refetchTaskData}
							projectSlugData={dataProject.slug}
						/>
					),
				},
		  ]
		: [];

	const currentCost = (taskState.estimate && taskState.budget && (taskState.budget * 60) / taskState.estimate) || 0;
	const trackedTime = taskState.time_records.reduce((acc, el) => {
		return (acc += el.time_amount);
	}, 0);

	const privateClientProps =
		!isClientRole && !isMemberRole
			? [
					{
						name: 'Бюджет',
						icon: 'money-ruble-circle-faded',
						trigger: <S.MyText variant='caption-1'>{taskState.budget.toLocaleString('ru-RU')}</S.MyText>,
					},
					{
						name: 'Расход',
						icon: 'hand-coin-line',
						trigger: (
							<S.MyText variant='caption-1'>{(currentCost * (trackedTime / 60)).toLocaleString('ru-RU')}</S.MyText>
						),
					},
					{
						name: 'Остаток',
						icon: 'coin-line-faded',
						trigger: (
							<S.MyText variant='caption-1' color={taskState.balance < 0 ? 'critical' : 'neutral'}>
								{(taskState.budget - currentCost * (trackedTime / 60)).toLocaleString('ru-RU')}
							</S.MyText>
						),
					},
			  ]
			: [];

	const summaryProps = [...commonProps, ...provateMemberProps, ...privateClientProps];

	return (
		<>
			<div style={{ position: 'relative' }}>
				<View direction='column' gap={3}>
					{summaryProps.map((props, index) => (
						<S.Row isAvatar={props.name.includes('Подписчики') || props.name.includes('Исполнитель')} key={index}>
							<S.Left>
								<SvgComponent name={props.icon} />
								<Text
									variant='caption-1'
									color='neutral-faded'
									attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									{props.name}
								</Text>
							</S.Left>
							<S.Right>{props.trigger}</S.Right>
						</S.Row>
					))}
				</View>
				{!isClientRole && (
					<S.HideContainer onClick={hideFromClient}>
						<Icon
							svg={<SvgComponent name={`${isHide ? 'checkbox-checked' : 'checkbox-default'}`} />}
							size={5}
							attributes={{ style: { marginRight: '8px' } }}
						/>
						<S.MyText variant='caption-1'>Скрыть от клиента</S.MyText>
					</S.HideContainer>
				)}
			</div>
		</>
	);
};

TaskSummaryComponent.displayName = 'TaskSummary';
export const TaskSummary = React.memo(TaskSummaryComponent);
