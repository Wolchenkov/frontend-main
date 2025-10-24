import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const RateContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 68px;
	height: 28px;
	align-items: center;
	gap: 6px;
	margin-right: 3px;
`;
export const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
export const Container = styled.div<{ backgroundColor: boolean }>`
	background-color: ${(props) => (props.backgroundColor ? '#F8F8F8' : '#FFFFFF')};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 20px;
`;
