import { FC } from 'react';
import * as S from './ChartBadge.styled';
import { Actionable, Badge, Text, Tooltip } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';

interface IChartBadgeProps {
	title: string;
	titleTooltip?: string;
	value: number;
	profit: number;
}

export const ChartBadge: FC<IChartBadgeProps> = ({ title, titleTooltip, value, profit }) => {
	return (
		<S.Container>
			<S.Header>
				<Text variant='featured-1' attributes={{ style: { lineHeight: '40px', letterSpacing: '-0.02em' } }}>
					{Number(value).toLocaleString('ru-RU')}
				</Text>
				<Tooltip position='top' text={'В сравнении с предыдущим аналогичным периодом'}>
					{(attributes) => (
						<Actionable attributes={{ ...attributes, style: { cursor: 'default' } }}>
							<Badge rounded variant='faded' color={profit < 0 ? 'critical' : 'positive'}>
								<Text
									variant='caption-1'
									attributes={{ style: { letterSpacing: '-0.01em', fontWeight: 500, lineHeight: '20px' } }}
								>
									{(Math.round(profit) < 0 ? Math.round(profit) : '+' + Math.round(profit)) + '%'}
								</Text>
							</Badge>
						</Actionable>
					)}
				</Tooltip>
			</S.Header>
			<S.Footer>
				<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
					{title}
				</Text>
				{titleTooltip && (
					<Tooltip position='top' text={titleTooltip}>
						{(attributes) => (
							<Actionable
								attributes={{ ...attributes, style: { cursor: 'default', display: 'flex', alignItems: 'center' } }}
							>
								<SvgComponent name='question-line' />
							</Actionable>
						)}
					</Tooltip>
				)}
			</S.Footer>
		</S.Container>
	);
};
