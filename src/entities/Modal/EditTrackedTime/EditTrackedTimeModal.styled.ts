import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Container = styled.div`
	max-height: 582px;
	overflow: auto;
	/* Стилизация полосы прокрутки */
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #cfd0d3;
		border-radius: 8px;
	}
`;

export const Header = styled.div`
	padding: 32px 20px 8px;
	display: flex;
	justify-content: space-between;
`;
export const HeaderText = styled(Text)`
	color: #898b8f;
	letter-spacing: -0.01em;
	font-weight: 500;
`;
export const TaskModalTrackedTime = styled.div`
	background-color: rgba(233, 233, 235, 1);
	padding: 8px;
	border-radius: 6px;
	font-size: 14px;
	font-weight: 500;
	color: rgba(82, 85, 93, 1);
	min-width: 67px;
	text-align: end;
	cursor: pointer;
`;

export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.02em;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	display: block;
`;
