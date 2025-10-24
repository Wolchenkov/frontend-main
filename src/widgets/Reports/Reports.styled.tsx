import { Button } from 'reshaped/bundle';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding: 20px;
`;

export const Switcher = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const PanelRight = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
export const ProjectFilterButton = styled(Button)<{ active: boolean }>`
	background: ${({ active }) => active && '#FDEDE7'};

	&:hover {
		background: ${({ active }) => active && '#FDEDE7 !important'};
	}
`;

export const MainContentWrapper = styled.div<{ isFilterOpened: boolean }>`
	padding: 20px 0;
	height: calc(100vh - ${({ isFilterOpened }) => (isFilterOpened ? '178px' : '132px')});
	overflow: auto;
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
