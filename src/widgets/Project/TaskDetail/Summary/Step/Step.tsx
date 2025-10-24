import { FC, useState, useRef, useEffect } from 'react';
import { Actionable, DropdownMenu, Tooltip, useToggle } from 'reshaped/bundle';
import * as S from '../TaskSummary.styled';
import { useDragIssueEmptyColumnMutation } from '../../../../../store/projects/projectsApi';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	dataProject: IOneProject;
	refetchTaskData: any;
	isClientRole?: boolean;
	setTaskState: (task: ITaskDetail) => void;
}

export const Step: FC<ITaskSummaryProps> = ({
	taskState,
	dataProject,
	refetchTaskData,
	isClientRole,
	setTaskState,
}) => {
	const { slug: projectSlug } = dataProject;
	const [dragIssueInEmptyColumn] = useDragIssueEmptyColumnMutation(); // смена этапа

	const [step, setStep] = useState(dataProject.Kanban.find((el) => el.id === taskState.project_issue_kanban_id));
	const { active, activate, deactivate } = useToggle();

	const [isTextEllipsisActive, setIsTextEllipsisActive] = useState(false);
	const textWithEllipsisRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (textWithEllipsisRef.current) {
			setIsTextEllipsisActive(textWithEllipsisRef.current.offsetWidth < textWithEllipsisRef.current.scrollWidth);
		}
	}, [step?.name]);

	return (
		<DropdownMenu position='bottom-end' active={active} onClose={deactivate} width='fit-content'>
			<DropdownMenu.Trigger>
				{(attributes) =>
					isTextEllipsisActive ? (
						<Tooltip position='bottom-end' text={<div style={{ maxWidth: '249px' }}>{step?.name}</div>}>
							{(tooltipAttributes) => (
								<Actionable attributes={{ ...tooltipAttributes, style: { maxWidth: '100%' } }}>
									<S.TriggerButton
										{...attributes}
										variant='ghost'
										size='small'
										highlighted={active}
										onClick={!isClientRole ? (active ? deactivate : activate) : undefined}
									>
										<S.MyText variant='caption-1' attributes={{ ref: textWithEllipsisRef }}>
											{step?.name}
										</S.MyText>
									</S.TriggerButton>
								</Actionable>
							)}
						</Tooltip>
					) : (
						<S.TriggerButton
							{...attributes}
							variant='ghost'
							size='small'
							highlighted={active}
							onClick={!isClientRole ? (active ? deactivate : activate) : undefined}
						>
							<S.MyText variant='caption-1' attributes={{ ref: textWithEllipsisRef }}>
								{step?.name}
							</S.MyText>
						</S.TriggerButton>
					)
				}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{dataProject?.Kanban.map((kanban) => (
					<DropdownMenu.Item
						key={kanban.id}
						onClick={() => {
							setStep(dataProject.Kanban.find((el) => el.id === kanban.id));
							const body = { project_issue_kanban_id: kanban.id };
							const payload = { projectSlug, body, projectIssueId: taskState.id };
							dragIssueInEmptyColumn(payload).then(() =>
								setStep(dataProject?.Kanban.find((el) => el.id === kanban.id))
							);
							refetchTaskData().then((result: any) => {
								if (result && result.data && typeof setTaskState === 'function') {
									setTaskState(result.data);
								}
							});
						}}
						attributes={{
							style: {
								width: '100%',
								maxWidth: '257px',
							},
						}}
					>
						{kanban.name}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
