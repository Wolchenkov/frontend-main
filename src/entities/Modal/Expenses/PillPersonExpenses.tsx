import React, { FC } from 'react';
import * as S from './PillPersonExpenses.styled';
import { Actionable, Divider, DropdownMenu, Icon } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { getInitials } from '../../../shared/utility/Utils';
import { usePillPersonController } from './PillPersonExpensesController';

interface IPillPersonProps {
	me: IMember;
	members: IMember[];
	onChange: (fieldValue: INewProjectState[keyof INewProjectState]) => void;
}

export const PillPersonExpenses: FC<IPillPersonProps> = ({ me, members, onChange }) => {
	const {
		pillRef,
		isPillActive,
		isDropdownActive,
		filter,
		selectedOption,
		shownOptions,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		setFilter,
		setSelectedOption,
	} = usePillPersonController(members, onChange);

	return (
		<S.PillDropdownMenu
			position='bottom-start'
			forcePosition
			active={isDropdownActive}
			onClose={handleModalClose}
			width='trigger'
		>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div ref={pillRef}>
						<Actionable {...attributes} onClick={handlePillButtonClick}>
							<S.MyInput
								inputAttributes={{ autoComplete: 'off', style: { cursor: 'pointer' } }}
								value={selectedOption ? selectedOption.name : me?.name}
								active={isPillActive}
								name='member'
								startIcon={
									<AvatarCustom
										src={selectedOption ? selectedOption.avatar || undefined : me.avatar || undefined}
										initials={getInitials(selectedOption ? selectedOption.name : me.name)}
										size={4}
									/>
								}
								endIcon={<SvgComponent name={isPillActive ? 'chevron-up' : 'chevron-down'} />}
							/>
						</Actionable>
					</div>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillDropdownMenuContentWrap maxHeight={dropDownMaxHeight}>
					<S.PillInput
						size='medium'
						name='project-id'
						placeholder='Поиск...'
						value={filter}
						onChange={({ value }) => setFilter(value)}
						attributes={{ style: { marginBottom: '4px' } }}
						inputAttributes={{ autoComplete: 'off', style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
					/>
					<Divider />
					{(shownOptions as IMember[]).map((member) => (
						<DropdownMenu.Item
							key={member.id}
							attributes={{
								style: {
									marginTop: '4px',
									background: `${selectedOption && selectedOption.id === member.id && '#E9E9EB'}`,
								},
							}}
							onClick={() => setSelectedOption(member)}
						>
							<S.PillDropdownItemContent>
								<AvatarCustom src={member.avatar ? member.avatar : undefined} initials={getInitials(member.name)} size={6} />
								<S.PillDropdownItemText
									variant='body-2'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
								>
									{member.name}
								</S.PillDropdownItemText>
								{selectedOption && selectedOption.id === member.id && (
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
				</S.PillDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</S.PillDropdownMenu>
	);
};
