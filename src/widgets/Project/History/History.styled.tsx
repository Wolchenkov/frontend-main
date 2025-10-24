import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const MainContainer = styled.main`
	display: flex;
	align-items: center;
	flex-direction: column;
	height: calc(100vh - 144px);
	overflow: auto;
	padding-bottom: 40px;
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

export const DayContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	max-width: 829px;
	min-width: 700px;
	margin-bottom: 52px;
	gap: 20px;
`;

export const TextContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 8px;
`;

export const MainText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 20px;
`;

export const Link = styled.a`
	text-decoration: none;
	color: #14171f;
`;

export const TimeText = styled(Text)`
	margin-left: 10px;
	font-weight: 600;
	color: #898b8f;
`;

export const EmptyHistory = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 144px);
`;

export const EmptyHistoryText = styled(Text)`
	letter-spacing: -0.02em;
	font-weight: 600;
	width: 330px;
`;

export const TextDay = styled(Text)`
	margin: 12px 50px 0 0;
	width: 110px;
`;

export const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100% - 80px);
`;
