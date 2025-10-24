import React, { FC, useState } from 'react';
import * as S from './Profile.styled';
import { Button, Divider, Text, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import { useGetUserNotificationSettingsQuery, useGetUserQuery, useLogoutMutation } from '../../store/auth/authApi';
import { ProfileTabs } from './Tabs/ProfileTabs';
import { ProfileDetailForm } from './DetailForm/ProfileDetailForm';
import { UserAvatar } from './Avatar/Avatar';
import { NotificationSettings } from './NotificationSettings/NotificationSettings';
import { ConfirmModal } from '../../entities';

export const Profile: FC = () => {
	const [tabValue, setTabValue] = useState('myDetails');
	const { data: user, refetch } = useGetUserQuery();
	const { data: userNotificationSettings, refetch: refetchNotificationSettings } =
		useGetUserNotificationSettingsQuery();

	function handleTabChange({ value }: { value: string }) {
		setTabValue(value);
	}

	const {
		active: isLogoutModalActive,
		activate: activateLogoutModal,
		deactivate: deactivateLogoutModal,
	} = useToggle(false); // модалка подтверждения выхода

	const [logoutUser] = useLogoutMutation();
	function logout() {
		logoutUser().then(() => {
			localStorage.removeItem('token');
			window.location.href = '/auth';
		});
	}
	return (
		<S.Main>
			<S.Header>
				<Text variant='title-2' attributes={{ style: { letterSpacing: '-0.015em' } }}>
					Профиль
				</Text>
				<Button variant='solid' color='white' endIcon={<SvgComponent name='logout' />} onClick={activateLogoutModal}>
					Выйти
				</Button>
				<ConfirmModal
					active={isLogoutModalActive}
					deactivate={deactivateLogoutModal}
					confirmDel={logout}
					text='Вы точно хотите выйти из своего профиля?'
				/>
			</S.Header>
			<Divider />

			<S.Container>
				<ProfileTabs handleTabChange={handleTabChange} />
				<S.MainContainer>
					{tabValue === 'myDetails' ? (
						<>
							<Text variant='title-3' attributes={{ style: { letterSpacing: '-0.02em', marginBottom: 32 } }}>
								Мои данные
							</Text>
							<UserAvatar user={user} refetch={refetch} />
							<ProfileDetailForm user={user} refetch={refetch} />
						</>
					) : (
						<NotificationSettings
							userNotificationSettings={userNotificationSettings}
							refetchNotificationSettings={refetchNotificationSettings}
						/>
					)}
				</S.MainContainer>
			</S.Container>
		</S.Main>
	);
};
