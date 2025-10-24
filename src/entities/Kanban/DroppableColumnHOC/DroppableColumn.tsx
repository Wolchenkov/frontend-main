import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useDrop } from 'react-dnd';
import { useRouter } from 'next/router';
import { useDragStepMutation } from '../../../store/projects/projectsApi';

const DroppableColumn = ({
	id,
	children,
	columnsOrder,
	setColumnsOrder,
}: {
	id: number;
	children: ReactNode;
	columnsOrder: number[];
	setColumnsOrder: Dispatch<SetStateAction<number[]>>;
}) => {
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const [dragColumn] = useDragStepMutation();

	const handleColumnHover = (draggedId: number, droppedId: number) => {
		if (!columnsOrder || !setColumnsOrder) return;

		const newColumnsOrder = [...columnsOrder];
		const draggedColumnIndex = newColumnsOrder.indexOf(draggedId);
		const droppedColumnIndex = newColumnsOrder.indexOf(droppedId);

		if (draggedColumnIndex === droppedColumnIndex) return;

		newColumnsOrder.splice(draggedColumnIndex, 1);
		newColumnsOrder.splice(droppedColumnIndex, 0, draggedId);
		setColumnsOrder(newColumnsOrder);
	};

	const [_, drop] = useDrop({
		accept: 'column',
		drop: () => {
			const body = { kanbanSort: columnsOrder };
			const payload = { projectSlug, body };
			dragColumn(payload);
		},
		hover: (item: { id: number }) => {
			handleColumnHover(item.id, id);
		},
		collect: (monitor) => ({ isOver: monitor.isOver() }),
	});

	return <div ref={drop}>{children}</div>;
};

export default DroppableColumn;
