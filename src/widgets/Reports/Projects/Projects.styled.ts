import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const LoaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: calc(100vh - 175px);
	gap: 20px;
`;

export const MyText500 = styled(Text)`
	letter-spacing: -0.01em;
	font-weight: 500;
	line-height: 20px;
`;

export const TableContainer = styled.div`
	max-width: 1600px;
	width: 100%;
	margin: auto;
	overflow: auto;
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar {
		width: 4px;
		background-color: transparent;
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(207, 208, 211, 0.5);
	}
`;

export const Table = styled.div`
	width: 100%;
	min-width: 1150px;
`;
export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0px 96px 0px 42px;
`;

export const HeaderText = styled(Text)`
	display: flex;
	letter-spacing: -0.01em;
	font-weight: 500;
	padding: 0px 8px 4px;
	flex-shrink: 0;
`;

export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 20px 0px 18px;
`;

export const ProjectNameContainer = styled.div`
	display: flex;
	padding: 12px 8px 12px 4px;
	align-items: center;
	gap: 8px;
	width: 304px;
	white-space: nowrap;
`;

export const ClientNameContainer = styled.div`
	width: 158px;
	padding: 12px 8px;
	white-space: nowrap;
`;

export const ActualTimeContainer = styled.div`
	width: 126px;
	display: flex;
	padding: 12px 8px;
	justify-content: center;
	align-items: center;
`;

export const FlexEndContainer = styled.div`
	width: 126px;
	display: flex;
	padding: 12px 8px;
	justify-content: end;
	align-items: center;
`;

export const BalanceAndProgressContainer = styled.div`
	display: flex;
	gap: 16px;
`;

export const ProgressContainer = styled.div`
	display: flex;
	align-items: center;
	width: 60px;
`;

export const TypeWorkContainer = styled.div<{ active: boolean }>`
	overflow: hidden;
	max-height: ${(props) => (props.active ? '1000vh' : 0)};
	transition: ${(props) => (props.active ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)')};
`;

export const LazyLoadingContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	padding-top: 10px;
`;
