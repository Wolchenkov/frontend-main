import styled from 'styled-components';
import { Actionable } from 'reshaped/bundle';

export const TableHead = styled.div`
	display: flex;
	width: fit-content;
	position: sticky;
	top: 0;
	background: var(--rs-color-background-page);
	z-index: 2;
	cursor: default;
`;

export const TableHeadColumn = styled.div`
	flex-shrink: 0;

	&:first-of-type {
		width: 304px;
		background: var(--rs-color-background-page);
		z-index: 1;
		position: sticky;
		left: 0;
		top: 0;

		& > div {
			padding-left: 20px;
			border-right: 1px solid var(--border-neutral-faded, #e5e7ea);

			&:last-of-type {
				border-bottom: 1px solid var(--border-neutral-faded, #e5e7ea);
			}
		}
	}

	&:not(:first-of-type) {
		color: var(--text-low-priority, #898b8f);

		& > div:first-of-type {
			padding: 0 8px;
			border-right: 1px solid var(--border-neutral-faded, #e5e7ea);
		}
	}

	&:last-of-type {
		& > div:first-of-type {
			border-right: 0;
		}
		& > div:last-of-type > div:last-of-type {
			border-right: 0;
		}
	}

	& > div {
		height: 28px;
		border-top: 1px solid var(--border-neutral-faded, #e5e7ea);
		display: flex;
		align-items: center;

		&:last-of-type {
			border-bottom: 1px solid var(--border-neutral-faded, #e5e7ea);

			& > div:last-of-type {
				border-right: 1px solid var(--border-neutral-faded, #e5e7ea);
			}
		}
	}
`;

export const Select = styled(Actionable)`
	display: flex;
	align-items: center;
	gap: 8px;
`;

export const ContentWrapper = styled.div`
	max-height: 300px;
	overflow: auto;

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar {
		width: 3px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #cfd0d3;
		border-radius: 8px;
	}

	& div {
		word-break: break-word;
	}
`;

export const Day = styled.div<{ isToday: boolean }>`
	width: 65px;
	height: 100%;
	display: flex;
	align-items: center;
	border-right: 1px solid var(--rs-color-background-page);
	color: ${({ isToday }) => (isToday ? 'var(--text-high-priority, #14171F)' : 'var(--text-low-priority, #898B8F)')};

	& > div {
		text-align: center;
		width: 100%;
	}
`;

export const DayWithSort = styled.div<{ isSortActive: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;

	& > div + div {
		display: inline-flex;
		color: ${({ isSortActive }) =>
			isSortActive ? 'var(--rs-color-background-primary)' : 'var(--rs-color-foreground-neutral-faded)'};
	}
`;
