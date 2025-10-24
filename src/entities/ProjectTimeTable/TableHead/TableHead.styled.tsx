import styled from 'styled-components';

export const TableHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 4px 20px;
	border-bottom: 1px solid #ebebeb;
	position: relative;
`;

export const TableHeadCell = styled.div`
	flex-shrink: 0;

	&:nth-child(1) {
		width: 20px;
	}

	&:nth-child(2) {
		flex-grow: 1;
		flex-shrink: 1;
		overflow: hidden;
	}

	&:nth-child(3) {
		width: 20%;
	}

	&:nth-child(4) {
		width: 10%;
	}

	&:nth-child(5) {
		display: flex;
		justify-content: center;
		width: 6.5%;
	}

	&:nth-child(6) {
		display: flex;
		justify-content: center;
		width: 6.5%;
	}

	&:nth-child(7) {
		display: flex;
		justify-content: center;
		width: 6.5%;
	}

	&:nth-child(8) {
		width: 1.5%;
		display: flex;
		justify-content: center;
	}

	&:nth-child(9) {
		width: 3%;
		display: flex;
		justify-content: center;
	}
`;

export const TableFilterOption = styled.div`
	display: flex;
	align-items: center;
	padding: 8px 12px;
	cursor: pointer;

	&:not(:last-child) {
		margin-bottom: 4px;
	}
`;
