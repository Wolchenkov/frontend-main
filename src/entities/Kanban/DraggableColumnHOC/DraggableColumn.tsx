import { ReactNode, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import * as S from './DraggableColumn.styled';
import { SvgComponent } from '../../../shared';

const DraggableColumn = ({
	id,
	children,
	isClientRole,
}: {
	id: number;
	children: ReactNode;
	isClientRole: boolean;
}) => {
	const [{ isDragging }, drag] = useDrag({
		type: 'column',
		item: { id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	useEffect(() => {
		if (isDragging) {
			document.body.style.cursor = 'grabbing';
		} else {
			document.body.style.cursor = 'default';
		}
	}, [isDragging]);

	return (
		<div ref={!isClientRole ? drag : null}>
			{isDragging ? (
				<S.UnderColumn>
					<S.UnderHeader />
					<S.BtnAddTask variant='ghost'>
						<SvgComponent name={'add-line'} />
					</S.BtnAddTask>
					<S.TaskList />
				</S.UnderColumn>
			) : (
				children
			)}
		</div>
	);
};

export default DraggableColumn;
