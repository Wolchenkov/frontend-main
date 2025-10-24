import { FC } from 'react';
import { Divider, Text } from 'reshaped/bundle';
import styled from 'styled-components';

const MyText = styled(Text)`
	font-weight: 500;
	letter-spacing: -0.01em;
	line-height: 20px;
	text-align: start;
`;

export const TableHead: FC = () => {
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
			</tr>
			<tr>
				<td colSpan={2}>
					<Divider />
				</td>
			</tr>
		</thead>
	);
};
