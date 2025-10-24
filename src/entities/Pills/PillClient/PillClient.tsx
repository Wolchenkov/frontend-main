import React, { FC } from 'react';
import * as S from './PillClient.styled';
import { Divider, DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { usePillClientController } from './PillClientController';

interface IPillClientProps {
	title: string;
	icon?: string;
	members: fetchingDictionaryClient[];
	name: string;
	value?: number;
	onChange: (fieldName: string, fieldValue: number | undefined) => void;
}

export const PillClient: FC<IPillClientProps> = ({ title, icon, members, name, value, onChange }) => {
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
	} = usePillClientController(name, members, onChange, value);

	return (
		<S.PillDropdownMenu position='bottom-start' forcePosition active={isDropdownActive} onClose={handleModalClose}>
			<DropdownMenu.Trigger>
				{(attributes) => (
					<div ref={pillRef}>
						<S.PillButton
							{...attributes}
							variant='outline'
							size='small'
							startIcon={icon ? <SvgComponent name={icon} /> : <></>}
							active={isPillActive}
							onClick={handlePillButtonClick}
						>
							<Text
								variant='caption-1'
								attributes={{
									style: { fontWeight: '500', letterSpacing: '-0.01em', marginLeft: `${icon ? '0' : '-4px'}` },
								}}
							>
								{selectedOption ? selectedOption.value : title}
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
					{(shownOptions as fetchingDictionaryClient[]).map((member) => (
						<DropdownMenu.Item
							key={member.id}
							attributes={{
								style: {
									marginTop: '4px',
									background: `${selectedOption && selectedOption.id === member.id ? '#E9E9EB' : ''}`,
								},
							}}
							onClick={() =>
								setSelectedOption((prevState: fetchingDictionaryClient) =>
									prevState?.id === member.id ? undefined : member
								)
							}
						>
							<S.PillDropdownItemContent>
								<S.PillDropdownItemText
									variant='body-2'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
								>
									{member.value}
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
