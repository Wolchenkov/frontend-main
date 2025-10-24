import styled from 'styled-components';

export const TrashItem = styled.li<{ hovered?: boolean }>`
	display: grid;
	grid-template-columns: auto 1fr 44px;
	gap: 4px;
	align-items: center;
	padding: 8px 0 8px 8px;
	min-height: 45px;
	border-bottom: 1px solid #e5e7ea;
	background-color: ${(props) => props.hovered && '#E9E9EB'};
	transition: background-color 0.3s ease;

	&:nth-child(1),
	&:nth-child(2) {
		min-height: 46px;
		border-top: 1px solid #e5e7ea;
	}

	.Trash_TrashButton {
		opacity: ${(props) => (props.hovered ? '1' : '0')};
	}
`;
