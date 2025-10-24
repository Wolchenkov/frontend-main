import styled from 'styled-components';
import { Modal } from 'reshaped/bundle';

export const MovementModal = styled(Modal)`
	overflow: visible;
`;

export const MovementModalElement = styled.div<{ active: boolean }>`
	display: flex;
	align-items: center;
	padding-inline: 12px;
	padding-block: 14px;
	border-bottom: 1px solid rgba(229, 231, 234, 1);
	transition: all 0.3s ease;
	background-color: ${(props) => props.active && 'rgba(233, 233, 235, 1)'};
	cursor: pointer;

	&:hover {
		background: rgba(248, 248, 248, 1);
	}

	&:last-child {
		border-bottom: none;
	}
`;

export const MovementModalElementWrapper = styled.div`
	overflow-y: scroll;
	max-height: 442px;
	height: 100%;

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(207, 208, 211, 1);
	}
`;
