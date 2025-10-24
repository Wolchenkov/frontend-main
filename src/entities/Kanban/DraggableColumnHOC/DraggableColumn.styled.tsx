import { Button } from 'reshaped/bundle';
import styled from 'styled-components';

export const UnderColumn = styled.div`
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 10px 8px;
	border-radius: 8px;
	border: 1px dashed #e5e7ea;
	flex-shrink: 0;
	cursor: 'grabbing';
`;

export const UnderHeader = styled.div`
	height: 28px;
	border-radius: 8px;
	border: 1px dashed #e5e7ea;
	margin-bottom: 10px;
	width: 230px;
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
	height: calc(100vh - 263px); // Учесть высоту шапки и других элементов внутри колонки
	// height: 65.7%;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;

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
