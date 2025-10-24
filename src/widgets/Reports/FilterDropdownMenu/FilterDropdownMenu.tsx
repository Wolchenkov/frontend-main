import { Dispatch, FC, SetStateAction } from 'react';
import { Divider, DropdownMenu, useToggle } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './FilterDropdown.styled';

interface IFilterDropdownMenu {
	options: fetchingDictionary[] | undefined;
	activeFilter: fetchingDictionary | null;
	setActiveFilter: Dispatch<SetStateAction<fetchingDictionary | null>>;
	searchValue: string | null;
	setSearchValue: Dispatch<SetStateAction<string | null>>;
	shownOptions: fetchingDictionary[] | undefined;
	setShownOptions: Dispatch<SetStateAction<fetchingDictionary[] | undefined>>;
}

export const FilterDropdownMenu: FC<IFilterDropdownMenu> = ({
	setShownOptions,
	setSearchValue,
	options,
	activeFilter,
	searchValue,
	setActiveFilter,
	shownOptions,
}) => {
	const { active: isMenuActive, activate: activateMenu, deactivate: deactivateMenu } = useToggle(false);

	const handleFilterButtonClick = () => {
		isMenuActive ? deactivateMenu() : activateMenu();
		setShownOptions(options);
		setSearchValue(null);
	};

	return (
		<>
			<Divider />
			<DropdownMenu active={isMenuActive} onClose={deactivateMenu} position='bottom-start' forcePosition width='246px'>
				<DropdownMenu.Trigger>
					{(attributes) => (
						<S.FilterTeamButton
							{...attributes}
							size='small'
							variant='ghost'
							endIcon={<SvgComponent name={isMenuActive ? 'arrow-up-fill' : 'arrow-down-fill'} />}
							onClick={handleFilterButtonClick}
						>
							<S.FilterTeamText variant='caption-1'>
								{activeFilter === null ? (
									<>
										Команда:&nbsp;
										<span>все</span>
									</>
								) : (
									activeFilter.value
								)}
							</S.FilterTeamText>
						</S.FilterTeamButton>
					)}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<S.FilterTeamDropdownMenuContentWrap>
						<S.FilterTeamInput
							size='medium'
							name='project-id'
							placeholder='Поиск...'
							value={searchValue ?? ''}
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
							<S.FilterTeamDropdownItemContent>
								<S.FilterTeamDropdownItemText variant='body-2'>Все</S.FilterTeamDropdownItemText>
							</S.FilterTeamDropdownItemContent>
						</DropdownMenu.Item>

						{shownOptions?.map((team, index) => (
							<DropdownMenu.Item
								key={index}
								attributes={{
									style: {
										marginTop: '4px',
										background: `${activeFilter && activeFilter === team ? '#F6F6F7' : ''}`,
									},
								}}
								onClick={() => setActiveFilter({ value: team.value, id: team.id })}
							>
								<S.FilterTeamDropdownItemText variant='body-2'>{team.value}</S.FilterTeamDropdownItemText>
							</DropdownMenu.Item>
						))}
					</S.FilterTeamDropdownMenuContentWrap>
				</DropdownMenu.Content>
			</DropdownMenu>
			<Divider />
		</>
	);
};
