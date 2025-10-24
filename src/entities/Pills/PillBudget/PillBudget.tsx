import React, { FC, Fragment } from 'react';
import * as S from './PillBudget.styled';
import { Button, DropdownMenu, Tabs, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { TableRate } from '../../index';
import { usePillBudgetController } from './PillBudgetController';

const BUDGET_TYPES = [
	{
		type: 'fixed',
		name: 'Фикс',
	},
	{
		type: 'Time&Material',
		name: 'Time&Material',
	},
	{
		type: 'not_billable',
		name: 'Без оплаты',
	},
];

interface IPillBudgetProps {
	title: string;
	icon?: string;
	rates: fetchingDictionaryTypeWork[];
	name: string;
	value?: {
		type: string;
		amount: number;
	};
	onChange: (fieldName: string, fieldValue: IBudget) => void;
}

export const PillBudget: FC<IPillBudgetProps> = ({ title, icon, rates, name, onChange, value }) => {
	const {
		pillRef,
		pillTabInputRef,
		isPillActive,
		isDropdownActive,
		pillTitle,
		tabValue,
		projectBudget,
		dropDownMaxHeight,
		projectRates,
		handleTabChange,
		handlePillButtonClick,
		handleModalClose,
		handleKeyPress,
		setPillTitle,
		setProjectRates,
		setProjectBudget,
	} = usePillBudgetController(title, rates, BUDGET_TYPES, name, onChange, value);

	return (
		<DropdownMenu
			position='bottom-start'
			forcePosition
			width='324px'
			active={isDropdownActive}
			onClose={handleModalClose}
		>
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
								{pillTitle}
							</Text>
						</S.PillButton>
					</div>
				)}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<S.PillDropdownMenuContentWrap maxHeight={dropDownMaxHeight}>
					<Tabs variant='pills-elevated' itemWidth='equal' value={tabValue.type} onChange={handleTabChange}>
						<Tabs.List>
							{BUDGET_TYPES.map(({ type, name }) => (
								<Tabs.Item key={type} value={type}>
									<Text variant='caption-1' attributes={{ style: { lineHeight: '16px', letterSpacing: '-0.01em' } }}>
										{name}
									</Text>
								</Tabs.Item>
							))}
						</Tabs.List>
						{BUDGET_TYPES.map(({ type }) => {
							switch (type) {
								case 'fixed':
									return (
										<Tabs.Panel key={type} value={type}>
											<S.PillTabInput
												size='medium'
												name='project-id'
												placeholder='Сумма бюджета'
												endSlot={
													<Button
														size='small'
														startIcon={<SvgComponent name='check' />}
														disabled={!projectBudget}
														onClick={() => {
															setPillTitle(tabValue.name);
															handleModalClose();
														}}
													/>
												}
												value={projectBudget ? Number(projectBudget).toLocaleString('ru-RU') : ''}
												onChange={({ value }) => setProjectBudget(value.replaceAll(/\s+/g, ''))}
												inputAttributes={{
													autoComplete: 'off',
													ref: pillTabInputRef,
													onKeyPress: (e) => handleKeyPress(e),
												}}
											/>
											<TableRate rates={projectRates} onChange={setProjectRates} />
										</Tabs.Panel>
									);
								case 'Time&Material':
									return (
										<Tabs.Panel key={type} value={type}>
											<TableRate rates={projectRates} onChange={setProjectRates} />
										</Tabs.Panel>
									);
								case 'not_billable':
									return <Fragment key={type}></Fragment>;
								default:
									throw new Error(`Unknown sort type: ${type}`);
							}
						})}
					</Tabs>
				</S.PillDropdownMenuContentWrap>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};
