import { FC } from 'react';
import { Icon, Tabs, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import styled from 'styled-components';

interface IProfileTabs {
	handleTabChange: ({ value }: { value: string }) => void;
}

export const TabsContainer = styled.div`
	position: absolute;
	left: 20px;
	top: 40px;
`;

export const ProfileTabs: FC<IProfileTabs> = ({ handleTabChange }) => {
	return (
		<TabsContainer>
			<Tabs variant='pills' direction='column' onChange={handleTabChange}>
				<Tabs.List>
					<Tabs.Item value='myDetails'>
						<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
							<Icon size={4} svg={<SvgComponent name='user' />} />
							<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								{'Мои данные'}
							</Text>
						</div>
					</Tabs.Item>
					<Tabs.Item value='notifications'>
						<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
							<Icon size={4} svg={<SvgComponent name='notification-3-line-black' />} />
							<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								{'Уведомления'}
							</Text>
						</div>
					</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</TabsContainer>
	);
};
