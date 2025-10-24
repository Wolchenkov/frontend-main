import styled from 'styled-components';

export const Management = styled.div`
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

export const ManagementBody = styled.div`
	display: grid;
	grid-template-columns: 172px 547px;
	gap: 110px;
	padding: 40px 20px 350px;
`;
