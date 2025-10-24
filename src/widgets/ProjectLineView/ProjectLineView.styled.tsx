import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const ProjectLineView = styled.div<{ isFilterOpened: boolean }>`
	height: auto;
	max-height: ${({ isFilterOpened }) => (isFilterOpened ? 'calc(100vh - 224px)' : 'calc(100vh - 144px)')};
	overflow-y: auto;

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(207, 208, 211, 0.5);
	}
`;

export const StageGroup = styled.div`
	padding-bottom: 36px;
`;

export const StageButton = styled(Button)`
	padding: 10px 20px;

	&:hover {
		background: transparent !important;
	}
`;

export const StageButtonText = styled(Text)`
	margin-left: 8px;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;

export const LoaderWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 144px);
`;

export const StageHeader = styled.div`
	display: flex;
	align-items: center;
	padding: 0 0 0 16px;
`;

export const ChevronIcon = styled.div<{ open?: boolean }>`
	padding: 6px;
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: background 0.2s;
	border-radius: 6px;

	svg {
	  width: 16px;
		height: 16px;
		transition: transform 0.2s;
		transform: rotate(${(p) => (p.open ? '90deg' : '0deg')});
	}

	&:hover {
		background: #f4f5f7;
	}
`;
