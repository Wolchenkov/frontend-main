/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import * as S from './FilterUser.styled';
import { AvatarCustom, SvgComponent } from '../../../../shared';
import { Divider, DropdownMenu, useToggle } from 'reshaped/bundle';
import { getInitials, getSortedPersonOptions } from '../../../../shared/utility/Utils';

interface IFilterUserProps {
	value: null;
	users: IMember[];
	onChange: ({ delegate_id }: { delegate_id: number | null }) => void;
}

export const FilterUser: FC<IFilterUserProps> = ({ value, users, onChange }) => {
	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);

	const [options, setOptions] = useState<IMember[]>(getSortedPersonOptions(users));
	const [shownOptions, setShownOptions] = useState<IMember[]>(options);
	const [searchValue, setSearchValue] = useState('');
	const [activeFilter, setActiveFilter] = useState<IMember | null>(null);

	useEffect(() => {
		setOptions(getSortedPersonOptions(users));
	}, [users]);

	useEffect(() => {
		if (value === null) {
			setActiveFilter(value);
		}
	}, [value]);

	useEffect(() => {
		onChange({ delegate_id: activeFilter !== null ? activeFilter.id : null });
	}, [activeFilter]);

	useEffect(() => {
		setShownOptions(options.filter((option) => option.name.toLowerCase().includes(searchValue.toLowerCase())));
	}, [searchValue, options]);

	const handleFilterButtonClick = () => {
		isMenuActive ? deactivateMenu() : activateMenu();
		setShownOptions(options);
		setSearchValue('');
	};

	return (
		<DropdownMenu active={isMenuActive} onClose={deactivateMenu} position='bottom-start' forcePosition width='246px'>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<S.FilterUserButton
						{...attributes}
						size='small'
						variant='ghost'
						endIcon={<SvgComponent name={isMenuActive ? 'arrow-up-fill' : 'arrow-down-fill'} />}
						onClick={handleFilterButtonClick}
					>
						<S.FilterUserText variant='caption-1'>
							{activeFilter === null ? (
								<>
									Исполнитель:&nbsp;
									<span>все</span>
								</>
							) : (
								activeFilter?.name
							)}
						</S.FilterUserText>
					</S.FilterUserButton>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.FilterUserDropdownMenuContentWrap>
					<S.FilterUserInput
						size='medium'
						name='project-id'
						placeholder='Поиск...'
						value={searchValue}
						onChange={({ value }) => setSearchValue(value)}
						attributes={{ style: { marginBottom: '4px' } }}
						inputAttributes={{ autoComplete: 'off', style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
					/>
					<Divider />

					<DropdownMenu.Item
						attributes={{
							style: {
								marginTop: '4px',
								background: `${activeFilter === null ? '#F6F6F7' : ''}`,
							},
						}}
						onClick={() => setActiveFilter(null)}
					>
						<S.FilterUserDropdownItemContent>
							<S.FilterUserDropdownItemText
								variant='body-2'
								attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
							>
								Все
							</S.FilterUserDropdownItemText>
						</S.FilterUserDropdownItemContent>
					</DropdownMenu.Item>

					{(shownOptions as IMember[]).map((member) => (
						<DropdownMenu.Item
							key={member.id}
							attributes={{
								style: {
									marginTop: '4px',
									background: `${activeFilter && activeFilter.id === member.id ? '#F6F6F7' : ''}`,
								},
							}}
							onClick={() => setActiveFilter(member)}
						>
							<S.FilterUserDropdownItemContent>
								<AvatarCustom src={member.avatar ? member.avatar : undefined} initials={getInitials(member.name)} size={6} />
								<S.FilterUserDropdownItemText
									variant='body-2'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
								>
									{member.name}
								</S.FilterUserDropdownItemText>
							</S.FilterUserDropdownItemContent>
						</DropdownMenu.Item>
					))}
				</S.FilterUserDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
