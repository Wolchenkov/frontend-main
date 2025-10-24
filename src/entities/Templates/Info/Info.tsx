import React, { FC, useState } from 'react';
import * as S from './Info.styled';
import { Issues } from '../Issues/Issues';
import { useToggle } from 'reshaped/bundle';
import { TaskModal } from '../TaskDetail/TaskModal';
// import { Documents } from '../Documents/Documents';

interface IInfoProps {
	template: IOneProject;
	activeTemplate: { name: string; slug: string };
	templateKanban: ITemplateKanban[];
	templateNames: string[];
	isUserTeamTemplate: boolean;
	isTemplateChoice: boolean;
	templateIssues: ITask[] | undefined;
}

export const Info: FC<IInfoProps> = ({
	template,
	activeTemplate,
	templateKanban,
	templateNames,
	isUserTeamTemplate,
	isTemplateChoice,
}) => {
	const { active: activeTaskModal, activate: activateTaskModal, deactivate: deactivateTaskModal } = useToggle(false);
	const [activeIssue, setActiveIssue] = useState<number | undefined>();

	const handleTaskModalClose = () => {
		deactivateTaskModal();
		setActiveIssue(undefined);
	};

	return (
		<>
			<S.Info>
				<S.InfoWrap>
					<Issues
						template={template}
						activeTemplate={activeTemplate}
						templateKanban={templateKanban}
						templateNames={templateNames}
						isUserTeamTemplate={isUserTeamTemplate}
						isTemplateChoice={isTemplateChoice}
						activateTaskModal={activateTaskModal}
						setActiveIssue={setActiveIssue}
					/>
					{/* <Documents /> */}
				</S.InfoWrap>
			</S.Info>

			{activeTaskModal && (
				<TaskModal
					active={activeTaskModal}
					deactivate={handleTaskModalClose}
					dataProject={template}
					projectSlug={activeTemplate.slug}
					modalId={activeIssue}
					isUserTeamTemplate={isUserTeamTemplate}
				/>
			)}
		</>
	);
};
