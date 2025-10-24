import React, { FC } from 'react';
import { Text } from 'reshaped/bundle';
import * as S from './TrashResult.styled';
import { TrashItem } from '../TrashItem/TrashItem';
import { TRASH_OPTIONS } from '../../../shared/utility/Constants/trashOptions';
import { TrashEmpty } from '../TrashEmpty/TrashEmpty';

interface ITrashResultProps {
	filter: { value: string; label: string };
	data: ITrash;
}

export const TrashResult: FC<ITrashResultProps> = ({ filter, data }) => {
	return (
		<>
			{filter.value === 'all' ? (
				<>
					{Object.entries(data).map((trashGroup) => (
						<S.TrashGroup key={trashGroup[0]}>
							<Text
								variant='body-1'
								color='neutral'
								attributes={{ style: { marginBottom: '12px', fontWeight: '700', letterSpacing: '-0.02em' } }}
							>
								{TRASH_OPTIONS.find((option) => option.value === trashGroup[0])?.label}
							</Text>
							<S.TrashList>
								{trashGroup[1]?.map((trashItem) => (
									<TrashItem key={trashItem.id} data={trashItem} groupName={trashGroup[0]} />
								))}
							</S.TrashList>
						</S.TrashGroup>
					))}
				</>
			) : (
				<>
					{Object.entries(data).find((trashGroup) => trashGroup[0] === filter.value)?.[1].length ? (
						<S.TrashGroup>
							<Text
								variant='body-1'
								color='neutral'
								attributes={{ style: { marginBottom: '12px', fontWeight: '700', letterSpacing: '-0.02em' } }}
							>
								{filter.label}
							</Text>
							<S.TrashList>
								{Object.entries(data)
									.find((trashGroup) => trashGroup[0] === filter.value)?.[1]
									.map((item) => (
										<TrashItem key={item.id} data={item} groupName={filter.value} />
									))}
							</S.TrashList>
						</S.TrashGroup>
					) : (
						<TrashEmpty filter={filter} />
					)}
				</>
			)}
		</>
	);
};
