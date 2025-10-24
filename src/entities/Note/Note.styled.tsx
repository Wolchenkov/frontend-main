import styled from 'styled-components';
import { Overlay } from 'reshaped/bundle';
import { CustomTextInput } from '..';

export const NoteContainer = styled(Overlay)`
	background: white;
	z-index: 5;
	height: 100vh;

	& > div {
		padding: 20px;

		&::after {
			content: none !important;
		}
	}

	& > div > div {
		height: 100%;
		color: var(--rs-color-foreground-neutral-faded);
		text-align: left !important;
	}
`;

export const EditorContainer = styled('div')`
	height: calc(100% - 132px);
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
		background-color: #cfd0d3;
	}

	& .ce-toolbar__content,
	.ce-block__content {
		max-width: 548px;
	}
`;

export const NoteButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const NoteHeader = styled.div`
	margin: 32px auto 16px;
	max-width: 548px;
`;

export const NoteAdditionalInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	color: #898b8f;
`;

export const NoteName = styled(CustomTextInput)`
	margin-top: 8px;
	font-size: 32px;
	font-weight: 700;
	line-height: 40px;
	letter-spacing: -0.64px;

	&::placeholder {
		color: #d2d5db;
	}
`;
