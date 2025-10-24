/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC, Dispatch, SetStateAction } from 'react';
import * as S from './Panel.styled';
import { Button, Tabs, Text } from 'reshaped/bundle';
import { MY_WORK_TABS, MyWorkTab } from '../MyWorkController';
import { SvgComponent } from '../../../shared';
import { UserRole } from '../../../shared/utility/Constants/userRole';
import { IntervalSwitcher } from '../../Reports/IntervalSwitcher/IntervalSwitcher';

interface IMyWorkPanelProps {
	user: IMember;
	activeTab: MyWorkTab;
	changeTab: ({ value }: { value: string }) => void;
	dateInterval: IHistoryInterval | null;
	setDateInterval: Dispatch<SetStateAction<IHistoryInterval | null>>;
	activateApplicationModal: () => void;
}

export const MyWorkPanel: FC<IMyWorkPanelProps> = ({
	user,
	activeTab,
	changeTab,
	dateInterval,
	setDateInterval,
	activateApplicationModal,
}) => {
	return (
		<S.Panel>
			<Tabs variant='pills' onChange={changeTab} value={activeTab.name}>
				<Tabs.List>
					{MY_WORK_TABS.map(({ name, text, icon }) => {
						if (
							name === 'approval' &&
							!(user.role?.name === UserRole.ADMIN || user.role?.name === UserRole.UNITMASTER)
						) {
							return;
						}
						return (
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
						);
					})}
				</Tabs.List>
			</Tabs>

			{activeTab.name === 'schedule' ? (
				<IntervalSwitcher
					reportsInterval={dateInterval}
					intervalValues={['Неделя']}
					value={'Неделя'}
					setReportsInterval={setDateInterval}
					setValue={() => {}}
				/>
			) : activeTab.name === 'readiness' ? (
				<Button
					color='primary'
					startIcon={<SvgComponent name='add-white' />}
					size='small'
					onClick={activateApplicationModal}
					attributes={{ style: { letterSpacing: '-0.02em' } }}
				>
					Запись
				</Button>
			) : (
				<></>
			)}
		</S.Panel>
	);
};
