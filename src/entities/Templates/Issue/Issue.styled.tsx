import styled from 'styled-components';

export const Issue = styled.div<{ isHovered: boolean }>`
	position: relative;
	padding: 12px 8px;
	background-color: ${({ isHovered }) => isHovered && '#F8F8F8'};
	border-bottom: 1px solid #e5e7ea;

	&:first-child {
		border-top: 1px solid #e5e7ea;
	}
`;
