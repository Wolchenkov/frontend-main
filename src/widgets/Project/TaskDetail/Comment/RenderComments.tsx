import React, { useMemo } from 'react';
import { Comment } from './Comment';

interface RenderCommentsProps {
	comments: IComment[];
	currentUser: IMember | undefined;
	allMembers: IMember[];
	refetchTaskData: any;
	taskState: ITaskDetail;
	projectSlugData: string;
	tabName: string;
}

// Функция для отображения комментариев в зависимости от выбранной вкладки
export const RenderComments: React.FC<RenderCommentsProps> = ({
	comments,
	currentUser,
	allMembers,
	refetchTaskData,
	taskState,
	projectSlugData,
	tabName,
}) => {
	const filteredComments = useMemo(
		() => (tabName === 'comment' ? comments : comments.filter(({ files }) => files.length > 0)),
		[comments, tabName]
	);

	return (
		<>
			{filteredComments.map((comment) => {
				return (
					currentUser && (
						<Comment
							key={comment.id}
							comment={comment}
							user={currentUser}
							allMembers={allMembers}
							refetchTaskData={refetchTaskData}
							taskState={taskState}
							projectSlugData={projectSlugData}
						/>
					)
				);
			})}
		</>
	);
};
