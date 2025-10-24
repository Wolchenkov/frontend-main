import { FC } from 'react';
import { useUserMenuController } from './UserMenuController';

import { DropdownMenu, Text, Divider } from 'reshaped/bundle';
import { getInitials } from '../../../shared/utility/Utils';
import { AvatarCustom, SvgComponent } from '../../../shared';
import * as S from './UserMenu.styled';

interface IUserMenuProps {
	userFilter: {
		id: number;
		avatar: string;
		name: string;
	} | null;
	setUserFilter: React.Dispatch<
		React.SetStateAction<{
			id: number;
			avatar: string;
			name: string;
		} | null>
	>;
	timeRecords: ITimeRecord[] | undefined;
}

const UserMenu: FC<IUserMenuProps> = ({ userFilter, setUserFilter, timeRecords }) => {
	const { searchUser, setSearchUser, userOptions } = useUserMenuController(timeRecords);

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.UserFilter attributes={attributes}>
						{userFilter ? (
							<Text variant='caption-1'>{userFilter.name}</Text>
						) : (
							<>
								<Text variant='caption-1'>Исполнитель:</Text>
								<S.TextAll variant='caption-1'>все</S.TextAll>
								<SvgComponent name='arrow-down-s-fill' />
							</>
						)}
					</S.UserFilter>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.SearchInput
					size='medium'
					name='project-id'
					placeholder='Поиск...'
					value={searchUser}
					onChange={({ value }) => setSearchUser(value)}
					attributes={{ style: { marginBottom: '4px' } }}
					inputAttributes={{ autoComplete: 'off', style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
				/>
				<Divider />
				<DropdownMenu.Item
					onClick={() => {
						setUserFilter(null);
					}}
				>
					Все
				</DropdownMenu.Item>
				{Object.values(userOptions)
					.filter((option) => option.user.name.toLowerCase().includes(searchUser.toLowerCase()))
					.map((option) => (
						<DropdownMenu.Item key={option.user.id} onClick={() => setUserFilter(option.user)}>
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<AvatarCustom
									src={option.user.avatar ? option.user.avatar : undefined}
									initials={getInitials(option.user.name)}
									size={6}
								/>
								{option.user.name}
							</div>
						</DropdownMenu.Item>
					))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

export default UserMenu;
