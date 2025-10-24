import React, { FC } from 'react';
import * as S from './PillStatus.styled';
import { Parser } from 'html-to-react';
import { DropdownMenu, Icon, Text } from 'reshaped/bundle';
import { usePillStatusController } from './PillStatusController';

interface IPillStatusProps {
	statuses: fetchingDictionaryStatus[];
	name: string;
	value?: number;
	isRequired?: boolean;
	onChange: (fieldName: string, fieldValue: number) => void;
}

export const PillStatus: FC<IPillStatusProps> = ({ statuses, name, value, isRequired, onChange }) => {
	const htmlToReactParser = new (Parser as any)();
	const {
		pillRef,
		isPillActive,
		isDropdownActive,
		options,
		selectedOption,
		dropDownMaxHeight,
		handlePillButtonClick,
		handleModalClose,
		setSelectedOption,
	} = usePillStatusController(name, statuses, onChange, value);

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
								selectedOption ? htmlToReactParser.parse(selectedOption.svg) : htmlToReactParser.parse(statuses[0].svg)
							}
							active={isPillActive}
							isRequired={isRequired}
							onClick={handlePillButtonClick}
						>
							<Text variant='caption-1' attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em' } }}>
								{selectedOption.status}
							</Text>
						</S.PillButton>
					</div>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillDropdownMenuContentWrap maxHeight={dropDownMaxHeight}>
					{(options as fetchingDictionaryStatus[]).map((status) => (
						<DropdownMenu.Item
							key={status.sort}
							attributes={{
								style: {
									marginTop: '4px',
									background: `${selectedOption && selectedOption.sort === status.sort ? '#E9E9EB' : ''}`,
								},
							}}
							onClick={() => setSelectedOption(status)}
						>
							<S.PillDropdownItemContent>
								<Icon size={4} svg={htmlToReactParser.parse(status.svg)} />
								<S.PillDropdownItemText
									variant='body-2'
									attributes={{ style: { fontWeight: '500', letterSpacing: '-0.02em' } }}
								>
									{status.status}
								</S.PillDropdownItemText>
							</S.PillDropdownItemContent>
						</DropdownMenu.Item>
					))}
				</S.PillDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</S.PillDropdownMenu>
	);
};
