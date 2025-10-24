import styled from 'styled-components';
import { Breadcrumbs } from 'reshaped/bundle';

export const Table = styled.div<{ rootFolder: boolean }>`
	margin: 16px -20px 0 -20px;
	height: calc(100vh - ${({ rootFolder }) => (rootFolder ? '208px' : '216px')});
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

export const TableHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 0px 20px 9px;
	border-bottom: 1px solid #ebebeb;

	& > div {
		flex-shrink: 0;

		&:nth-child(1) {
			flex-grow: 1;
			flex-shrink: 1;
			overflow: hidden;
		}

		&:nth-child(2) {
			width: 10%;
			display: flex;
			justify-content: center;
		}

		&:nth-child(3) {
			width: 20%;
			display: flex;
			justify-content: center;
		}

		&:nth-child(4) {
			width: 30%;
		}

		&:nth-child(5) {
			width: 56px;
		}
	}
`;

export const Navigation = styled(Breadcrumbs)`
	margin-bottom: 24px;
`;
