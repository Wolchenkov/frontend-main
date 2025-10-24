import { FC } from 'react';
import { Divider, Text } from 'reshaped/bundle';
import styled from 'styled-components';

const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 20px;
	color: #52555d;
`;

export const ExpensesHeader: FC = () => {
	return (
		<thead>
			<tr>
				<th style={{ width: '32.49%', paddingLeft: 20 }}>
					<MyText variant='caption-1' align='start'>
						Исполнитель
					</MyText>
				</th>
				<th style={{ width: '40.25%' }}>
					<MyText variant='caption-1' align='start'>
						Комментарий
					</MyText>
				</th>
				<th style={{ width: '7.96%' }}>
					<MyText variant='caption-1' align='center'>
						Дата
					</MyText>
				</th>
				<th style={{ width: '19.29%', paddingRight: 72 }}>
					<MyText variant='caption-1' align='end'>
						Сумма
					</MyText>
				</th>
			</tr>
			<tr>
				<td colSpan={4}>
					<Divider />
				</td>
			</tr>
		</thead>
	);
};
