import { FC } from 'react';
import { Actionable, DropdownMenu } from 'reshaped/bundle';
import * as S from './Priority.styled';
import { usePriorityController } from './PriorityController';

interface IPriorityProps {
	taskState: ITaskDetail;
	refetchTaskData: any;
	isClientRole?: boolean;
	dataProject: IOneProject;
	isUserTeamTemplate: boolean;
}

export const Priority: FC<IPriorityProps> = ({
	taskState,
	refetchTaskData,
	isClientRole,
	dataProject,
	isUserTeamTemplate,
}) => {
	const { priorities, handleChangePriorityIssue, active, activate, deactivate } = usePriorityController({
		taskState,
		refetchTaskData,
		dataProject,
	});
	return (
		<DropdownMenu width='160px' position='bottom-end' active={active} onClose={deactivate}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<Actionable
						{...attributes}
						onClick={!isClientRole && isUserTeamTemplate ? (active ? deactivate : activate) : undefined}
						attributes={{ style: { cursor: !isClientRole && isUserTeamTemplate ? 'pointer' : 'default' } }}
					>
						<S.TriggerBadge
							isNeutral={taskState.priority?.priority === 'Не назначен'}
							active={active}
							variant='faded'
							color={
								taskState.priority?.priority === 'Низкий'
									? 'positive'
									: taskState.priority?.priority === 'Средний'
									? 'primary'
									: taskState.priority?.priority === 'Высокий'
									? 'critical'
									: undefined
							}
						>
							<S.MyText
								variant='caption-1'
								color={taskState.priority?.priority === 'Не назначен' ? 'neutral' : undefined}
								attributes={{ style: { lineHeight: '20px' } }}
							>
								{taskState.priority?.priority}
							</S.MyText>
						</S.TriggerBadge>
					</Actionable>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{priorities.map((priority) => (
					<DropdownMenu.Item
						key={priority.id}
						endSlot={<S.PriorityBadge color={priority.color} size={3} />}
						attributes={{ style: { letterSpacing: '-0.02em' } }}
						onClick={() => handleChangePriorityIssue(priority.id)}
					>
						{priority.priority}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
