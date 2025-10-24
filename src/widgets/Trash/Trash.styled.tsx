import styled from 'styled-components';

export const Trash = styled.div`
	height: 100vh;
	overflow-y: auto;

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 3px;
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #cfd0d3;
		border-radius: 8px;
	}
`;

export const TrashWrap = styled.div`
	background: #ffffff;
	width: 100%;
	padding: 20px;
`;

export const TrashLoader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 164px);
`;
