import styled from 'styled-components';

export const File = styled.div<{ inComment?: boolean | undefined }>`
	max-width: 492px;
	white-space: nowrap;
	display: flex;
	padding: 4px 8px;
	align-items: center;
	gap: 8px;
	border-radius: 6px;
	background: ${({ inComment }) => (inComment ? 'white' : '#f4f5f7')};
	cursor: default;
	&:hover {
		background: #e9e9eb;
	}
`;

export const DeleteIcon = styled.div`
	width: 16px;
	display: flex;
	cursor: pointer;
	align-items: center;
`;
