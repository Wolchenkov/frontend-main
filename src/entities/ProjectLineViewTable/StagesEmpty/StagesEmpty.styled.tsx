import styled from 'styled-components';
import { Button, Text } from 'reshaped/bundle';

export const StagesEmpty = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 125px;
`;

export const StagesEmptyTitle = styled(Text)`
	margin-bottom: 4px;
	font-weight: 600;
	letter-spacing: -0.02em;
`;

export const StagesEmptyText = styled(Text)`
	margin-bottom: 20px;
	letter-spacing: -0.02em;
`;

export const StagesEmptyButton = styled(Button)`
	width: 132px;
	letter-spacing: -0.02em;
`;

export const BtnAdd = styled(Button)`
	border: 1px dashed #e5e7ea;
`;

export const BtnWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`;

export const TextLS002 = styled(Text)`
	letter-spacing: -0.02em;
`;
