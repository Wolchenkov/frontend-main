/* eslint-disable react-hooks/exhaustive-deps */
import * as S from './ProjectLineView.styled';
import { Accordion, Loader, useToggle } from 'reshaped/bundle';
import { FC, useEffect, useState, useCallback } from 'react';
import { ProjectLineViewTable } from '../../entities/ProjectLineViewTable/ProjectLineViewTable';
import { StageTitle } from '../../entities/ProjectLineViewTable/StageTitle/StageTitle';
import { useLazyGetKanbanProjectFinishedIssuesQuery } from '../../store/projects/projectsApi';
import { StagesEmpty } from '../../entities/ProjectLineViewTable/StagesEmpty/StagesEmpty';
import { SvgComponent } from '../../shared';
import { AddProjectStageModal } from '../../entities';
import { useAppSelector } from '../../store';
import { selectFilter, selectIsFilterOpened } from '../../store/tasks/tasksSlice';
import { getFilteredIssues } from '../../shared/utility/Utils';

interface IProjectLineViewProps {
	userRole: string | undefined;
	projectData: IOneProject;
	projectIssuesData: ITask[];
	finishedTasksData: ITask[];
	activateTaskModal: () => void;
}

export const ProjectLineView: FC<IProjectLineViewProps> = ({
	userRole,
	projectData,
	projectIssuesData,
	finishedTasksData,
	activateTaskModal,
}) => {
	const isFilterOpened = useAppSelector(selectIsFilterOpened);
	const filter = useAppSelector(selectFilter);
	const [kanbanData, setKanbanData] = useState<IKanbanIssue[]>();
	const [getKanbanFinishedIssues, { data: kanbanFinishedIssues }] = useLazyGetKanbanProjectFinishedIssuesQuery();
	const {
		active: activeModalAddProjectStage,
		activate: activateModalAddProjectStage,
		deactivate: deactivateModalAddProjectStage,
	} = useToggle(false);

	const [collapsedStages, setCollapsedStages] = useState<{ [id: number]: boolean }>({});

	useEffect(() => {
		const saved = localStorage.getItem(`collapsedStages_${projectData.id}`);
		if (saved) setCollapsedStages(JSON.parse(saved));
	}, [projectData.id]);

	const handleAccordionToggle = useCallback(
		(stageId: number) => {
			setCollapsedStages((prev) => {
				const updated = { ...prev, [stageId]: !prev[stageId] };
				localStorage.setItem(`collapsedStages_${projectData.id}`, JSON.stringify(updated));
				return updated;
			});
		},
		[projectData.id]
	);

	useEffect(() => {
		if (projectData && projectIssuesData) {
			const kanban = projectData?.Kanban;

			if (kanban.length === 0) {
				setKanbanData([]);
				return;
			}

			const allTasks = [...projectIssuesData, ...finishedTasksData];
			const detailedKanban = [...kanban].map((kanbanGroup: any) => {
				const projectIssues = kanbanGroup.projectIssue
					.map((issueID: number) => allTasks.find(({ id }: any) => id === issueID))
					.filter(Boolean);
				const finishedIssues = kanbanGroup.projectIssueFinish
					.map((issueID: number) => allTasks.find(({ id }: any) => id === issueID))
					.filter(Boolean);
				return {
					id: kanbanGroup.id,
					name: kanbanGroup.name,
					issues: projectIssues,
					finishedIssues: {
						count: kanbanGroup.projectIssueFinishCount,
						issues: finishedIssues,
					},
				};
			});

			setKanbanData(detailedKanban);
		}
	}, [projectData, projectIssuesData, finishedTasksData]);

	useEffect(() => {
		if (!kanbanFinishedIssues || !kanbanData) return;

		const kanbanGroupId = kanbanFinishedIssues[0].project_issue_kanban_id;
		setKanbanData(
			kanbanData.map((kanbanGroup) => {
				if (kanbanGroup.id === kanbanGroupId) {
					return {
						...kanbanGroup,
						finishedIssues: {
							count: kanbanGroup.finishedIssues.count,
							issues: kanbanFinishedIssues,
						},
					};
				} else {
					return kanbanGroup;
				}
			})
		);
	}, [kanbanFinishedIssues]);

	return (
		<S.ProjectLineView isFilterOpened={isFilterOpened}>
			{kanbanData ? (
				kanbanData.length ? (
					<>
						{kanbanData.map((kanbanGroup) => (
							<S.StageGroup key={kanbanGroup.id}>
								<Accordion defaultActive={!collapsedStages[kanbanGroup.id]}>
									<S.StageHeader>
										<Accordion.Trigger>
											{(triggerProps, { active }) => (
												<S.ChevronIcon
													onClick={() => {
														triggerProps.onClick();
														handleAccordionToggle(kanbanGroup.id);
													}}
													id={triggerProps.id}
													aria-expanded={triggerProps['aria-expanded']}
													aria-controls={triggerProps['aria-controls']}
													open={active}
												>
													<SvgComponent name='arrow-right-fill' />
												</S.ChevronIcon>
											)}
										</Accordion.Trigger>
										<StageTitle
											id={kanbanGroup.id}
											name={kanbanGroup.name}
											issues={getFilteredIssues(kanbanGroup.issues, filter)}
											stages={kanbanData.map(({ name }) => name)}
										/>
									</S.StageHeader>
									<Accordion.Content>
										<ProjectLineViewTable
											issues={kanbanGroup.issues}
											allIssues={projectIssuesData}
											finishedIssues={finishedTasksData}
											kanbanGroupId={kanbanGroup.id}
											getFinishedIssues={() => getKanbanFinishedIssues(kanbanGroup.id)}
											activateTaskModal={activateTaskModal}
											updateKanbanData={setKanbanData}
											projectData={projectData}
											userRole={userRole}
										/>
									</Accordion.Content>
								</Accordion>
							</S.StageGroup>
						))}

						<S.StageButton
							variant='ghost'
							startIcon={<SvgComponent name='add-line' />}
							size='small'
							onClick={activateModalAddProjectStage}
						>
							<S.StageButtonText variant='caption-1' color='neutral-faded'>
								Добавить этап
							</S.StageButtonText>
						</S.StageButton>
					</>
				) : (
					<StagesEmpty userRole={userRole} groupId={projectData.group_id} openModal={activateModalAddProjectStage} />
				)
			) : (
				<S.LoaderWrap>
					<Loader size='medium' />
				</S.LoaderWrap>
			)}
			<AddProjectStageModal
				size='660px'
				active={activeModalAddProjectStage}
				onClose={deactivateModalAddProjectStage}
				projectIssueSort={projectData.Kanban}
			/>
		</S.ProjectLineView>
	);
};
