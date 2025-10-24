import { FC, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { checkGroupTimeRecords } from '../../../store/time/timeSlice';

import * as S from './TableHead.styled';
import { Text, Checkbox, DropdownMenu, Button, Icon } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface ITableHeadProps {
	columns: { id: string; name?: string; filter?: boolean }[];
	timeRecords: ITimeRecord[];
	showTableFilter: boolean;
	tableFilterOptions: { id: string; name?: string; filter?: boolean }[];
	checkedColumnOptions: string[];
	setCheckedColumnOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableHead: FC<ITableHeadProps> = ({
	columns,
	timeRecords,
	showTableFilter,
	tableFilterOptions,
	checkedColumnOptions,
	setCheckedColumnOptions,
}) => {
	const dispatch = useAppDispatch();
	const checkedTimeRecords = useAppSelector((state) => state.time.checkedTimeRecords);

	const handleOptionClick = (option: string) => {
		checkedColumnOptions.includes(option)
			? setCheckedColumnOptions((prevState) => prevState.filter((column) => column !== option))
			: setCheckedColumnOptions((prevState) => [...prevState, option]);
	};

	return (
		<S.TableHead>
			<S.TableHeadCell>
				<label>
					<Checkbox
						name={'checkbox' + Math.random()}
						checked={
							timeRecords.length > 0 && timeRecords.every((timeRecord) => checkedTimeRecords.includes(timeRecord.id))
						}
						onChange={({ checked }) => dispatch(checkGroupTimeRecords({ checked, timeRecords }))}
						disabled={timeRecords.every((timeRecord) => timeRecord.is_approved)}
					/>
				</label>
			</S.TableHeadCell>
			{columns.map((column) => (
				<Fragment key={column.id}>
					{(checkedColumnOptions.includes(column.id) || !column.filter) && (
						<S.TableHeadCell>
							{!!column.name && (
								<Text
									variant='caption-1'
									color='neutral-faded'
									attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em' } }}
								>
									{column.name}
								</Text>
							)}
						</S.TableHeadCell>
					)}
				</Fragment>
			))}
			{showTableFilter && (
				<DropdownMenu>
					<DropdownMenu.Trigger>
						{(attributes) => (
							<Button
								variant='ghost'
								startIcon={<SvgComponent name='eye-off-clear' />}
								size='small'
								attributes={{
									...attributes,
									style: {
										position: 'absolute',
										right: '16px',
										bottom: 0,
									},
								}}
							/>
						)}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						{tableFilterOptions.map((option) => (
							<S.TableFilterOption key={option.id} onClick={() => handleOptionClick(option.id)}>
								<Icon
									svg={
										<SvgComponent
											name={`${checkedColumnOptions.includes(option.id) ? 'checkbox-checked' : 'checkbox-default'}`}
										/>
									}
									size={5}
									attributes={{ style: { marginRight: '8px' } }}
								/>
								<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
									{option.name}
								</Text>
							</S.TableFilterOption>
						))}
					</DropdownMenu.Content>
				</DropdownMenu>
			)}
		</S.TableHead>
	);
};

export default TableHead;
