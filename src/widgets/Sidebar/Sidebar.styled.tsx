import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const SidebarTop = styled.div`
	display: flex;
	align-items: center;
	column-gap: 22px;
`;

export const SidebarMainProject = styled.div`
	display: flex;
	align-items: center;
	column-gap: 144px;
	margin-bottom: 8px;
`;

export const SidebarInnerLinks = styled.div`
	padding-inline: 12px;
	margin-top: 12px;
`;

export const SidebarWrap = styled.aside`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 250px;
	padding: 12px 12px 90px;
	background: #f8f8f8;
`;

export const SidebarProfile = styled.div<{ active: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
	border-radius: 6px;
	background: ${(props) => props.active && '#D7D8DB'};
	text-decoration: none;
	cursor: pointer;
	&:hover {
		background: ${(props) => (props.active ? '#D7D8DB' : '#E9E9EB')};
	}
`;

export const SidebarBottom = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 250px;
	padding: 12px;
	background: #f8f8f8;
`;

export const SidebarLogo = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 3px;
	padding: 8px;
	text-decoration: none;
	cursor: pointer;
`;

export const SidebarButtonProject = styled.button`
	background: transparent;
	width: 100%;
	border: none;
	padding: 0;
	outline: none;
	margin: 0;
`;

export const SidebarMiddle = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SidebarOutWrap = styled.div`
	padding: 5px 0 0;
`;

export const SidebarProjectList = styled.ul<{ active: boolean }>`
	margin: 0 0 0 20px;
	padding: 0;
	list-style: none;
	overflow: hidden;
	max-height: ${(props) => (props.active ? '1000vh' : 0)};
	transition: ${(props) => (props.active ? 'max-height 1s ease-in-out' : 'max-height 0.5s cubic-bezier(0, 1, 0, 1)')};
`;

export const SidebarProjectLink = styled.a<{ active: boolean }>`
	display: block;
	margin: 4px 0;
	padding: 4px 8px;
	border-radius: 6px;
	text-decoration: none;
	cursor: pointer;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #14171f;
	background-color: ${(props) => props.active && '#D7D8DB'};

	&:hover {
		background-color: #e9e9eb;
	}
`;

export const SidebarProject = styled.div`
	margin-bottom: 4px;
	margin-right: 4px;
`;

export const SidebarMainList = styled.div`
	max-height: calc(100vh - 400px); // было -370 и корзину не было видно на тесте
	overflow-y: auto;
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

export const SidebarLinksWrapper = styled.div`
	position: relative;
	margin-inline: -12px;
`;

export const SidebarProjectIconWrapper = styled.div<{ active?: boolean }>`
	transition: all 0.4s ease;
	display: flex;
	align-items: center;
	border-radius: 6px;
	background-color: ${(props) => props.active && '#D7D8DB'};

	&:hover {
		background-color: ${(props) => (props.active ? '#D7D8DB' : '#E9E9EB')};
	}

	&.SidebarProjectIconWrapper__with-p {
		padding-left: 22px;
	}
`;

export const SidebarLinkOther = styled.a<{ active?: boolean }>`
	display: flex;
	align-items: center;
	border-radius: 6px;
	cursor: pointer;
	width: 219px;
	background-color: ${(props) => props.active && '#D7D8DB'};
	margin-bottom: 4px;

	padding: 6px 8px;
	text-decoration: none;

	&.SidebarLinkOther__cart {
		margin-top: 24px;
	}

	&:hover {
		background-color: ${(props) => (props.active ? '#D7D8DB' : '#E9E9EB')};
	}
`;

export const SidebarLink = styled.a<{ active?: boolean }>`
	width: 90%;
	display: flex;
	align-items: center;
	padding: 6px 8px;
	text-decoration: none;
	transition: background-color 0.3s ease;
	cursor: ${(props) => (props.active ? 'default' : 'pointer')};
	background-color: ${(props) => props.active && '#D7D8DB'};

	${SidebarProject} & {
		margin-bottom: 0;
	}

	& + ${SidebarProject} {
		margin-top: -5px;
	}
`;

export const Text500 = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
`;
export const AvatarNameWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const TopDivider = styled.div<{ showTopDivider: boolean }>`
	height: 1px;
	width: 100%;
	background: ${({ showTopDivider }) => (showTopDivider ? '#E5E7EA' : 'transparent')};
	position: absolute;
	left: 0;
	top: 112px;
`;

export const BottomDivider = styled.div<{ showBottomDivider: boolean }>`
	height: 1px;
	width: 100%;
	background: ${({ showBottomDivider }) => (showBottomDivider ? '#E5E7EA' : 'transparent')};
`;
