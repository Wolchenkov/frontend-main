import styled from 'styled-components';

interface IGanttItemStyled {
	countDays: number;
	countDaysFromStart: number;
	itemId: number;
	index: number;
	isFinished: boolean;
	isDeleted: boolean;
	isHovered: boolean;
	activeItem: number | undefined;
}

export const TableRow = styled.div`
	display: flex;
	border-bottom: 1px solid var(--rs-color-border-neutral-faded);
	width: fit-content;
`;

export const Stage = styled.div`
	min-height: 52px;
	padding: 16px 0 16px 20px;
	width: 395px;
	flex-shrink: 0;
	position: sticky;
	left: 0;
	background-color: var(--rs-color-background-base);
	z-index: 4;
	border-right: 1px solid var(--rs-color-border-neutral-faded);
`;

export const StageName = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;

	&:hover {
		cursor: pointer;
	}
`;

export const ArrowIcon = styled.div<{ isExpanded: boolean }>`
	display: inline-flex;
	width: 20px;
	height: 20px;
	color: var(--rs-color-foreground-neutral);
	transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	transform: ${({ isExpanded }) => (isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)')};
`;

export const ProjectIssues = styled.ul<{ isExpanded: boolean }>`
	padding: 0 8px;
	overflow: hidden;
	max-height: ${({ isExpanded }) => (isExpanded ? '1000vh' : 0)};
	transition: ${({ isExpanded }) =>
		isExpanded ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)'};
`;

export const ProjectIssue = styled.li`
	display: inline-flex;
	width: 100%;
	height: 32px;
	align-items: center;
	justify-content: space-between;
	gap: 4px;
	padding: 4px 8px;
	border-radius: 6px;
	cursor: pointer;
	transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

	&:first-of-type {
		margin-top: 8px;
	}

	& div:first-of-type {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	& div:last-of-type {
		flex-shrink: 0;
	}

	&:hover {
		background-color: var(--rs-color-background-page-faded);
	}
`;

export const TableBody = styled.div`
	position: relative;
`;

export const Days = styled.div`
	display: flex;
	height: 100%;

	& div:last-of-type {
		border: none;
	}
`;

export const Day = styled.div`
	width: 28px;
	height: 100%;
	border-right: 1px solid var(--rs-color-border-neutral-faded);

	&.weekend {
		background: url('/assets/resource-planning/weekend-bg.svg');
		background-size: contain;
		border-color: transparent;

		& + .weekend {
			border-color: var(--rs-color-border-neutral-faded);
		}
	}
`;

export const GanttItems = styled.div<{ isExpanded: boolean }>`
	overflow: hidden;
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 100%;
	max-height: ${({ isExpanded }) => (isExpanded ? '1000vh' : '0')};
	transition: ${({ isExpanded }) =>
		isExpanded ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)'};
`;

export const CommonDeadline = styled.div<{
	countDaysFromStart: number;
	countDays: number;
	showPlan?: boolean;
	showStart?: boolean;
	showEnd?: boolean;
}>`
	position: absolute;
	left: ${({ countDaysFromStart }) => `${28 * countDaysFromStart}px`};
	width: ${({ countDays }) => `${28 * countDays}px`};
	height: 2px;
	top: 26px;
	background-color: ${({ showPlan }) =>
		showPlan ? 'var(--rs-color-border-neutral-faded)' : 'var(--rs-color-foreground-primary)'};
	z-index: ${({ showPlan }) => (showPlan ? 2 : 3)};

	&::before {
		content: ${({ showPlan, showStart }) => (showPlan && !showStart ? 'none' : '""')};
		width: 8px;
		height: 8px;
		transform: rotate(-45deg);
		position: absolute;
		background-color: ${({ showPlan }) =>
			showPlan ? 'var(--rs-color-border-neutral-faded)' : 'var(--rs-color-foreground-primary)'};
		top: -3px;
		left: 0px;
	}

	&::after {
		content: ${({ showPlan, showEnd }) => (showPlan && !showEnd ? 'none' : '""')};
		width: 8px;
		height: 8px;
		transform: rotate(-45deg);
		position: absolute;
		background-color: ${({ showPlan }) =>
			showPlan ? 'var(--rs-color-border-neutral-faded)' : 'var(--rs-color-foreground-primary)'};
		top: -3px;
		right: 0;
	}
`;

export const GanttItem = styled.div.attrs(
	({
		countDays,
		countDaysFromStart,
		isFinished,
		isDeleted,
		isHovered,
		activeItem,
		index,
		itemId,
	}: IGanttItemStyled) => ({
		style: {
			width: `${28 * countDays}px`,
			backgroundColor: isDeleted
				? 'var(--rs-color-background-page-faded)'
				: isFinished
				? '#50ba68'
				: (isHovered && !activeItem) || activeItem === itemId
				? 'var(--rs-color-foreground-primary)'
				: '#ffbca6',
			top: `${48 + 32 * index}px`,
			left: `${28 * countDaysFromStart}px`,
			justifyContent: activeItem && activeItem !== itemId ? 'flex-start' : 'flex-end',
			pointerEvents: isDeleted ? 'none' : 'auto',
		},
	})
)<IGanttItemStyled>`
	transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	position: absolute;
	height: 24px;
	cursor: pointer;
	border-radius: 6px;
	display: flex;
	align-items: center;
	padding: 4px;
	z-index: 2;
`;

export const GanttItemPlanMore = styled.div<{
	countDays: number | null;
	countDaysFromStart: number;
	index: number;
}>`
	background-color: var(--rs-color-background-neutral-faded);
	width: ${({ countDays }) => (countDays ? `${28 * (countDays || 0)}px` : 0)};
	height: 24px;
	border: 1px dashed var(--rs-color-border-neutral-faded);
	border-radius: 6px;
	position: absolute;
	top: ${({ index }) => `${48 + 32 * index}px`};
	left: ${({ countDaysFromStart }) => `${28 * countDaysFromStart}px`};
	z-index: 0;
`;

export const GanttItemPlanLess = styled.div<{
	countDays: number | null;
	countDaysFromStart: number;
	index: number;
}>`
	background-color: transparent;
	width: ${({ countDays }) => (countDays ? `${28 * (countDays || 0)}px` : 0)};
	height: 24px;
	border: 1px dashed var(--rs-color-foreground-primary);
	border-left: none;
	border-radius: 6px;
	position: absolute;
	top: ${({ index }) => `${48 + 32 * index}px`};
	left: ${({ countDaysFromStart }) => `${28 * countDaysFromStart}px`};
	z-index: 3;
`;
