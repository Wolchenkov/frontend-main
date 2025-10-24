import React, { FC } from 'react';
import { Text } from 'reshaped/bundle';
import { Tabs } from 'reshaped/bundle';
import { MANAGEMENT_TABS, ManagementTab } from '../ManagementController';
import { SvgComponent } from '../../../shared';

interface IManagementPanelProps {
	activeTab: ManagementTab;
	changeTabChange: ({ value }: { value: string }) => void;
}

export const ManagementPanel: FC<IManagementPanelProps> = ({ activeTab, changeTabChange }) => {
	return (
		<Tabs direction='column' variant='pills' onChange={changeTabChange} value={activeTab.name}>
			<Tabs.List>
				{MANAGEMENT_TABS.map(({ name, text, icon }) => (
					<Tabs.Item
						key={name}
						icon={<SvgComponent name={icon} />}
						value={name}
						attributes={{ style: { marginBottom: '4px' } }}
					>
						<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							{text}
						</Text>
					</Tabs.Item>
				))}
			</Tabs.List>
		</Tabs>
	);
};
