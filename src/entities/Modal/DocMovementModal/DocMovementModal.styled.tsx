import styled from 'styled-components';
import { View, Accordion } from 'reshaped/bundle';

export const TitleWrapper = styled(View)`
	justify-content: space-between;

	& > div {
		overflow: hidden;
		white-space: nowrap;
		max-width: calc(100% - 40px);

		& > div {
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
`;

export const Row = styled.div<{
	active: boolean;
	disabled: boolean;
	lastChild: boolean;
	rootFolder: boolean;
	pl: number;
	isChosen: boolean;
}>`
	height: 44px;
	padding: 12px;
	padding-left: ${(props) => (props.pl ? props.pl + 'px' : '12px')};
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
	pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
	transition: all 0.5s ease;
	background: ${(props) => (props.isChosen ? 'var(--rs-color-background-neutral)' : 'transparent')};
	opacity: ${(props) => (props.disabled ? '0.5' : '1')};

	&:hover {
		background: ${(props) => (props.isChosen ? 'var(--rs-color-background-neutral)' : 'rgba(248, 248, 248, 1)')};
	}

	& > div {
		padding-left: 4px;
	}

	& svg {
		margin-left: ${(props) => (props.lastChild && !props.rootFolder ? '24px' : '0')};
	}

	& div svg {
		transform: ${(props) => (props.active && !props.lastChild ? 'rotate(90deg)' : 'rotate(0)')};
		transition: transform 0.1s ease;
	}
`;

export const DocsStructureWrapper = styled.div`
	height: 442px;
	overflow: auto;

	/* Стилизация полосы прокрутки */
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar {
		width: 2px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #cfd0d3;
	}
`;

export const DocMovementModalAccordion = styled(Accordion)`
	border-top: 1px solid var(--rs-color-border-neutral-faded);

	& span {
		display: none;
	}
`;
