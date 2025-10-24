import { Dispatch, FC, SetStateAction } from 'react';
import * as S from './TimeTable.styled';
import { Divider, Loader, Text } from 'reshaped/bundle';
import { MainRow } from './MainRow/MainRow';
import { SvgComponent } from '../../../shared';
import { useTimeTableController } from './TimeTableController';

interface ITimeTableProps {
	reportsInterval: IHistoryInterval | null;
	activeFilter: fetchingDictionary | null;
	setIsExportDisabled: Dispatch<SetStateAction<boolean>>;
}

const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export const TimeTable: FC<ITimeTableProps> = ({ reportsInterval, activeFilter, setIsExportDisabled }) => {
	const { isFetching, reportsData, dates, timeTableContainerRef, activeUsers, setActiveUsers, isLoading } =
		useTimeTableController({ reportsInterval, activeFilter, setIsExportDisabled });

	return (
		<>
			<S.TableContainer ref={timeTableContainerRef}>
				{!isFetching ? (
					reportsData &&
					dates &&
					(reportsData.data.length > 0 ? (
						<>
							<S.Table>
								<S.Header>
									{daysOfWeek.map((day, index) => (
										<S.HeaderDays key={index}>
											<S.MyText500 isLowPriority={true} variant='caption-1'>
												{day}
											</S.MyText500>
											<S.MyText500 isLowPriority={true} variant='caption-1'>
												{dates[index]}
											</S.MyText500>
										</S.HeaderDays>
									))}
									<S.HeaderDays>
										<S.MyText500 variant='caption-1'>итого</S.MyText500>
									</S.HeaderDays>
								</S.Header>
								<Divider />
								{reportsData.data.map((userData) => (
									<MainRow
										key={userData.id}
										userData={userData}
										activeUsers={activeUsers}
										setActiveUsers={setActiveUsers}
									/>
								))}
							</S.Table>
							{isLoading && (
								<S.LazyLoadingContainer>
									<Loader size='medium' />
								</S.LazyLoadingContainer>
							)}
						</>
					) : (
						<S.LoaderContainer>
							<SvgComponent name='empty-report' />
							<Text variant='body-1' attributes={{ style: { fontWeight: 600, letterSpacing: '-0.02em' } }}>
								Нет данных для формирования отчета
							</Text>
						</S.LoaderContainer>
					))
				) : (
					<S.LoaderContainer>
						<Loader size='medium' />
					</S.LoaderContainer>
				)}
			</S.TableContainer>
		</>
	);
};
