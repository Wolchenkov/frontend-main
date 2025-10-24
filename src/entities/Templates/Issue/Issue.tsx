import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import * as S from './Issue.styled';
import { Text } from 'reshaped/bundle';
import { IssueMenu } from '../IssueMenu/IssueMenu';

interface IIssueProps {
	issue: ITask;
	templateSlug: string;
	isUserTeamTemplate: boolean;
	activateTaskModal: () => void;
	setActiveIssue: Dispatch<SetStateAction<number | undefined>>;
}

export const Issue: FC<IIssueProps> = ({
	issue,
	templateSlug,
	isUserTeamTemplate,
	activateTaskModal,
	setActiveIssue,
}) => {
	const [isRowHovered, setIsRowHovered] = useState(false);

	return (
		<S.Issue
			isHovered={isRowHovered}
			onMouseEnter={() => setIsRowHovered(true)}
			onMouseLeave={() => setIsRowHovered(false)}
			onClick={() => {
				setActiveIssue(issue.id);
				activateTaskModal();
			}}
		>
			<Text
				variant='caption-1'
				color='neutral'
				attributes={{ style: { lineHeight: '20px', fontWeight: 500, letterSpacing: '-0.01em' } }}
			>
				{issue.name}
			</Text>
			{isUserTeamTemplate && (
				<IssueMenu
					issueId={issue.id}
					templateSlug={templateSlug}
					isRowHovered={isRowHovered}
					setIsRowHovered={setIsRowHovered}
				/>
			)}
		</S.Issue>
	);
};
