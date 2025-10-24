import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	width: 266px;
	padding: 12px 20px;
	flex-direction: column;
	align-items: flex-start;
	gap: 44px;

	border-radius: 6px;
	border: 1px solid var(--border-neutral-faded, #e5e7ea);
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
`;

export const Footer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	align-self: stretch;
`;
