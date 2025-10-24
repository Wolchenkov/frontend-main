import styled, { css } from 'styled-components';
import { Icon, Text } from 'reshaped/bundle';

export const TableRow = styled.div<{
	isHovered: boolean;
	isFinished?: boolean;
	isActiveParentBadge: boolean;
}>`
	position: relative;
	border-bottom: 1px solid #e5e7ea;
	border-left: 2px solid ${({ isActiveParentBadge }) => (isActiveParentBadge ? '#FF6633' : 'transparent')};
	background-color: ${({ isHovered }) => isHovered && '#F8F8F8'};
	cursor: pointer;

	&:nth-child(1) {
		border-top: ${({ isFinished }) => isFinished && '1px solid #e5e7ea'};
	}
`;

export const TableRowHeader = styled.div`
	width: 100%;
	height: 10px;
`;

export const TableRowBody = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 44px;
	padding: 0 80px 0 0;
`;

export const TableRowFooter = styled.div`
	width: 100%;
	height: 10px;
`;

export const UnderRow = styled.div`
	height: 45px;
	border-bottom: 1px solid #e5e7ea;
	background-color: #f8f8f8;

	&:nth-child(1) {
		height: 46px;
		border-top: 1px solid #e5e7ea;
	}
`;

export const TableRowCell = styled.div`
	position: relative;
	flex-shrink: 0;

	&.TableHeadCell__name {
		display: flex;
		align-items: center;
		width: 36.4%;
		height: 100%;
		padding-left: 20px;
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

	&.TableHeadCell__menu {
		position: absolute;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
	}
`;

export const TableRowIssueNameWrap = styled.div<{ isChild?: boolean }>`
	width: 100%;
	height: 24px;
	margin-right: ${({ isChild }) => isChild && '24px'};
	overflow: hidden;
`;

export const TableRowIssueName = styled(Text)<{ isRowHovered: boolean; isOverflowed: boolean }>`
	position: relative;
	line-height: 24px;
	font-weight: 500;
	letter-spacing: -0.01em;
	white-space: nowrap;

	${({ isOverflowed }) =>
		isOverflowed &&
		css`
			&::before {
				content: '';
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 1px;
				height: 20px;
				background: #e5e7ea;
				z-index: 10;
			}
		`}

	${({ isOverflowed, isRowHovered }) =>
		isOverflowed &&
		css`
			&::after {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				width: 42px;
				height: 100%;
				background: ${isRowHovered
					? 'linear-gradient(90deg, rgba(248, 248, 248, 0) 0%, #F8F8F8 80.09%)'
					: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 80.09%)'};
			}
		`}
`;

export const TableRowCellNameWrap = styled(Text)`
	position: relative;
	width: 100%;
	display: flex;
	align-items: center;
	gap: 8px;

	&:hover ${TableRowIssueName} {
		position: absolute;
		left: 24px;
		z-index: 1;
		display: block;
		width: auto;
		max-width: calc(100vw - 300px);
		margin-right: 0;

		padding-right: 7px;
		background-color: #f8f8f8;
	}

	&:hover ${TableRowIssueName}::after {
		display: none;
	}
`;

export const TableRowDragIcon = styled(Icon)<{ isFinishedIssue?: boolean; isRowHovered: boolean; isDragging: boolean }>`
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	display: ${({ isFinishedIssue, isRowHovered }) => (!isFinishedIssue && isRowHovered ? 'block' : 'none')};
	cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
	cursor: ${({ isDragging }) => (isDragging ? '-moz-grabbing' : '-moz-grab')};
	cursor: ${({ isDragging }) => (isDragging ? '-webkit-grabbing' : '-webkit-grab')};
`;

export const TableRowFinishIcon = styled(Icon)<{ isClickable: boolean }>`
	cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;

export const TableRowChildIcon = styled(Icon)`
	margin-left: auto;
`;

export const TableRowParentBadge = styled.div<{ isRowHovered: boolean; activeParentIssue: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 4px;
	max-width: 62px;
	padding: 0 6px 0 4px;
	height: 20px;
	background-color: ${({ activeParentIssue }) =>
		activeParentIssue ? 'var(--rs-color-background-primary-faded)' : 'var(--rs-color-background-neutral-faded)'};
	border-radius: 100px;
	outline: ${({ isRowHovered }) => (isRowHovered ? '1px solid #E5E7EA' : 'none')};
	transition: color var(--rs-duration-fast) var(--rs-easing-standard);

	color: ${({ activeParentIssue }) =>
		activeParentIssue ? 'var(--rs-color-foreground-primary)' : 'var(--rs-color-foreground-neutral-faded)'};

	&:hover {
		background-color: var(--rs-color-background-primary-faded);
		outline: none;
		color: var(--rs-color-foreground-primary);

		& > div {
			color: var(--rs-color-foreground-primary);
		}
	}
`;

export const TableRowPriorityBadge = styled.div<{ color: string; size: number }>`
	width: ${({ size }) => `calc(${size} * 4px)`};
	height: ${({ size }) => `calc(${size} * 4px)`};
	background-color: ${(props) => props.color};
	border-radius: 50%;
`;
