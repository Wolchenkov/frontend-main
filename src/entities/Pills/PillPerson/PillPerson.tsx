import React, { FC } from 'react';
import * as S from './PillPerson.styled';
import { Divider, DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { getInitials } from '../../../shared/utility/Utils';
import { usePillPersonController } from './PillPersonController';

interface IPillPersonProps {
	title: string;
	icon?: string;
	members: IMember[];
	name: string;
	value?: number;
	isRequired?: boolean;
	onChange: (fieldName: string, fieldValue: number | undefined) => void;
}

export const PillPerson: FC<IPillPersonProps> = ({ title, icon, members, name, value, isRequired, onChange }) => {
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
	} = usePillPersonController(name, members, onChange, value);

	return (
		<S.PillDropdownMenu position='bottom-start' forcePosition active={isDropdownActive} onClose={handleModalClose}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div ref={pillRef}>
						<S.PillButton
							{...attributes}
							variant='outline'
							size='small'
							isRequired={isRequired}
							startIcon={
								selectedOption ? (
									<AvatarCustom
										key={selectedOption.id}
										src={selectedOption.avatar ? selectedOption.avatar : undefined}
										initials={getInitials(selectedOption.name)}
										size={4}
									/>
								) : icon ? (
									<SvgComponent name={icon} />
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
								{selectedOption ? selectedOption.name : title}
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
									background: `${selectedOption && selectedOption.id === member.id ? '#E9E9EB' : ''}`,
								},
							}}
							onClick={() =>
								setSelectedOption((prevState: IMember) => (prevState?.id === member.id ? undefined : member))
							}
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
