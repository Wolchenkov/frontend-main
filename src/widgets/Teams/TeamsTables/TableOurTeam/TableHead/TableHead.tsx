import { FC } from 'react';
import { Divider, Text } from 'reshaped/bundle';
import styled from 'styled-components';

const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 20px;
	text-align: start;
`;

interface ITableHeadProps {
	isRateVisible: boolean;
}
export const TableHead: FC<ITableHeadProps> = ({ isRateVisible }) => {
	return (
		<thead>
			<tr>
				<th style={{ padding: '0 20px' }}>
					<MyText variant='caption-1' color='neutral-faded'>
						Имя
					</MyText>
				</th>

				<th>
					<MyText variant='caption-1' color='neutral-faded'>
						Эл. почта
					</MyText>
				</th>
				<th>
					<MyText variant='caption-1' color='neutral-faded'>
						Роль
					</MyText>
				</th>
				{isRateVisible && (
					<th>
						<MyText variant='caption-1' color='neutral-faded'>
							Стоимость часа
						</MyText>
					</th>
				)}

				<th>
					<MyText variant='caption-1' color='neutral-faded'>
						Должность
					</MyText>
				</th>
			</tr>
			<tr>
				<td colSpan={isRateVisible ? 5 : 4}>
					<Divider />
				</td>
			</tr>
		</thead>
	);
};
