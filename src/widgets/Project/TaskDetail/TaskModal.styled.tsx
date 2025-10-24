import styled from 'styled-components';
import { Modal } from 'reshaped/bundle';
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
//скролл
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
`;

export const TaskModalWrapper = styled.div`
	display: flex;
	height: 100vh;
`;

export const TaskModalMainContent = styled.div`
	width: 600px;
	padding: 20px 22px;
	height: 100vh;
	overflow: auto;
	position: relative;

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar {
		width: 3px;
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #cfd0d3;
		border-radius: 8px;
	}
`;

export const TaskModalSummaryContent = styled.div`
	background-color: rgba(244, 245, 247, 1);
	padding: 16px 20px;
	width: calc(100% - 600px);
`;

export const TaskModalOptions = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 14px;
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

export const NameInput = styled.textarea`
	width: 100%; /* занимает всю доступную ширину */
	margin-bottom: 16px;
	min-height: 28px; /* начальная высота */
	border: none;
	outline: none;
	padding: 0;
	background-color: transparent;
	caret-color: #ff6633;
	resize: none;
	overflow: hidden;

	&:focus {
		border-color: transparent;
		border: none;
		box-shadow: none;
	}

	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 28px;
	color: #14171f;
	font-family: Inter;
	letter-spacing: -0.02em;
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
	margin: 4px 0;
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

export const TaskModalTrackedTime = styled.div`
	background-color: rgba(233, 233, 235, 1);
	padding: 8px 4px;
	border-radius: 6px;
	font-size: 14px;
	font-weight: 500;
	color: rgba(82, 85, 93, 1);
	min-width: 82px;
	text-align: center;
	cursor: pointer;
`;
