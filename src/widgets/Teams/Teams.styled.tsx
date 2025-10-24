import styled from 'styled-components';

export const HeaderContainer = styled.div`
	padding: 0 20px 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
export const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100% - 164px);
`;

export const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	height: calc(100vh - 156px);
	overflow: auto;
	padding: 0 0px 20px;
	width: 100%;
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
