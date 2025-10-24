import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const TableContainer = styled.div`
	max-width: 1600px;
	width: 100%;
	margin: auto
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

export const Table = styled.div`
	width: 100%;
	min-width: 1150px;
`;

export const Header = styled.div`
	display: flex;
	padding: 0px 20px;
	justify-content: flex-end;
	align-items: flex-start;
	gap: 1px;
`;

export const HeaderDays = styled.div`
	display: flex;
	width: 64px;
	height: 24px;
	justify-content: center;
	align-items: center;
	gap: 4px;
	flex-shrink: 0;
`;

export const LoaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 175px);
	gap: 20px;
`;

export const MyText500 = styled(Text)<{ isLowPriority?: boolean }>`
	letter-spacing: -0.01em;
	font-weight: 500;
	color: ${({ isLowPriority }) => isLowPriority && '#898B8F'};
`;

export const LazyLoadingContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-top: 10px;
`;
