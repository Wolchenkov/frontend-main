import { FC } from 'react';
import { SvgComponent } from '../../../../shared';
import { Text, View } from 'reshaped/bundle';
import * as S from './TaskSummary.styled';
import { Step } from './Step/Step';
import { Priority } from './Priority/Priority';
import { Estimate } from './Estimate/Estimate';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	dataProject: IOneProject;
	refetchTaskData: any;
	isClientRole: boolean;
	isMemberRole: boolean;
	isUserTeamTemplate: boolean;
	setTaskState: (taskState: ITaskDetail) => void;
}

export const TaskSummary: FC<ITaskSummaryProps> = ({
	taskState,
	dataProject,
	refetchTaskData,
	isClientRole,
	// isMemberRole,
	isUserTeamTemplate,
	setTaskState,
}) => {
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
					isUserTeamTemplate={isUserTeamTemplate}
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
					refetchTaskData={refetchTaskData}
					isClientRole={isClientRole}
					dataProject={dataProject}
					isUserTeamTemplate={isUserTeamTemplate}
				/>
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
							refetchTaskData={refetchTaskData}
							dataProject={dataProject}
							isUserTeamTemplate={isUserTeamTemplate}
						/>
					),
				},
		  ]
		: [];

	// const privateClientProps =
	// 	!isClientRole && !isMemberRole
	// 		? [
	// 				{
	// 					name: 'Бюджет',
	// 					icon: 'money-ruble-circle-faded',
	// 					trigger: (
	// 						<S.MyText variant='caption-1' attributes={{ style: { marginLeft: '5px' } }}>
	// 							{taskState.budget}
	// 						</S.MyText>
	// 					),
	// 				},
	// 		  ]
	// 		: [];

	const summaryProps = [...commonProps, ...provateMemberProps];

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
			</div>
		</>
	);
};
