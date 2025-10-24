import { FC, useEffect, useState, useRef } from 'react';
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { MONTHS } from '../../../shared/utility/Constants/months';

import { DropdownMenu, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import * as S from './ResourcePlanningTabledHead.styled';

import { useOnClickOutside } from '../../../shared/utility/Hooks';

interface IResourcePlanningTableHeadProps {
	teams: fetchingDictionary[] | undefined;
	teamId: number | undefined;
	setTeamId: React.Dispatch<React.SetStateAction<number | undefined>>;
	dates: IResourcePlanningDates | undefined;
	activeSort: { date: string; order: string };
	setActiveSort: React.Dispatch<React.SetStateAction<{ date: string; order: string }>>;
}

const ResourcePlanningTableHead: FC<IResourcePlanningTableHeadProps> = ({
	teams,
	teamId,
	setTeamId,
	dates,
	activeSort,
	setActiveSort,
}) => {
	const [datesGroupedByMonth, setDatesGroupedByMonth] = useState<[string, string[]][]>();
	const ref = useRef(null);

	useOnClickOutside(ref, () => setActiveSort({ date: '', order: '' }));

	useEffect(() => {
		if (dates) {
			const datesGroupedByMonth = Object.entries(
				Object.keys(dates).reduce((accumulator, currentValue) => {
					const month = new Date(currentValue).getMonth();
					if (!accumulator[month]) {
						accumulator[month] = [];
					}
					accumulator[month].push(currentValue);
					return accumulator;
				}, {} as { [key: string]: string[] })
			).sort((a, b) => new Date(a[1][0]).getFullYear() - new Date(b[1][0]).getFullYear());
			setDatesGroupedByMonth(datesGroupedByMonth);
		}
	}, [dates]);

	const onMouseEnter = (date: string) => {
		if (activeSort.order) {
			return;
		}
		setActiveSort((prevState) => ({ ...prevState, date }));
	};

	const onMouseLeave = () => {
		if (activeSort.order) {
			return;
		}
		setActiveSort((prevState) => ({ ...prevState, date: '' }));
	};

	const onSortClick = () => {
		if (activeSort.order === 'desc') {
			setActiveSort((prevState) => ({ ...prevState, order: 'asc' }));
		} else if (activeSort.order === 'asc') {
			setActiveSort((prevState) => ({ ...prevState, order: '' }));
		} else {
			setActiveSort((prevState) => ({ ...prevState, order: 'desc' }));
		}
	};

	return (
		<S.TableHead>
			<S.TableHeadColumn>
				<div />
				<div>
					<DropdownMenu width='300px'>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<S.Select attributes={attributes}>
									<Text variant='caption-1'>{teams?.find((team) => team.id === teamId)?.value}</Text>
									<SvgComponent name='arrow-down-s-fill' />
								</S.Select>
							)}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<S.ContentWrapper>
								{teams?.map((team) => (
									<DropdownMenu.Item key={team.id} onClick={() => setTeamId(team.id)}>
										{team.value}
									</DropdownMenu.Item>
								))}
							</S.ContentWrapper>
						</DropdownMenu.Content>
					</DropdownMenu>
				</div>
			</S.TableHeadColumn>
			{dates &&
				datesGroupedByMonth &&
				datesGroupedByMonth.map((month) => (
					<S.TableHeadColumn key={month[0]}>
						<div>
							<Text variant='caption-1'>{MONTHS[Number(month[0])]}</Text>
						</div>
						<div>
							{month[1].map((date, i) => {
								const isWorkDay = dates[date].is_workDay;
								const toDate = new Date(date);
								const showSort = activeSort.date === String(date);

								return (
									<S.Day
										key={month[0] + i}
										isToday={isToday(toDate)}
										onMouseEnter={() => onMouseEnter(date)}
										onMouseLeave={onMouseLeave}
									>
										{!isWorkDay ? (
											<Text variant='caption-1' color='disabled'>
												{format(toDate, 'cccccc dd', { locale: ru })}
											</Text>
										) : (
											<S.DayWithSort isSortActive={!!activeSort.order && showSort}>
												<Text variant='caption-1'>{format(toDate, 'cccccc dd', { locale: ru })}</Text>
												{showSort && (
													<div ref={ref} onClick={onSortClick}>
														<SvgComponent name={activeSort.order === 'asc' ? 'sort-asc-mini' : 'sort-desc-mini'} />
													</div>
												)}
											</S.DayWithSort>
										)}
									</S.Day>
								);
							})}
						</div>
					</S.TableHeadColumn>
				))}
		</S.TableHead>
	);
};

export default ResourcePlanningTableHead;
