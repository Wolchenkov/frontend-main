import styled from 'styled-components';

export const Table = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: calc(100vh - 80px);

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar {
		height: 18px;
		width: 14px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		border-radius: 9999px;
		background-color: #d7d8db;
	}
`;

export const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100% - 80px);
`;

export const EmptySpace = styled.div`
	height: 100%;

	&::before {
		content: '';
		width: 303px;
		height: 100%;
		border-right: 1px solid var(--border-neutral-faded, #e5e7ea);
		position: fixed;
	}
`;
