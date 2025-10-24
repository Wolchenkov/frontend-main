import { FC } from 'react';
import { Actionable, Divider, DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { getInitials } from '../../../../../shared/utility/Utils';
import { AvatarCustom, SvgComponent } from '../../../../../shared';

import * as S from './Subscribers.styled';
import { useSubscribersController } from './SubscribersController';

interface ISubscribersProps {
	taskState: ITaskDetail;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	dataProject: IOneProject;
	refetchTaskData: any;
	isClientRole?: boolean;
}
export const SubscribersPill: FC<ISubscribersProps> = ({
	taskState,
	setTaskState,
	dataProject,
	refetchTaskData,
	isClientRole,
}) => {
	const {
		isDropdownSubscribersActive,
		deactivateSubscribersDropdown,
		subscriberRef,
		handlePillSubscribersButtonClick,
		selectedSubscribers,
		dropDownSubscribersMaxHeight,
		filterSubscribers,
		setFilterSubscribers,
		shownSubscribers,
		handleOptionClick,
	} = useSubscribersController({ taskState, setTaskState, refetchTaskData, dataProject });
	return (
		<DropdownMenu
			position='bottom-end'
			forcePosition
			active={isDropdownSubscribersActive}
			onClose={deactivateSubscribersDropdown}
		>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div ref={subscriberRef}>
						<Actionable {...attributes} onClick={isClientRole ? undefined : handlePillSubscribersButtonClick}>
							{selectedSubscribers?.length ? (
								<S.PillIconsWrap>
									{(selectedSubscribers as IMember[]).slice(0, 3).map((member) => (
										<AvatarCustom
											key={member.id}
											color='positive-faded'
											src={member.avatar ? member.avatar : undefined}
											initials={getInitials(member.name)}
											size={6}
										/>
									))}
									{selectedSubscribers?.length > 3 ? (
										<S.MyAvatar
											src={undefined}
											initials={'+' + (selectedSubscribers && selectedSubscribers.length - 3)}
											size={6}
										/>
									) : (
										<></>
									)}
								</S.PillIconsWrap>
							) : (
								<SvgComponent name='not-delegated' />
							)}
						</Actionable>
					</div>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillDropdownMenuContentWrap maxHeight={dropDownSubscribersMaxHeight}>
					<S.PillInput
						size='medium'
						name='project-id'
						placeholder='Поиск...'
						value={filterSubscribers}
						onChange={({ value }) => setFilterSubscribers(value)}
						attributes={{ style: { marginBottom: '4px' } }}
						inputAttributes={{ autoComplete: 'off', style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
					/>
					<Divider />
					<DropdownMenu.Section>
						<Text variant='caption-2' attributes={{ style: { color: '#898B8F', paddingLeft: '12px' } }}>
							Клиенты
						</Text>
						{(shownSubscribers as IMember[])
							.filter(({ id }) => dataProject.clientMembers.map((member) => member.id).includes(id))
							.map((member) => (
								<DropdownMenu.Item
									key={member.id}
									attributes={{
										style: {
											marginTop: '4px',
											background: `${selectedSubscribers?.map(({ id }) => id)?.includes(member.id) ? '#E9E9EB' : ''}`,
										},
									}}
									onClick={() => handleOptionClick(member)}
								>
									<S.PillDropdownItemContent>
										<AvatarCustom
											src={member.avatar ? member.avatar : undefined}
											initials={getInitials(member.name)}
											size={6}
										/>
										<S.PillDropdownItemText
											variant='body-2'
											attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
										>
											{member.name}
										</S.PillDropdownItemText>
										{selectedSubscribers?.map(({ id }) => id)?.includes(member.id) && (
											<Icon
												size={4}
												svg={<SvgComponent name='check-fill' />}
												attributes={{
													style: {
														flexShrink: 0,
														position: 'absolute',
														top: '50%',
														right: '0',
														transform: 'translateY(-50%)',
													},
												}}
											/>
										)}
									</S.PillDropdownItemContent>
								</DropdownMenu.Item>
							))}
					</DropdownMenu.Section>
					<DropdownMenu.Section>
						<Text
							variant='caption-2'
							attributes={{ style: { color: '#898B8F', paddingLeft: '12px', paddingTop: '4px' } }}
						>
							Исполнители
						</Text>
						{(shownSubscribers as IMember[])
							.filter(({ id }) => dataProject.usersMember.map((member) => member.id).includes(id))
							.map((member) => (
								<DropdownMenu.Item
									key={member.id}
									attributes={{
										style: {
											marginTop: '4px',
											background: `${selectedSubscribers?.map(({ id }) => id)?.includes(member.id) ? '#E9E9EB' : ''}`,
										},
									}}
									onClick={() => handleOptionClick(member)}
								>
									<S.PillDropdownItemContent>
										<AvatarCustom
											src={member.avatar ? member.avatar : undefined}
											initials={getInitials(member.name)}
											size={6}
										/>
										<S.PillDropdownItemText
											variant='body-2'
											attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
										>
											{member.name}
										</S.PillDropdownItemText>
										{selectedSubscribers?.map(({ id }) => id)?.includes(member.id) && (
											<Icon
												size={4}
												svg={<SvgComponent name='check-fill' />}
												attributes={{
													style: {
														flexShrink: 0,
														position: 'absolute',
														top: '50%',
														right: '0',
														transform: 'translateY(-50%)',
													},
												}}
											/>
										)}
									</S.PillDropdownItemContent>
								</DropdownMenu.Item>
							))}
					</DropdownMenu.Section>
				</S.PillDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
