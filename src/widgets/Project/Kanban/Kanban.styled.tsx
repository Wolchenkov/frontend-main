import { Button } from 'reshaped/bundle';
import styled from 'styled-components';

export const MainContainer = styled.main`
	height: calc(100vh - 144px);
	display: flex;
	flex-direction: row;
	overflow: auto;
	padding-right: 20px;
	padding-left: 20px;
	gap: 16px;

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

export const BtnAddColumn = styled(Button)`
	border: 1px dashed #e5e7ea;
	border-radius: 8px;
	width: 26px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
`;
