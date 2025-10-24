import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Row = styled.div<{ hover: boolean; active: boolean }>`
	background-color: ${(props) => (props.active ? '#E9E9EB' : props.hover && '#F8F8F8')};
`;
export const MainContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px;
`;

export const LeftSide = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
`;
export const RightSide = styled.div`
	height: 28px;
`;
export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
