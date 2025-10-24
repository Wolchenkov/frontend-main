import { FC, useEffect } from 'react';
import * as S from './Notifications.styled';
import { Button, Link, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';

import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useReadNotificationsMutation } from '../../store/notifications/notificationsApi';

interface INotificationsProps {
	notificationsData: INotifications;
	setIsNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	refetchNotifications: any;
	readBtn: boolean;
}

function formatDate(input: string): string {
	const date = parseISO(input);
	if (isToday(date)) {
		return 'Сегодня';
	}
	if (isYesterday(date)) {
		return 'Вчера';
	}
	return format(date, 'd MMM yyyy', { locale: ru });
}
export const Notifications: FC<INotificationsProps> = ({
	notificationsData,
	setIsNotificationsOpen,
	refetchNotifications,
	readBtn,
}) => {
	function onOverlayClick(e: React.MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		setIsNotificationsOpen(false);
	}

	useEffect(() => {
		refetchNotifications();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [readAllNotifications, { isLoading }] = useReadNotificationsMutation();

	function readNotifications() {
		readAllNotifications().then(() => refetchNotifications());
	}
	return (
		<>
			<S.Container>
				<S.Header>
					<S.TextLS002 variant='body-strong-1'>Уведомления</S.TextLS002>
					<Button
						size='small'
						endIcon={<SvgComponent name='check-fill' />}
						onClick={readNotifications}
						loading={isLoading}
						disabled={!readBtn}
					>
						<S.TextLS002 variant='body-medium-2'>Прочитать все</S.TextLS002>
					</Button>
				</S.Header>
				<S.MainContainer>
					{Object.entries(notificationsData).map(([date, notifications]) => (
						<S.OneDay key={date}>
							<Text variant='caption-2' attributes={{ style: { fontWeight: 600 } }}>
								{formatDate(date)}
							</Text>
							{notifications.map(({ id, text, link, project, is_read, time, label }) => (
								<S.Notification key={id}>
									<S.NotificationHeader label={label}>
										{label && (
											<S.MyBadge variant='faded' color='primary'>
												{label.includes('Время') && <SvgComponent name='time-line-primary' />}
												<S.TextLS002 variant='caption-1' attributes={{ style: { fontWeight: 500 } }}>
													{label}
												</S.TextLS002>
											</S.MyBadge>
										)}
										{!is_read && <S.NewNotificationBadge color='primary' size='small' rounded />}
									</S.NotificationHeader>
									{text &&
										(link && !label?.includes('удален') ? (
											<div
												onClick={() => setIsNotificationsOpen(false)}
												style={{ width: 'max-content', maxWidth: '480px' }}
											>
												<Link href={link} variant='plain'>
													<S.TruncatedText variant='body-medium-2' color='neutral'>
														{text}
													</S.TruncatedText>
												</Link>
											</div>
										) : (
											<div style={{ maxWidth: '480px' }}>
												<S.TruncatedText variant='body-medium-2'>{text}</S.TruncatedText>
											</div>
										))}
									<S.NotificationFooter>
										{project && (
											<>
												<S.TextDisabled variant='caption-2'>{project}</S.TextDisabled>
												<SvgComponent name='ellipse' />
											</>
										)}
										<S.TextDisabled variant='caption-2'>{time}</S.TextDisabled>
									</S.NotificationFooter>
								</S.Notification>
							))}
						</S.OneDay>
					))}
				</S.MainContainer>
			</S.Container>
			<S.Overlay onClick={onOverlayClick} />
		</>
	);
};
