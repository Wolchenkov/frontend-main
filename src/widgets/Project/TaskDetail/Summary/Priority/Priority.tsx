import { FC } from 'react';
import { Actionable, DropdownMenu } from 'reshaped/bundle';
import * as S from './Priority.styled';
import { usePriorityController } from './PriorityController';
interface ITaskSummaryProps {
	taskState: ITaskDetail;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	refetchTaskData: any;
	isClientRole?: boolean;
	projectSlugData?: string;
}

export const Priority: FC<ITaskSummaryProps> = ({
	taskState,
	setTaskState,
	refetchTaskData,
	isClientRole,
	projectSlugData,
}) => {
	const { priorities, handleChangePriorityIssue, active, activate, deactivate } = usePriorityController({
		taskState,
		setTaskState,
		refetchTaskData,
		projectSlugData,
	});
	return (
		<DropdownMenu width='160px' position='bottom-end' active={active} onClose={deactivate}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<Actionable {...attributes} onClick={!isClientRole ? (active ? deactivate : activate) : undefined}>
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
