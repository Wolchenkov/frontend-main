import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '../../../store';
import { selectFilter } from '../../../store/tasks/tasksSlice';
import { useDrop } from 'react-dnd';
import { useDragIssueEmptyColumnMutation, useDragIssueMutation } from '../../../store/projects/projectsApi';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function useIssuesController(
	kanbanGroupId: number,
	updateKanbanData?: Dispatch<SetStateAction<IKanbanIssue[] | undefined>>
): any {
	const [showPlaceholderBefore, setShowPlaceholderBefore] = useState(false);

	const filter = useAppSelector(selectFilter);

	const router = useRouter();
	const { slug: projectSlug } = router.query;

	const [dragIssue] = useDragIssueMutation();
	const [dragIssueInEmptyColumn] = useDragIssueEmptyColumnMutation();

	const handleDrop = (draggedIssue: any) => {
		const draggedBoardId = draggedIssue.project_issue_kanban_id;
		const droppedBoardId = kanbanGroupId;
		let droppedBoardIssues: ITask[] = [];

		updateKanbanData &&
			updateKanbanData((prevKanbanData: IKanbanIssue[] | undefined) => {
				return (prevKanbanData as IKanbanIssue[]).map((kanbanGroup) => {
					if (kanbanGroup.id === draggedBoardId) {
						return {
							...kanbanGroup,
							issues: kanbanGroup.issues.filter(({ id }) => id !== draggedIssue.id),
						};
					} else if (kanbanGroup.id === droppedBoardId) {
						droppedBoardIssues = kanbanGroup.issues;
						return {
							...kanbanGroup,
							issues: [draggedIssue, ...kanbanGroup.issues],
						};
					} else {
						return kanbanGroup;
					}
				});
			});

		if (droppedBoardIssues.length) {
			dragIssue({
				projectSlug,
				body: {
					source: draggedIssue.id,
					target: droppedBoardIssues[0].id,
					before: true,
				},
			});
		} else {
			dragIssueInEmptyColumn({
				projectSlug,
				body: { project_issue_kanban_id: droppedBoardId },
				projectIssueId: draggedIssue.id,
			});
		}
	};

	const [{ isOver: isOverBeforePlaceholder }, issueBeforePlaceholderDropRef] = useDrop({
		accept: 'ISSUE',
		drop: (item: any) => handleDrop(item),
		hover: () => setShowPlaceholderBefore(true),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	const [{ isOver: isOverBefore }, issueBeforeDropRef] = useDrop({
		accept: 'ISSUE',
		drop: (item: any) => handleDrop(item),
		hover: () => setShowPlaceholderBefore(true),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	return {
		filter,
		showPlaceholderBefore,
		isOverBeforePlaceholder,
		issueBeforePlaceholderDropRef,
		isOverBefore,
		issueBeforeDropRef,
	};
}
