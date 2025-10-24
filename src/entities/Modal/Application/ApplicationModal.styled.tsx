import { Modal, TextArea } from 'reshaped/bundle';
import styled from 'styled-components';

export const ApplicationModal = styled(Modal)`
	overflow: visible;
`;

export const ApplicationCommentWrap = styled.div`
	padding: 0 16px;
`;

export const ApplicationComment = styled(TextArea)`
	width: 100%;
	font-family: 'Inter', sans-serif;
	font-size: 14px;
	line-height: 20px;
	font-weight: 400;
	letter-spacing: -0.02em;
	caret-color: #ff6633;

	textarea {
		max-height: 72px;
		min-height: 72px;
		resize: none;
	}

	textarea:focus,
	textarea:active {
		border-color: #cfd0d3 !important;
		box-shadow: none !important;
	}
`;
