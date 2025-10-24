import { Button } from 'reshaped/bundle';
import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
`;

const expand = keyframes`
  from { max-width: 0; }
  to { max-width: 100%; }
`;
const collapse = keyframes`
  from { max-width: 100%; }
  to { max-width: 0;}
`;
export const UnderColumn = styled.div<{ isDragging: boolean; isInitialized: boolean }>`
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: ${(props) => props.isDragging && ' 10px 8px'};
	border-radius: 8px;
	border: ${(props) => props.isDragging && '1px dashed #e5e7ea'};
	flex-shrink: 0;
	max-width: 0;
	transition: max-width 0.5s ease-out;
	animation: ${(props) =>
		!props.isInitialized && props.isDragging
			? css`
					${expand} 0.5s forwards
			  `
			: props.isInitialized && !props.isDragging
			? css`
					${collapse} 0.5s forwards
			  `
			: 'none'};
`;
const underHeaderExpand = keyframes`
  from { width: 0; }
  to { width: 230px; }
`;
const underHeaderCollapse = keyframes`
  from { width: 230px; }
  to { width: 0; }
`;
export const UnderHeader = styled.div<{ isDragging: boolean; isInitialized: boolean }>`
	height: 28px;
	border-radius: 8px;
	border: ${(props) => props.isDragging && '1px dashed #e5e7ea'};
	margin-bottom: 10px;
	width: 0;
	transition: width 0.5s ease-out;
	animation: ${(props) =>
		!props.isInitialized && props.isDragging
			? css`
					${underHeaderExpand} 0.5s forwards
			  `
			: props.isInitialized && !props.isDragging
			? css`
					${underHeaderCollapse} 0.5s forwards
			  `
			: 'none'};
`;
export const BtnAddTask = styled(Button)<{ isDragging: boolean; isInitialized: boolean }>`
	border: 1px dashed #e5e7ea;
	border-radius: 8px;
	height: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 8px;

	width: 0;
	transition: width 0.5s ease-out;
	animation: ${(props) =>
		!props.isInitialized && props.isDragging
			? css`
					${underHeaderExpand} 0.5s forwards
			  `
			: props.isInitialized && !props.isDragging
			? css`
					${underHeaderCollapse} 0.5s forwards
			  `
			: 'none'};
`;
