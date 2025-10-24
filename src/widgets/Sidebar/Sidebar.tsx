import React, { FC, Fragment } from 'react';
import Link from 'next/link';
import { Badge, Button, Icon, Text } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../shared';
import * as S from './Sidebar.styled';
import { useSidebarController } from './SidebarController';
import { AddGroupModal } from '../../entities/Modal/AddGroup/AddGroupModal';
import { OTHER_LINKS } from './SidebarController';
import { getInitials } from '../../shared/utility/Utils';
import { UserRole } from '../../shared/utility/Constants/userRole';
import { Notifications } from '../Notifications/Notifications';

export const Sidebar: FC = () => {
	const {
		pathname,
		changeProjectActivity,
		showTopDivider,
		showBottomDivider,
		onListScroll,
		scrollElement,
		activeGroups,
		groups,
		slug,
		activate,
		active,
		deactivate,
		user,
		isNotificationsOpen,
		setIsNotificationsOpen,
		notificationsData,
		hasUnreadNotification,
		refetchNotifications,
	} = useSidebarController();

	return (
		<>
			<S.SidebarWrap onClick={() => setIsNotificationsOpen(false)}>
				<S.SidebarTop>
					<div>
						<Link href={user?.role?.name === UserRole.CLIENT ? '/' : '/my-work'}>
							<S.SidebarLogo>
								<Icon size={6} svg={<SvgComponent name='main-logo' />} attributes={{ style: { marginRight: '5px' } }} />
								<S.Text500 variant='caption-1' color='neutral'>
									Brave Manager
								</S.Text500>
								<Text
									variant='caption-1'
									color='neutral-faded'
									as='span'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em' } }}
								>
									by aic.
								</Text>
							</S.SidebarLogo>
						</Link>
					</div>
					<div>
						<Badge.Container>
							{notificationsData && hasUnreadNotification(notificationsData) && (
								<Badge
									color='primary'
									size='small'
									rounded
									attributes={{
										style: { borderColor: 'unset', height: '13px', minWidth: '13px', left: '10px', top: '3px' },
									}}
								/>
							)}
							<Button
								variant='ghost'
								startIcon={<SvgComponent name='notification-3-line' />}
								size='small'
								onClick={(e) => {
									e.stopPropagation();
									setIsNotificationsOpen((prev) => !prev);
								}}
							/>
						</Badge.Container>
					</div>
				</S.SidebarTop>
				<S.SidebarMiddle>
					<S.SidebarOutWrap>
						<S.SidebarMainProject>
							<S.Text500 variant='caption-1' attributes={{ style: { marginLeft: '8px', color: '#898B8F' } }}>
								Группы
							</S.Text500>
							{(user?.role?.name === UserRole.ADMIN || user?.role?.name === UserRole.UNITMASTER) && (
								<Button variant='ghost' startIcon={<SvgComponent name='add' />} size='small' onClick={activate} />
							)}
							{active && <AddGroupModal active={active} onClose={deactivate} />}
						</S.SidebarMainProject>
						<S.TopDivider showTopDivider={showTopDivider} />
						<S.SidebarMainList onScroll={onListScroll} ref={scrollElement}>
							{groups &&
								groups.map((group) => (
									<S.SidebarProject key={group.id}>
										<S.SidebarProjectIconWrapper
											active={String(group.id) === slug}
											className={group.projects.length === 0 ? 'SidebarProjectIconWrapper__with-p' : ''}
										>
											{group.projects.length > 0 && (
												<Icon
													size={4}
													svg={<SvgComponent name='arrow-right-fill' onClick={() => changeProjectActivity(group.id)} />}
													attributes={{
														style: {
															marginLeft: '6px',
															transform: `${
																activeGroups.find((activeGroup: Group) => activeGroup.id === group.id)
																	? 'rotate(90deg)'
																	: 'none'
															}`,
														},
													}}
												/>
											)}
											<Link href={`/projects/${group.id}`}>
												<S.SidebarLink>
													<S.Text500
														variant='caption-1'
														color='neutral'
														attributes={{
															style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
														}}
													>
														{group.name}
													</S.Text500>
												</S.SidebarLink>
											</Link>
										</S.SidebarProjectIconWrapper>

										<S.SidebarProjectList
											active={activeGroups.find((activeGroup: Group) => activeGroup.id === group.id)}
										>
											{group.projects.map((project) => (
												<li key={`${group.id}-${project.id}`}>
													<Link href={`/project/${project.slug}`}>
														<S.SidebarProjectLink active={project.slug === slug}>
															<S.Text500 variant='caption-1' attributes={{ style: { color: 'rgba(82, 85, 93, 1)' } }}>
																{project.name}
															</S.Text500>
														</S.SidebarProjectLink>
													</Link>
												</li>
											))}
										</S.SidebarProjectList>
									</S.SidebarProject>
								))}
						</S.SidebarMainList>
					</S.SidebarOutWrap>
					<S.SidebarLinksWrapper>
						<S.BottomDivider showBottomDivider={showBottomDivider} />
						<S.SidebarInnerLinks>
							{OTHER_LINKS.map((elem) => (
								<Fragment key={elem.link}>
									{elem.access.includes(user?.role?.name as UserRole) && (
										<Link href={elem.link}>
											<S.SidebarLinkOther active={pathname === elem.link}>
												<Icon
													size={4}
													svg={<SvgComponent name={elem.icon} />}
													attributes={{ style: { marginRight: '5px' } }}
												/>
												<S.Text500 variant='caption-1' color='neutral'>
													{elem.text}
												</S.Text500>
											</S.SidebarLinkOther>
										</Link>
									)}
								</Fragment>
							))}
						</S.SidebarInnerLinks>
					</S.SidebarLinksWrapper>

					{user?.role?.name !== UserRole.CLIENT && (
						<div>
							<Link href='/trash'>
								<S.SidebarLinkOther active={pathname === '/trash'} className={`SidebarLinkOther__cart`}>
									<Icon
										size={4}
										svg={<SvgComponent name='delete-bin-faded' />}
										attributes={{ style: { marginRight: '5px' } }}
									/>
									<S.Text500 variant='caption-1' color='neutral'>
										Корзина
									</S.Text500>
								</S.SidebarLinkOther>
							</Link>
						</div>
					)}
				</S.SidebarMiddle>
				{user && (
					<S.SidebarBottom>
						<Link href='/profile'>
							<S.SidebarProfile active={pathname === '/profile'}>
								<S.AvatarNameWrapper>
									<AvatarCustom
										src={user.avatar ? user.avatar : undefined}
										color='neutral'
										initials={getInitials(user.name ? user.name : '')}
										size={6}
									/>
									<S.Text500
										variant='caption-1'
										attributes={{
											style: { marginLeft: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
										}}
									>
										{user.name}
									</S.Text500>
								</S.AvatarNameWrapper>
								<Icon size={4} svg={<SvgComponent name='arrow-right-s-min' />} />
							</S.SidebarProfile>
						</Link>
					</S.SidebarBottom>
				)}
			</S.SidebarWrap>

			{isNotificationsOpen && notificationsData && (
				<Notifications
					notificationsData={notificationsData}
					setIsNotificationsOpen={setIsNotificationsOpen}
					refetchNotifications={refetchNotifications}
					readBtn={hasUnreadNotification(notificationsData)}
				/>
			)}
		</>
	);
};
