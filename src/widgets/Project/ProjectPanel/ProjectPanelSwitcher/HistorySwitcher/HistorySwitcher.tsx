import { FC } from 'react';
import { Button, DropdownMenu, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../../../shared';

import { useHistorySwitcherController } from './HistorySwitcherController';

interface IHistorySwitcherProps {
	setHistoryInterval: React.Dispatch<React.SetStateAction<IHistoryInterval | null>>;
	historyInterval: IHistoryInterval | null;
	projectStart: string | undefined;
}

const intervalValues = ['За весь период', 'День', 'Неделя', 'Месяц', 'Год'];

export const HistorySwitcher: FC<IHistorySwitcherProps> = ({ setHistoryInterval, historyInterval, projectStart }) => {
	const { triggerValue, value, setIntervalForHistory, isButtonLeftDisabled, changePeriod, isButtonRightDisabled } =
		useHistorySwitcherController({ setHistoryInterval, historyInterval, projectStart });
	return (
		<>
			<DropdownMenu width='197px' position='bottom-start'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<Button
							{...attributes}
							color='neutral'
							size='small'
							startIcon={<SvgComponent name='calendar-todo-line' />}
							attributes={{ style: { letterSpacing: '-0.02em' } }}
						>
							{triggerValue(value)}
						</Button>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{intervalValues.map((period, index) => (
						<DropdownMenu.Item
							key={index}
							size='small'
							onClick={() => {
								setIntervalForHistory(period);
							}}
						>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								{period}
							</Text>
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Content>
			</DropdownMenu>
			<Button
				disabled={isButtonLeftDisabled()}
				color='primary'
				startIcon={<SvgComponent name={`arrow-left-s-${isButtonLeftDisabled() ? 'disabled' : 'white'}`} />}
				size='small'
				onClick={() => changePeriod('prev')}
			/>
			<Button
				disabled={isButtonRightDisabled()}
				color='primary'
				startIcon={<SvgComponent name={`arrow-right-s-${isButtonRightDisabled() ? 'disabled' : 'white'}`} />}
				size='small'
				onClick={() => changePeriod('next')}
			/>
		</>
	);
};
