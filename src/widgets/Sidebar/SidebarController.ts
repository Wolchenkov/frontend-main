import React, { UIEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useGetGroupsQuery } from '../../store/groups/groupsApi';
import { useToggle } from 'reshaped/bundle';
import { useGetUserQuery } from '../../store/auth/authApi';
import { UserRole } from '../../shared/utility/Constants/userRole';
import { useGetNotificationsQuery } from '../../store/notifications/notificationsApi';

export const OTHER_LINKS = [
	{
		link: '/my-work',
		icon: 'task',
		text: 'Моя работа',
		access: [UserRole.ADMIN, UserRole.MANAGER, UserRole.MEMBER, UserRole.UNITMASTER],
	},
	{
		link: '/teams',
		icon: 'group',
		text: 'Команды',
		access: [UserRole.ADMIN, UserRole.UNITMASTER],
	},
	{
		link: '/resource-planning',
		icon: 'pulse',
		text: 'Ресурсное планирование',
		access: [UserRole.ADMIN, UserRole.MANAGER, UserRole.UNITMASTER],
	},
	{
		link: '/reports',
		icon: 'bar-chart',
		text: 'Отчеты',
		access: [UserRole.ADMIN, UserRole.MANAGER, UserRole.UNITMASTER],
	},
	{
		link: '/management',
		icon: 'admin',
		text: 'Администрирование',
		access: [UserRole.ADMIN],
	},
];

export function useSidebarController() {
	const [groups, setGroups] = useState<Group[] | never[]>([]);
	const [activeGroups, setActiveGroups] = useState<any>([]);
	const [showTopDivider, setShowTopDivider] = useState<boolean>(false);
	const [showBottomDivider, setShowBottomDivider] = useState<boolean>(false);
	const { pathname } = useRouter();
	const scrollElement = useRef() as React.MutableRefObject<HTMLInputElement>;
	const { data: user } = useGetUserQuery();
	const { data: currentGroups } = useGetGroupsQuery();
	const router = useRouter();
	const { slug } = router.query;
	const { active, activate, deactivate } = useToggle(false);

	useEffect(() => {
		if (currentGroups) {
			setGroups(currentGroups);
		}
	}, [currentGroups]);

	useEffect(() => {
		setTimeout(() => {
			if (scrollElement.current.scrollHeight > scrollElement.current.clientHeight) {
				setShowBottomDivider(true);
			} else setShowBottomDivider(false);
		}, 500);
	}, [activeGroups.length, currentGroups]);

	const changeProjectActivity = (id: number): void => {
		if (activeGroups.find((group: Group) => group.id === id)) {
			setActiveGroups((prevState: Group[]) => prevState.filter((group) => group.id !== id));
		} else {
			if (groups) {
				setActiveGroups((prevState: Group[]) => [...prevState, groups.find((group) => group.id === id)]);
			}
		}
	};

	const onListScroll = (e: UIEvent<HTMLDivElement>) => {
		if (e) {
			if (e.currentTarget.scrollTop > 0) {
				setShowTopDivider(true);
			} else setShowTopDivider(false);

			if (e.currentTarget.offsetHeight + e.currentTarget.scrollTop >= e.currentTarget.scrollHeight) {
				setShowBottomDivider(false);
			} else setShowBottomDivider(true);
		}
	};

	// notifications
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
	const { data: notifications, refetch: refetchNotifications } = useGetNotificationsQuery();
	const [notificationsData, setNotificationsData] = useState<INotifications>();

	useEffect(() => {
		notifications && setNotificationsData(notifications);
	}, [notifications]);

	function hasUnreadNotification(notifications: INotifications): boolean {
		return Object.values(notifications).some((notificationArray) =>
			notificationArray.some((notification) => !notification.is_read)
		);
	}

	return {
		onListScroll,
		changeProjectActivity,
		pathname,
		showTopDivider,
		scrollElement,
		groups,
		activeGroups,
		slug,
		activate,
		active,
		deactivate,
		showBottomDivider,
		user,
		isNotificationsOpen,
		setIsNotificationsOpen,
		notificationsData,
		hasUnreadNotification,
		refetchNotifications,
	};
}
