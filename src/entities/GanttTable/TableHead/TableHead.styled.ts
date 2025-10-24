import styled from 'styled-components';

export const TableHead = styled.div`
	border-top: 1px solid var(--rs-color-border-neutral-faded);
	border-bottom: 1px solid var(--rs-color-border-neutral-faded);
	display: flex;
	width: fit-content;
	position: sticky;
	top: 0;
	background-color: var(--rs-color-background-base);
	z-index: 5;

	& > div:last-of-type div {
		border-right: 0;
	}
`;

export const Stage = styled.div`
	flex-shrink: 0;
	display: flex;
	align-items: flex-end;
	width: 395px;
	padding-left: 20px;
	padding-bottom: 4px;
	position: sticky;
	left: 0;
	background-color: var(--rs-color-background-base);
	border-right: 1px solid var(--rs-color-border-neutral-faded);

	& > div {
		line-height: 20px;
		color: #898b8f;
	}
`;

export const Month = styled.div`
	display: flex;
	flex-direction: column;

	& > div {
		height: 28px;
		color: #898b8f;
	}
`;

export const MonthName = styled.div`
	padding-left: 8px;
	display: flex;
	align-items: center;
	border-right: 1px solid var(--rs-color-border-neutral-faded);
`;

export const Days = styled.div`
	display: flex;
	border-top: 1px solid var(--rs-color-border-neutral-faded);

	& > div {
		width: 28px;
		display: flex;
		align-items: center;
		justify-content: center;

		&:last-of-type {
			border-right: 1px solid var(--rs-color-border-neutral-faded);
		}
	}
`;
