import styled from 'styled-components';

export const TemplatesHeader = styled.div<{ showBottomDivider: boolean }>`
	display: flex;
	margin: 0 -20px;
	padding: 0 20px 20px;
	border-bottom: ${({ showBottomDivider }) => (showBottomDivider ? '1px solid #E5E7EA' : '1px solid transparent')};
`;

export const TemplatesHeaderLeft = styled.div`
	flex-shrink: 0;
	width: 266px;
`;

export const TemplatesHeaderRight = styled.div`
	flex-grow: 1;
	position: relative;
`;

export const TemplatesHeaderRightWrap = styled.div`
	width: 74%;
	margin: 0 auto;
`;

export const TemplatesWrap = styled.div<{ isTemplateChoice: boolean }>`
	display: flex;
	margin-top: ${({ isTemplateChoice }) => (isTemplateChoice ? '0' : '8px')};
	height: auto;
	max-height: ${({ isTemplateChoice }) => (isTemplateChoice ? 'calc(100vh - 72px)' : 'none')};
	overflow-y: ${({ isTemplateChoice }) => (isTemplateChoice ? 'auto' : 'visible')};

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

export const TemplatesLoader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100vh - 172px);
`;
