import { FC } from 'react';
import * as S from './Reports.styled';
import { Button, Text, Tooltip } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';
import { TimeTable } from './TimeTable/TimeTable';
import { MainTabs } from './MainTabs/MainTabs';
import { IntervalSwitcher } from './IntervalSwitcher/IntervalSwitcher';
import { FilterDropdownMenu } from './FilterDropdownMenu/FilterDropdownMenu';
import { Projects } from './Projects/Projects';
import { Clients } from './Clients/Clients';
import { Members } from './Members/Members';
import { useReportsController } from './ReportsController';
import { UserRole } from '../../shared/utility/Constants/userRole';

interface IReports {
	role?: string;
}

export const Reports: FC<IReports> = ({role}) => {
	const {
		setMainTabValue,
		isExportDisabled,
		reportsInterval,
		setReportsInterval,
		intervalValues,
		value,
		setValue,
		mainTabValue,
		isFilterOpened,
		filterButtonClick,
		setShownOptions,
		setSearchValue,
		options,
		activeFilter,
		searchValue,
		setActiveFilter,
		shownOptions,
		setIsExportDisabled,
		exportReport,
		isLoadingExport,
		loadingProjectExports
	} = useReportsController();
	return (
		<>
			<S.HeaderWrapper>
				<Text variant='title-2' attributes={{ style: { letterSpacing: '-0.015em' } }}>
					Отчеты
				</Text>
				<S.Switcher>
					<MainTabs setMainTabValue={setMainTabValue} />

					<S.PanelRight>
						<Button
							loading={isLoadingExport}
							disabled={isExportDisabled}
							variant='solid'
							color='primary'
							size='small'
							startIcon={<SvgComponent name={isExportDisabled ? 'download-16-disabled' : 'download-16-white'} />}
							onClick={() => exportReport()}
						>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Экспорт
							</Text>
						</Button>

						<IntervalSwitcher
							reportsInterval={reportsInterval}
							intervalValues={intervalValues}
							value={value}
							setReportsInterval={setReportsInterval}
							setValue={setValue}
						/>

						{(mainTabValue.name !== 'clients') && (
							<Tooltip position='top-end' text={`${isFilterOpened ? 'Скрыть' : 'Показать'}${'\u00A0'}фильтры ⠀`}>
								{(attributes) => (
									<S.ProjectFilterButton
										attributes={attributes}
										size='small'
										active={isFilterOpened}
										startIcon={<SvgComponent name={isFilterOpened ? 'filter-active' : 'filter'} />}
										disabled={mainTabValue.name === 'projects' && role === UserRole.MANAGER}
										onClick={filterButtonClick}
									/>
								)}
							</Tooltip>
						)}
					</S.PanelRight>
				</S.Switcher>
			</S.HeaderWrapper>

			{isFilterOpened && (
				<FilterDropdownMenu
					setShownOptions={setShownOptions}
					setSearchValue={setSearchValue}
					options={options}
					activeFilter={activeFilter}
					searchValue={searchValue}
					setActiveFilter={setActiveFilter}
					shownOptions={shownOptions}
				/>
			)}

			<S.MainContentWrapper isFilterOpened={isFilterOpened}>
				{mainTabValue.name === 'projects' ? (
					<Projects
						reportsInterval={reportsInterval}
						activeFilter={activeFilter}
						value={value}
						isLoadingExport={isLoadingExport}
						loadingProjectExports={loadingProjectExports}
						setIsExportDisabled={setIsExportDisabled}
						exportReport={exportReport}
					/>
				) : mainTabValue.name === 'members' ? (
					<Members
						reportsInterval={reportsInterval}
						activeFilter={activeFilter}
						setIsExportDisabled={setIsExportDisabled}
					/>
				) : mainTabValue.name === 'clients' ? (
					<Clients reportsInterval={reportsInterval} setIsExportDisabled={setIsExportDisabled} />
				) : (
					<TimeTable
						reportsInterval={reportsInterval}
						activeFilter={activeFilter}
						setIsExportDisabled={setIsExportDisabled}
					/>
				)}
			</S.MainContentWrapper>
		</>
	);
};
