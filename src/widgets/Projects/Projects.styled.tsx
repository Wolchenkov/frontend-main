import styled from 'styled-components';

export const ProjectsWrap = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
	padding: 20px;
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

export const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 124px);
`;
