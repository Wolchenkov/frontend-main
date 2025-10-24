import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';
import * as S from './Clients.styled';
import { Divider, Icon, Loader, Text } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { useClientsController } from './ClientsController';

const HEADER_TITLES = [
	{ title: 'Клиент/проект', width: '317px' },
	{ title: 'Тип бюджета', width: '130px' },
	{ title: 'Бюджет проекта, ₽', width: '150px', end: true },
	{ title: 'Текущие расходы, ₽', width: '150px', end: true },
	{ title: 'Прибыль, ₽', width: '150px', end: true },
];

interface IClients {
	reportsInterval: IHistoryInterval | null;
	setIsExportDisabled: Dispatch<SetStateAction<boolean>>;
}

export const Clients: FC<IClients> = ({ reportsInterval, setIsExportDisabled }) => {
	const { isFetching, reportsData, clientContainerRef, checkActiveClients, activeClients, isLoading } =
		useClientsController({
			reportsInterval,
			setIsExportDisabled,
		});
	return (
		<>
			<S.TableContainer ref={clientContainerRef}>
				{!isFetching ? (
					reportsData && reportsData?.data?.length > 0 ? (
						<>
							<S.Table>
								<S.Header>
									{HEADER_TITLES.map(({ title, width, end }) => (
										<S.HeaderText
											key={title}
											variant='caption-1'
											color='neutral-faded'
											attributes={{ style: { width, justifyContent: end ? 'end' : undefined } }}
										>
											{title}
										</S.HeaderText>
									))}
								</S.Header>

								{reportsData?.data.map(({ id, budget_amount, budget_expenses, name, budget_balance, projects }, i) => (
									<Fragment key={id}>
										{i === 0 && <Divider />}
										<S.Row>
											<S.ClientNameContainer>
												<div style={{ width: '16px' }}>
													{projects.length !== 0 && (
														<Icon
															size={4}
															svg={
																<SvgComponent name='arrow-right-fill-black' onClick={() => checkActiveClients(id)} />
															}
															attributes={{
																style: { transform: `${activeClients.includes(id) ? 'rotate(90deg)' : 'none'}` },
															}}
														/>
													)}
												</div>
												<S.MyText500 variant='caption-1' maxLines={1}>
													{name}
												</S.MyText500>
											</S.ClientNameContainer>
											<div style={{ width: '130px' }} />
											<S.BudgetContainer>
												<S.MyText500 variant='caption-1'>{budget_amount.toLocaleString('ru-RU')}</S.MyText500>
											</S.BudgetContainer>
											<S.BudgetContainer>
												<S.MyText500 variant='caption-1'>{budget_expenses.toLocaleString('ru-RU')}</S.MyText500>
											</S.BudgetContainer>
											<S.BudgetContainer>
												<S.MyText500 variant='caption-1' color={budget_balance < 0 ? 'critical' : 'neutral'}>
													{budget_balance.toLocaleString('ru-RU')}
												</S.MyText500>
											</S.BudgetContainer>
										</S.Row>
										<Divider />
										<S.ProjectsContainer active={activeClients.includes(id)}>
											{projects.map(({ budget_amount, budget_expenses, budget_type, name, budget_balance, slug }) => (
												<Fragment key={slug}>
													<S.ProjectRow>
														<S.ProjectNameContainer>
															<S.MyText500 variant='caption-1' color='neutral-faded' maxLines={1}>
																{name}
															</S.MyText500>
														</S.ProjectNameContainer>
														<S.TypeWorkContainer>
															<S.MyText500 variant='caption-1' color='neutral-faded'>
																{budget_type}
															</S.MyText500>
														</S.TypeWorkContainer>
														<S.BudgetContainer>
															<S.MyText500 variant='caption-1' color='neutral-faded'>
																{budget_amount.toLocaleString('ru-RU')}
															</S.MyText500>
														</S.BudgetContainer>
														<S.BudgetContainer>
															<S.MyText500 variant='caption-1' color='neutral-faded'>
																{budget_expenses.toLocaleString('ru-RU')}
															</S.MyText500>
														</S.BudgetContainer>
														<S.BudgetContainer>
															<S.MyText500
																variant='caption-1'
																color={budget_balance < 0 ? 'critical' : 'neutral-faded'}
															>
																{typeof budget_balance === 'number'
																	? budget_balance?.toLocaleString('ru-RU')
																	: 'Time&Material'}
															</S.MyText500>
														</S.BudgetContainer>
													</S.ProjectRow>
													<Divider />
												</Fragment>
											))}
										</S.ProjectsContainer>
									</Fragment>
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
					)
				) : (
					<S.LoaderContainer>
						<Loader size='medium' />
					</S.LoaderContainer>
				)}
			</S.TableContainer>
		</>
	);
};
