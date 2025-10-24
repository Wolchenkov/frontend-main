import styled from 'styled-components';

export const Table = styled.div`
	margin-top: 16px;
`;

export const TableWrapper = styled.div`
	& > div:nth-child(1) {
		padding: 32px 20px 0;
	}

	&:nth-child(1) > div:nth-child(1) {
		padding-top: 0;
	}
`;

export const TableContainer = styled.div<{ showFilters: boolean }>`
	height: calc(100vh - ${({ showFilters }) => (showFilters ? '188px' : '144px')});
	padding: 20px 0 60px;
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
	margin: 0 -20px;
`;
