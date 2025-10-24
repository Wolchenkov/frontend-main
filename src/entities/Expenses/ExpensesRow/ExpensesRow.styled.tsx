import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const TruncatedText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 100%;
	display: block;
`;
export const MyTr = styled.tr<{ hover: boolean }>`
	background-color: ${(props) => props.hover && '#F8F8F8'};
`;
export const FlexContainerAlignItems = styled.div`
	display: flex;
	align-items: center;
`;

export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 20px;
`;
export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
