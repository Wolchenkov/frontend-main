import styled from 'styled-components';

export const FiltersWrapper = styled.div`
	border-top: 1px solid var(--border-neutral-faded, #e5e7ea);
	border-bottom: 1px solid var(--border-neutral-faded, #e5e7ea);
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 -20px;
	padding: 0 20px;
	gap: 6px;

	& > div {
		display: flex;
		align-items: center;
	}
`;
