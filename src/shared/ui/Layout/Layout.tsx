import React, { FC } from 'react';
import styled from 'styled-components';
import { LayoutProps } from './Layout.props';

const LayoutWrap = styled.div`
	width: 100%;
	height: 100vh;
	padding-left: 250px;
	background: #ffffff;
`;

export const Layout: FC<LayoutProps> = ({ children }) => {
	return <LayoutWrap>{children}</LayoutWrap>;
};
