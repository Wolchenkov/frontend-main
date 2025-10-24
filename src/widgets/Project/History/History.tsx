import { FC } from 'react';
import { SvgComponent } from '../../../shared';
import { Loader, Text, Timeline } from 'reshaped/bundle';
import * as S from './History.styled';
import { formatRussianDate, formatTime } from '../../../shared/utility/Utils';
import { useHistoryController } from './HistoryController';

interface IHistoryProps {
	history: IHistory | undefined;
	setHistoryData: React.Dispatch<React.SetStateAction<IHistory | undefined>>;
	isLoadingHistory: boolean;
}

export const History: FC<IHistoryProps> = ({ history, setHistoryData, isLoadingHistory }) => {
	const { containerRef, projectLink, actions, isLoading } = useHistoryController({ setHistoryData, history });

	return (
		<S.MainContainer ref={containerRef}>
			{!isLoadingHistory ? (
				history?.data && Object.entries(history.data).length !== 0 ? (
					Object.entries(history.data)?.map((day, index) => (
						<S.DayContainer key={index}>
							<S.TextDay variant='caption-1' color='neutral-faded'>
								{formatRussianDate(day[0])}
							</S.TextDay>
							<Timeline attributes={{ style: { width: '547px' } }}>
								{day[1].map((action, index) => {
									if (action.text.action === 'Completed_the_project') {
										return (
											<Timeline.Item key={index + 999999} markerSlot={<SvgComponent name='history-check-fill' />}>
												<S.TextContainer>
													<S.MainText variant='caption-1'>
														{'Проект '}
														<S.Link href={projectLink}>{action.text.project.name}</S.Link>

														{' завершился!'}
													</S.MainText>
													<S.TimeText variant='caption-2'>{formatTime(action.created_at)}</S.TimeText>
												</S.TextContainer>
											</Timeline.Item>
										);
									}
									const currentAction = actions[action.text.action];
									const link = currentAction.link && currentAction.link(action);

									return (
										<Timeline.Item key={index + 999999} markerSlot={<SvgComponent name={currentAction.svg} />}>
											<S.TextContainer>
												<S.MainText variant='caption-1'>
													{action.text.user.name}
													<Text
														as='span'
														variant='caption-1'
														attributes={{ style: { fontWeight: 500, color: '#898b8f' } }}
													>
														{currentAction.verb}
													</Text>
													{currentAction?.link ? (
														<S.Link href={link?.href}>{link?.name}</S.Link>
													) : (
														<Text as='span' variant='caption-1' attributes={{ style: { fontWeight: 500 } }}>
															{currentAction.verb.includes('задачу')
																? action.text.issue.name
																: action.text.project.name}
														</Text>
													)}
													{currentAction.additionalText && (
														<Text as='span' variant='caption-1' attributes={{ style: { fontWeight: 500 } }}>
															{currentAction.additionalText(action)}
														</Text>
													)}
												</S.MainText>
												<S.TimeText variant='caption-2'>{formatTime(action.created_at)}</S.TimeText>
											</S.TextContainer>
										</Timeline.Item>
									);
								})}
							</Timeline>
						</S.DayContainer>
					))
				) : (
					<S.EmptyHistory>
						<SvgComponent name='history-fill-avatar' />
						<S.EmptyHistoryText variant='featured-3' align='center'>
							За данный период активностей не обнаружено
						</S.EmptyHistoryText>
					</S.EmptyHistory>
				)
			) : (
				<S.LoaderContainer>
					<Loader size='medium' />
				</S.LoaderContainer>
			)}
			{isLoading && (
				<div>
					<Loader size='medium' />
				</div>
			)}
		</S.MainContainer>
	);
};
