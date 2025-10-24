import React, { Dispatch, FC, SetStateAction } from 'react';
import * as S from './TableRate.styled';
import { Text } from 'reshaped/bundle';
import { TableRateRow } from './TableRateRow/TableRateRow';

interface ITableRateProps {
	rates: fetchingDictionaryTypeWork[];
	onChange: Dispatch<SetStateAction<fetchingDictionaryTypeWork[]>>;
}

export const TableRate: FC<ITableRateProps> = ({ rates, onChange }) => {
	return (
		<S.TableRate>
			<S.TableRateHeader>
				<Text
					variant='caption-1'
					color='neutral-faded'
					attributes={{ style: { lineHeight: '20px', fontWeight: '500', letterSpacing: '-0.01em' } }}
				>
					Должность
				</Text>
				<Text
					variant='caption-1'
					color='neutral-faded'
					attributes={{ style: { lineHeight: '20px', fontWeight: '500', letterSpacing: '-0.01em' } }}
				>
					₽/час
				</Text>
			</S.TableRateHeader>
			{rates?.map((rate) => (
				<TableRateRow key={rate.id} data={rate} onChange={onChange} />
			))}
		</S.TableRate>
	);
};
