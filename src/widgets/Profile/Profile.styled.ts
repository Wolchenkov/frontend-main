import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
`;

export const Container = styled.div`
	position: relative;
	padding-top: 40px;
	display: flex;
	justify-content: center;
`;

export const MainContainer = styled.div`
	width: 453px;
	padding-bottom: 20px;
`;

export const Text500 = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;

export const Main = styled.div`
	height: 100vh;
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
