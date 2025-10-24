import React, { FC } from 'react';
import * as S from './PillMultiPerson.styled';
import { Divider, DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { getDeclinedNumeral, getInitials } from '../../../shared/utility/Utils';
import { usePillMultiPersonController } from './PillMultiPersonController';

interface IPillMultiPersonProps {
	title: string;
	declinedTitles: string[];
	icon?: string;
	members: IMember[];
	name: string;
	value?: IMember[];
	onChange: (fieldName: string, fieldValue: number[]) => void;
	taskCreate?: boolean;
}

export const PillMultiPerson: FC<IPillMultiPersonProps> = ({
	title,
	declinedTitles,
	icon,
	members,
	name,
	value,
	onChange,
}) => {
	const {
		pillRef,
		isPillActive,
		isDropdownActive,
		filter,
		selectedOptions,
		shownOptions,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		handleOptionClick,
		setFilter,
		setSelectedOptions,
	} = usePillMultiPersonController(name, members, onChange, value);

	return (
		<S.PillDropdownMenu position='bottom-start' forcePosition active={isDropdownActive} onClose={handleModalClose}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div ref={pillRef}>
						<S.PillButton
							{...attributes}
							variant='outline'
							size='small'
							startIcon={
								selectedOptions.length ? (
									<S.PillIconsWrap>
										{(selectedOptions as IMember[]).slice(0, 4).map((member) => (
											<AvatarCustom
												key={member.id}
												src={member.avatar ? member.avatar : undefined}
												initials={getInitials(member.name)}
												size={4}
											/>
										))}
									</S.PillIconsWrap>
								) : icon ? (
									<SvgComponent name={icon} />
								) : (
									<></>
								)
							}
							endIcon={
								selectedOptions.length ? (
									<SvgComponent
										style={{ cursor: 'pointer', pointerEvents: 'all' }}
										onClick={() => setSelectedOptions([])}
										name='close-circle-fill'
									/>
								) : (
									<></>
								)
							}
							active={isPillActive}
							onClick={handlePillButtonClick}
						>
							<Text
								variant='caption-1'
								attributes={{
									style: { fontWeight: '500', letterSpacing: '-0.01em', marginLeft: `${icon ? '0' : '-4px'}` },
								}}
							>
								{selectedOptions.length ? getDeclinedNumeral(selectedOptions.length, declinedTitles) : title}
							</Text>
						</S.PillButton>
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
									background: `${selectedOptions.map(({ id }: IMember) => id).includes(member.id) ? '#E9E9EB' : ''}`,
								},
							}}
							onClick={() => handleOptionClick(member)}
						>
							<S.PillDropdownItemContent>
								<AvatarCustom src={member.avatar ? member.avatar : undefined} initials={getInitials(member.name)} size={6} />
								<S.PillDropdownItemText
									variant='body-2'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
								>
									{member.name}
								</S.PillDropdownItemText>
								{selectedOptions.map(({ id }: IMember) => id).includes(member.id) && (
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
