import styled from 'styled-components';

export const Row = styled.div`
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

	& > div {
		flex-shrink: 0;

		&:nth-child(1) {
			flex-grow: 1;
			flex-shrink: 1;
			overflow: hidden;
		}

		&:nth-child(2) {
			width: 10%;
			display: flex;
			justify-content: center;
		}

		&:nth-child(3) {
			width: 20%;
			display: flex;
			justify-content: center;
		}

		&:nth-child(4) {
			width: 30%;
		}

		&:nth-child(5) {
			width: 56px;
		}
	}
`;

export const NameColumn = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
