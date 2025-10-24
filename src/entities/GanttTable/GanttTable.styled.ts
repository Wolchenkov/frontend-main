import styled from 'styled-components';

export const Table = styled.div`
	height: calc(100vh - 144px);
	overflow: auto;
	position: relative;

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

export const PlanSwitch = styled.div`
	position: fixed;
	top: 145px;
	right: 0;
	margin-right: 16px;
	padding-right: 4px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 4px;
	background: linear-gradient(270deg, #fff 79.17%, rgba(255, 255, 255, 0) 100%);
	width: 124px;
	height: 27px;
	z-index: 6;
`;
