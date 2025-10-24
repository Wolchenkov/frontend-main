import { Dispatch, FC, SetStateAction } from 'react';
import { Tabs, Text } from 'reshaped/bundle';
import { REPOTRS_TABS } from '../ReportsController';

interface IMainTabsProps {
	setMainTabValue: Dispatch<
		SetStateAction<{
			name: string;
			text: string;
		}>
	>;
}

export const MainTabs: FC<IMainTabsProps> = ({ setMainTabValue }) => {
	const handleMainTabChange = (obj: { value: string }): void => {
		const newValue = REPOTRS_TABS.find(({ name }) => name === obj.value);
		if (newValue) {
			setMainTabValue(newValue);
		}
	};

	return (
		<Tabs variant='pills' onChange={handleMainTabChange}>
			<Tabs.List>
				{REPOTRS_TABS.map((tab) => (
					<Tabs.Item key={tab.name} value={tab.name}>
						<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							{tab.text}
						</Text>
					</Tabs.Item>
				))}
			</Tabs.List>
		</Tabs>
	);
};
