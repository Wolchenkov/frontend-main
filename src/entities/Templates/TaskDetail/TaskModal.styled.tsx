import styled from 'styled-components';
import { Modal, TextArea, TextField } from 'reshaped/bundle';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .tribute-container {
		border-radius: 8px;
		border: 1px solid var(--divinder, #EBEBEB);
		background: var(--bg-white, #FFF);
		box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.07), 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
		padding:4px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.1);
    z-index: 100;

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


		& ul {

			& li {
				display: flex;
				padding: 8px 12px;
				align-items: center;
				gap: 8px;
				color: #14171F;
				cursor: pointer;
				border-radius: 6px;
				&:hover{
					background:#F4F5F7
				}
			}
		}
  };

	// стиль для списка
	.cdx-list__item {
		padding: 0 !important;

	}
	// стиль для параграфа
	.ce-paragraph{

	}
	.ce-block{
		color: #14171F;
		letter-spacing: -0.02em;
		line-height: 20px !important;
		font-size: 12px;
		font-weight: 500;
	}

	// стили для текста описания
	 #editor-description {
		 .ce-paragraph {
			color: var(--text-middle-priority, #52555D);
			font-family: Inter;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: 24px; /* 171.429% */
			letter-spacing: -0.28px;
		}
	 }
`;

export const LoaderContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const TaskModal = styled(Modal)`
	overflow: visible;
	padding: 0;
`;

export const TaskModalWrapper = styled.div`
	display: flex;
	height: 100vh;
`;

export const TaskModalMainContent = styled.div`
	width: 600px;
	padding: 40px 20px;
	height: 100vh;
	overflow: auto;
	position: relative;
`;

export const TaskModalSummaryContent = styled.div`
	background-color: rgba(244, 245, 247, 1);
	padding: 20px 20px;
	width: calc(100% - 600px);
`;

export const TaskModalOptions = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 60px;
`;

export const TaskModalTopInfo = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

export const TaskModalTimerWrapper = styled.div`
	display: flex;
	margin-bottom: 36px;
	height: 36px;
`;

export const NameInput = styled(TextArea)`
	margin-bottom: 16px;

	textarea {
		min-height: 28px;
		border: none;
		outline: none;
		padding: 0;
		background-color: transparent;
		caret-color: #ff6633;
		resize: none;
		margin-bottom: 12px;

		&:focus-within {
			border-color: transparent;
			border: none;
			box-shadow: none !important;
		}

		font-size: 20px !important;
		font-style: normal;
		font-weight: 700 !important;
		line-height: 28px !important;
		color: #14171f;
		font-family: Inter;
		letter-spacing: -0.02em !important;
	}
`;
export const DescriptionInput = styled(TextArea)`
	margin-bottom: 4px;

	textarea {
		min-height: 22px;
		max-height: 80px !important;
		border: none;
		outline: none;
		padding: 0;
		background-color: transparent;
		caret-color: #ff6633;
		resize: none;
		margin-bottom: 12px;

		&:focus-within {
			border-color: transparent;
			border: none;
			box-shadow: none !important;
		}

		color: #52555d;
		font-family: Inter;
		font-size: 14px !important;
		font-style: normal;
		font-weight: 400 !important;
		line-height: 24px !important;
		letter-spacing: -0.02em !important;
	}
`;
export const CommentInput = styled(TextField)`
	border: none;
	outline: none;
	&:focus-within {
		border-color: transparent;
		border: none;
		box-shadow: none !important;
	}
	color: #52555d;
	font-family: Inter;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	letter-spacing: -0.02em;

	input {
		border: none;
		outline: none;
		padding: 0;
		background-color: transparent;
		caret-color: #ff6633;
		resize: none;

		color: #52555d;
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		letter-spacing: -0.02em;
	}
`;

export const ActionButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
	padding: 12px 0;
	cursor: pointer;
	width: 100%;
`;

export const FilesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	margin: 12px 0;
`;

export const ButtonsWrapper = styled.div<{ isFocusInComment: boolean }>`
	margin-top: 16px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 4px;
	opacity: ${(props) => (props.isFocusInComment ? 1 : 0)};
	pointer-events: ${(props) => (props.isFocusInComment ? 'auto' : 'none')};
`;

export const CommentsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 8px 0 20px;
`;
