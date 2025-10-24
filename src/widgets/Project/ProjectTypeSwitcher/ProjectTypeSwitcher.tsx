import React, { FC } from 'react';
import { Tabs } from 'reshaped/bundle';
import * as S from './ProjectTypeSwitcher.styled';
import { PROJECT_TYPES } from '../ProjectController';
import { SvgComponent } from '../../../shared';
import { HandlerObject } from '../ProjectController';

interface ProjectTypeSwitcherProps {
	tabValueType: string;
	handleTabChange: (obj: HandlerObject) => void;
}

export const ProjectTypeSwitcher: FC<ProjectTypeSwitcherProps> = ({ tabValueType, handleTabChange }) => {
	return (
		<Tabs variant='pills-elevated' itemWidth='equal' value={tabValueType} onChange={handleTabChange}>
			<S.ProjectTabList>
				{PROJECT_TYPES.map(({ type, icon }) => (
					<Tabs.Item
						key={type}
						value={type}
						attributes={{ style: { height: '24px', position: 'relative', top: '-5px' } }}
					>
						<SvgComponent name={icon} />
					</Tabs.Item>
				))}
			</S.ProjectTabList>
		</Tabs>
	);
};
