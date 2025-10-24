import React, { FC, useEffect, useState } from 'react';
import { Button, Divider, Switch, Text } from 'reshaped/bundle';
import { useChangeUserNotificationSettingsMutation } from '../../../store/auth/authApi';
import * as S from './NotificationSettings.styled';

const switcherOptions = [
	{ name: 'sendToTelegram', label: 'Отправить выбранные уведомления в Telegram' },
	{ name: 'sendToMail', label: 'Отправить выбранные уведомления на почту' },
];

interface INotificationSettingsProps {
	userNotificationSettings: IMemberNotificationSettings | undefined;
	refetchNotificationSettings: any;
}
export const NotificationSettings: FC<INotificationSettingsProps> = ({
	userNotificationSettings,
	refetchNotificationSettings,
}) => {
	const [notification, setNotification] = useState<{ [key: string]: { enabled: boolean; id: number } }>();

	useEffect(() => {
		if (userNotificationSettings) {
			setNotification({
				...userNotificationSettings.notifications.reduce(
					(acc, item) => ({ ...acc, [item.name]: { enabled: item.enabled, id: item.id } }),
					{}
				),
				...userNotificationSettings.notificationSettings.reduce(
					(acc, item) => ({ ...acc, [item.name]: { enabled: item.enabled, id: item.id } }),
					{}
				),
			});
		}
	}, [userNotificationSettings]);

	const [changeNotificationSettings] = useChangeUserNotificationSettingsMutation();
	function handleSwitchChange(name: string, value: boolean) {
		if (notification) {
			setNotification({ ...notification, [name]: { ...notification[name], enabled: value } });
			changeNotificationSettings({ id: notification[name].id, enabled: value }).then(() =>
				refetchNotificationSettings()
			);
		}
	}

	function handleClick() {
		window.open('https://t.me/BraveManagerBot', '_blank');
	}

	return (
		<>
			<S.TextLS002 variant='title-3' attributes={{ style: { marginBottom: 16 } }}>
				Уведомления
			</S.TextLS002>
			<S.TextLS002 variant='body-2' color='neutral-faded' attributes={{ style: { marginBottom: 32 } }}>
				В данном разделе вы можете настроить уведомления,
				<br />
				которые будут вам приходить
			</S.TextLS002>
			<S.MainSwitcherContainer>
				{switcherOptions.map((option) => (
					<S.SwitcherContainer key={option.name}>
						<Switch
							checked={notification?.[option.name]?.enabled ?? false}
							name={option.name}
							onChange={({ name, checked }) => {
								handleSwitchChange(name, checked);
							}}
						/>
						<Text variant='caption-1' attributes={{ style: { letterSpacing: '-0.01em', fontWeight: 500 } }}>
							{option.label}
						</Text>
					</S.SwitcherContainer>
				))}
				<Divider attributes={{ style: { marginBottom: '16px' } }} />
				<S.TextLS002 variant='body-2' color='neutral-faded'>
					Чтобы получать выбранные уведомления в Telegram,
					<br />
					перейдите в бот
				</S.TextLS002>
				<Button onClick={handleClick} size='small' color='primary' attributes={{ style: { width: 112 } }}>
					<S.TextLS002 variant='body-medium-2'>Перейти в бот</S.TextLS002>
				</Button>
			</S.MainSwitcherContainer>
		</>
	);
};
