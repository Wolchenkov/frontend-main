import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import * as S from './Issues.styled';
import { Text } from 'reshaped/bundle';
// import { SvgComponent } from '../../../shared';
import { StageTitle } from '../../ProjectLineViewTable/StageTitle/StageTitle';
// import { AddProjectStageModal } from '../../Modal/AddProjectStage/AddProjectStage';
// import { AddNewTaskModal } from '../../Modal/AddNewTask/AddNewTaskModal';
import { Issue } from '../Issue/Issue';
import { Menu } from '../Menu/Menu';

interface IIssuesProps {
	template: IOneProject;
	activeTemplate: { name: string; slug: string };
	templateKanban: ITemplateKanban[];
	templateNames: string[];
	isUserTeamTemplate: boolean;
	isTemplateChoice: boolean;
	activateTaskModal: () => void;
	setActiveIssue: Dispatch<SetStateAction<number | undefined>>;
}

export const Issues: FC<IIssuesProps> = ({
	template,
	activeTemplate,
	templateKanban,
	templateNames,
	isUserTeamTemplate,
	isTemplateChoice,
	activateTaskModal,
	setActiveIssue,
}) => {
	const [isTitleHovered, setIsTitleHovered] = useState(false);

	// const {
	// 	active: activeModalAddProjectStage,
	// 	activate: activateModalAddProjectStage,
	// 	deactivate: deactivateModalAddProjectStage,
	// } = useToggle(false);

	// const {
	// 	active: isModalAddTaskActive,
	// 	activate: activateAddTaskModal,
	// 	deactivate: deactivateAddTaskModal,
	// } = useToggle(false);

	return (
		<>
			{isTemplateChoice ? (
				<></>
			) : (
				<S.Title
					direction='row'
					align='center'
					gap={1}
					attributes={{
						onMouseEnter: () => setIsTitleHovered(true),
						onMouseLeave: () => setIsTitleHovered(false),
					}}
				>
					<Text variant='title-3' color='neutral' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						{template.name}
					</Text>
					{isUserTeamTemplate && (
						<Menu
							name={template.name}
							isVisible={isTitleHovered}
							templateSlug={template.slug}
							templateNames={templateNames}
						/>
					)}
				</S.Title>
			)}
			<>
				{templateKanban.length ? (
					<>
						<Text
							variant='body-strong-1'
							color='neutral'
							attributes={{ style: { margin: '0 8px 24px', letterSpacing: '-0.02em' } }}
						>
							Этапы и задачи
						</Text>
						{templateKanban.map((kanbanGroup) => (
							<S.StageGroup key={kanbanGroup.id}>
								<StageTitle
									id={kanbanGroup.id}
									name={kanbanGroup.name}
									issues={kanbanGroup.issues}
									stages={templateKanban.map(({ name }) => name)}
									projectSlug={activeTemplate.slug}
									isTemplate
									// isMenuShown={isUserTeamTemplate}
									isMenuShown={false}
								/>

								<S.StageBody>
									{kanbanGroup.issues.length ? (
										<S.StageIssues>
											{kanbanGroup.issues.map((issue) => (
												<Issue
													key={issue.id}
													issue={issue}
													templateSlug={activeTemplate.slug}
													// isUserTeamTemplate={isUserTeamTemplate}
													isUserTeamTemplate={false}
													activateTaskModal={activateTaskModal}
													setActiveIssue={setActiveIssue}
												/>
											))}
										</S.StageIssues>
									) : null}

									{/* {isUserTeamTemplate && (
										<S.AddIssueButton
											variant='ghost'
											startIcon={<SvgComponent name='add-line' />}
											size='small'
											attributes={{ style: { marginTop: `${kanbanGroup.issues.length ? '0' : '6px'}` } }}
											onClick={activateAddTaskModal}
										>
											<S.AddIssueButtonText variant='caption-1' color='neutral-faded'>
												Добавить задачу
											</S.AddIssueButtonText>
										</S.AddIssueButton>
									)} */}
								</S.StageBody>
							</S.StageGroup>
						))}
					</>
				) : (
					<>
						{/* {isUserTeamTemplate && (
							<Text
								variant='body-strong-1'
								color='neutral'
								attributes={{ style: { margin: '0 8px 24px', letterSpacing: '-0.02em' } }}
							>
								Этапы и задачи
							</Text>
						)} */}
					</>
				)}

				{/* {isUserTeamTemplate && (
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
				)} */}
			</>

			{/* <AddProjectStageModal
				size='660px'
				active={activeModalAddProjectStage}
				onClose={deactivateModalAddProjectStage}
				projectIssueSort={template?.Kanban || []}
				projectSlug={activeTemplate.slug}
			/> */}

			{/* <AddNewTaskModal active={isModalAddTaskActive} onClose={deactivateAddTaskModal} dataProject={template} /> */}
		</>
	);
};
