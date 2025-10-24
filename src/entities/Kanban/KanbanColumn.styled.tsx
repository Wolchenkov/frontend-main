import { Button, Divider } from 'reshaped/bundle';
import styled from 'styled-components';

// cursor: ${(props) => (props.isDragging ? 'grabbing' : props.isCompleted ? 'auto' : 'grab')};
export const Column = styled.div<{ isCompleted: boolean }>`
	padding: 10px 8px;
	background-color: #f4f5f7;
	border-radius: 8px;
	border: 1px solid #f4f5f7;
	flex-shrink: 0;
	position: relative;
	// cursor: grabbing;
`;
export const ColumnOverCompleted = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	border-radius: 8px;
	border: 1px solid #c7edcd;
	background: rgba(230, 254, 243, 0.75);
	z-index: 13;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ColumnOverCompletedText = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	z-index: 14;
`;

export const Header = styled.div`
	height: 28px;
	display: flex;
	width: 230px;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
`;

export const Title = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
export const BtnAddTask = styled(Button)`
	border: 1px dashed #e5e7ea;
	border-radius: 8px;
	height: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 8px;
`;
export const TaskList = styled.div`
	overflow-y: auto;
	height: calc(100vh - 266px); // Учесть высоту шапки и других элементов внутри колонки
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;

	/* Стилизация полосы прокрутки */
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar {
		width: 2px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #cfd0d3;
	}
`;

export const MyDropCardDivider = styled(Divider)<{ isOver: boolean }>`
	background-color: ${(props) => (props.isOver ? '#FF6633' : '#f4f5f7')};
	min-width: 228px;
	flex-shrink: 0;
	margin: 4px 0;
`;

export const UnderCard = styled.div<{ isDragging: boolean }>`
	width: 228px;
	height: 140px;
	border-radius: 6px;
	flex-shrink: 0;
	border: 1px dashed #e5e7ea;
	background: #f4f5f7;
	cursor: ${(props) => (props.isDragging ? 'grabbing' : 'grab')};
`;
