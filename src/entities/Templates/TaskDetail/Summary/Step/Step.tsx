import { FC, useState } from 'react';
import { DropdownMenu, useToggle } from 'reshaped/bundle';
import * as S from '../TaskSummary.styled';
import { useDragIssueEmptyColumnMutation } from '../../../../../store/projects/projectsApi';
import { useShowToast } from '../../../../../shared/utility/Hooks';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	dataProject: IOneProject;
	refetchTaskData: any;
	isClientRole?: boolean;
	isUserTeamTemplate: boolean;
	setTaskState: (task: ITaskDetail) => void;
}

export const Step: FC<ITaskSummaryProps> = ({
	taskState,
	dataProject,
	refetchTaskData,
	isClientRole,
	isUserTeamTemplate,
	setTaskState,
}) => {
	const [dragIssueInEmptyColumn] = useDragIssueEmptyColumnMutation();

	const [step, setStep] = useState(dataProject.Kanban.find((el) => el.id === taskState.project_issue_kanban_id));
	const { active, activate, deactivate } = useToggle();
	const showToast = useShowToast();

	const handleChangeStepIssue = (kanbanId: number) => {
		dragIssueInEmptyColumn({
			projectSlug: dataProject.slug,
			body: { project_issue_kanban_id: kanbanId },
			projectIssueId: taskState.id,
		})
			.unwrap()
			.then(() => {
				setStep(dataProject?.Kanban.find((el) => el.id === kanbanId));
				refetchTaskData().then((result: any) => {
					if (result && result.data && typeof setTaskState === 'function') {
						setTaskState(result.data);
					}
				});
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	return (
		<DropdownMenu width='148px' position='bottom-end' active={active} onClose={deactivate}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.TriggerButton
						{...attributes}
						variant='ghost'
						size='small'
						highlighted={active}
						isDisabled={isClientRole || !isUserTeamTemplate}
						onClick={!isClientRole && isUserTeamTemplate ? (active ? deactivate : activate) : undefined}
					>
						<S.MyText variant='caption-1'>{step?.name}</S.MyText>
					</S.TriggerButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{dataProject?.Kanban.map((kanban) => (
					<DropdownMenu.Item key={kanban.id} onClick={() => handleChangeStepIssue(kanban.id)}>
						{kanban.name}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
