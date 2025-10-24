import { FC } from 'react';
import { Button, Divider, DropdownMenu, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './ProjectTimer.styled';
import { useProjectTimerContoller } from './ProjectTimerController';
import { OneTimer } from './OneTimer/OneTimer';

interface IProjectTimer {
	user: IMember;
	refetchUser: any;
}

export const ProjectTimer: FC<IProjectTimer> = ({ refetchUser, user }) => {
	const { runningTimer, timers, active, activate, deactivate, timerHours, timerMinutes, onSwitchTimerFunc } =
		useProjectTimerContoller({
			refetchUser,
		});

	return (
		<>
			{runningTimer || (timers && timers.length > 0) ? (
				<DropdownMenu position='bottom-end' width='438px' active={active} onClose={deactivate}>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<Button
								{...attributes}
								size='small'
								variant='outline'
								color='primary'
								endIcon={<SvgComponent name='time-line-primary' />}
								attributes={{ style: { border: 'none' } }}
								onClick={active ? deactivate : activate}
							>
								{runningTimer ? (
									<>
										<span>{timerHours()}</span>
										<S.TimerDotted running={runningTimer?.isRunning}>:</S.TimerDotted>
										<span>{timerMinutes()}</span>
									</>
								) : null}
							</Button>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<S.ContentHeader>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Таймер
							</Text>
							<SvgComponent
								onClick={deactivate}
								style={{ cursor: 'pointer', pointerEvents: 'all' }}
								name='close-line'
							/>
						</S.ContentHeader>
						<Divider />
						<S.ContentWrapper>
							{timers &&
								timers.map((timer) => (
									<OneTimer
										key={timer.project_issue_id}
										timer={timer}
										onSwitchTimerFunc={onSwitchTimerFunc}
										refetchUser={refetchUser}
										user={user}
									/>
								))}
						</S.ContentWrapper>
					</DropdownMenu.Content>
				</DropdownMenu>
			) : // <Button variant='ghost' startIcon={<SvgComponent name='timer' />} size='small' />
			null}
		</>
	);
};
