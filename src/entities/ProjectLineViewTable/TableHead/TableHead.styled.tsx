import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const TableHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20px;
	margin-bottom: 4px;
	padding: 0 80px 0 0;
`;

export const TableHeadCell = styled.div`
	flex-shrink: 0;

	&.TableHeadCell__name {
		display: flex;
		justify-content: flex-start;
		width: 36.4%;
		padding-left: 48px;
	}

	&.TableHeadCell__children {
		width: 3.8%;
	}

	&.TableHeadCell__delegate {
		display: flex;
		justify-content: center;
		width: 4.1%;
	}

	&.TableHeadCell__priority {
		display: flex;
		justify-content: center;
		width: 7.5%;
	}

	&.TableHeadCell__deadline {
		display: flex;
		justify-content: center;
		width: 10.2%;
	}

	&.TableHeadCell__estimate {
		display: flex;
		justify-content: center;
		width: 6.5%;
	}

	&.TableHeadCell__time_amount {
		display: flex;
		justify-content: center;
		width: 6.5%;
	}

	&.TableHeadCell__budget {
		display: flex;
		justify-content: flex-end;
		width: 6.5%;
	}

	&.TableHeadCell__consumption {
		display: flex;
		justify-content: flex-end;
		width: 6.5%;
	}

	&.TableHeadCell__balance {
		display: flex;
		justify-content: flex-end;
		width: 6.5%;
	}
`;

export const TableHeadCellText = styled(Text)`
	position: relative;
	flex-shrink: 0;
	line-height: 20px;
	font-weight: 500;
	letter-spacing: -0.01em;
`;

export const TableHeadSortButton = styled(Button)<{ isVisible?: boolean }>`
	position: absolute;
	top: 0;
	right: 0;
	transform: translateX(100%) !important;
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	min-width: 22px;
	min-height: 18px;
	height: 18px;
	padding: 0;
	border: none;

	&:hover {
		background: transparent !important;
	}
`;
