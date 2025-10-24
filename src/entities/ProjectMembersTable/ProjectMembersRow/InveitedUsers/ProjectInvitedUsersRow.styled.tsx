import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px;
`;

export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
export const LeftSide = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;
export const RightSide = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const Row = styled.div<{ hover: boolean }>`
	background-color: ${(props) => props.hover && '#F8F8F8 !important'};
`;
