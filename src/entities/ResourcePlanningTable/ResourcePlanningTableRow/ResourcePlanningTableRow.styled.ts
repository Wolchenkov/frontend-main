import styled from 'styled-components';

export const Row = styled.div<{ height?: number; isLast?: boolean }>`
	display: flex;
	width: fit-content;
	min-height: 49px;
	flex-shrink: 0;
	height: ${({ height }) => (height ? `${height}px` : '49px')};
	border-bottom: ${({ isLast }) => (isLast ? '1px solid var(--rs-color-border-neutral-faded)' : 'none')};
	&.expanded {
		border-bottom: 1px solid var(--rs-color-border-neutral-faded);
		& div {
			border-bottom: none;
		}
	}
	& > div {
		border-bottom: ${({ isLast }) => (isLast ? 'none' : '1px solid var(--rs-color-border-neutral-faded)')};
	}
`;

export const RowCell = styled.div<{
	isWorkDay?: boolean;
	isDayOff?: boolean;
	isEmpty?: boolean;
	overtime?: boolean;
	ontime?: boolean;
	allTasksEstimated?: boolean;
}>`
	display: flex;
	align-items: center;
	gap: 4px;
	flex-shrink: 0;
	color: var(--text-middle-priority, #52555d);

	&:nth-of-type(1) {
		position: sticky;
		left: 0;
		z-index: 1;
		background: var(--rs-color-background-page);
		width: 304px;
		padding: 0 20px;
		border-right: 1px solid var(--border-neutral-faded, #e5e7ea);
	}

	${({ isWorkDay }) =>
		!isWorkDay &&
		`&:nth-of-type(n + 2) + :nth-of-type(n + 2) {
			border-right: 1px solid white;
		}`};

	&:nth-of-type(n + 2) {
		width: 65px;
		border-right: ${({ isWorkDay }) => (!isWorkDay ? 'none' : '1px solid white')};
		border-bottom: ${({ isWorkDay }) => (!isWorkDay ? 'none' : '1px solid white')};

		& > div {
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			padding: ${({ isWorkDay }) => (!isWorkDay ? '0' : '0 20px')};

			border-radius: ${({ isWorkDay }) => (!isWorkDay ? '0' : '6px')};

			background: ${({ isWorkDay, isDayOff, isEmpty, overtime, allTasksEstimated, ontime }) =>
				!isWorkDay
					? 'url("/assets/resource-planning/weekend-bg.svg")'
					: isDayOff
					? 'var(--rs-color-background-page)'
					: overtime && allTasksEstimated
					? '#FEF3F4'
					: overtime && !allTasksEstimated
					? 'url("/assets/resource-planning/not-estimated-cell-overtime.svg") #FEF3F4'
					: ontime && allTasksEstimated
					? 'var(--rs-color-background-page-faded)'
					: ontime && !allTasksEstimated
					? 'url("/assets/resource-planning/not-estimated-cell-ontime.svg") var(--rs-color-background-page-faded)'
					: !isEmpty && !allTasksEstimated
					? 'url("/assets/resource-planning/not-estimated-cell.svg") var(--rs-color-background-page)'
					: 'var(--rs-color-background-page)'};
			color: ${({ overtime, isEmpty, isDayOff }) =>
				isDayOff ? '#D2D5DB' : overtime ? '#E52020' : isEmpty ? '#898B8F' : 'inherit'};
		}
	}
`;

export const Arrow = styled.div<{ showProjectIssues?: boolean }>`
	transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	width: 16px;
	height: 16px;
	cursor: pointer;
	transform: ${({ showProjectIssues }) => (showProjectIssues ? 'rotate(90deg)' : 'rotate(0eg)')};
`;
