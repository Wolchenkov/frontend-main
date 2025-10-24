import { Button } from 'reshaped/bundle';
import styled from 'styled-components';

export const TableRow = styled.div<{ isApproved: boolean; isChanged: boolean; hasComment: boolean }>`
	transition: all 0.5s ease;
	height: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 0 20px;
	border-bottom: 1px solid #ebebeb;
	cursor: pointer;

	&:hover {
		background: rgba(248, 248, 248, 1);
	}

	& > div:nth-child(-n + 7) {
		opacity: ${({ isApproved, isChanged, hasComment }) => ((!isChanged && hasComment) || isApproved ? '0.5' : '1')};
	}
	& > div:first-child {
		opacity: 1;
	}
`;

export const ActionButton = styled(Button)<{ rowHover: boolean; isApproved: boolean; isSameUser: boolean }>`
	&:first-of-type {
		display: ${({ rowHover, isApproved, isSameUser }) =>
			rowHover && !isApproved && !isSameUser ? 'inline-flex' : 'none'};
	}
	&:last-of-type {
		display: ${({ rowHover, isApproved }) => (rowHover || isApproved ? 'inline-flex' : 'none')};
		margin-left: ${({ rowHover, isApproved, isSameUser }) => (!rowHover || isApproved || isSameUser ? '28px' : '0')};
		cursor: pointer;
	}
`;

export const TableRowCell = styled.div`
	flex-shrink: 0;

	& > div {
		font-weight: 500;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

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
		display: flex;
		align-items: center;
		gap: 8px;

		& > div {
			flex-shrink: 0;
		}
	}

	&:nth-child(4) {
		width: 10%;
	}

	&:nth-child(5) {
		width: 6.5%;
		display: flex;
		justify-content: center;

		& > div {
			color: #898b8f;
		}
	}

	&:nth-child(6) {
		width: 6.5%;
		display: flex;
		justify-content: center;

		& > div {
			color: #898b8f;
		}
	}

	&:nth-child(7) {
		width: 6.5%;
		display: flex;
		justify-content: center;
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
