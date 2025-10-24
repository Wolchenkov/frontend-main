/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import * as S from './Trash.styled';
import { TrashHeader } from './TrashHeader/TrashHeader';
import { TrashPanel } from './TrashPanel/TrashPanel';
import { TrashResult } from './TrashResult/TrashResult';
import { TRASH_OPTIONS } from '../../shared/utility/Constants/trashOptions';
import { useGetTrashQuery } from '../../store/trash/trashApi';
import { Loader } from 'reshaped/bundle';
import { TrashEmpty } from './TrashEmpty/TrashEmpty';

export const Trash: FC = () => {
	const [trashFilter, setTrashFilter] = useState(TRASH_OPTIONS[0]);
	const [trash, setTrash] = useState<ITrash | null>(null);

	const {
		data: trashData,
		isSuccess: isTrashDataSuccess,
		isLoading: isTrashDataLoading,
		refetch: refetchTrash,
	} = useGetTrashQuery();

	useEffect(() => {
		refetchTrash();
	}, []);

	useEffect(() => {
		if (isTrashDataSuccess) {
			setTrash(trashData);
		}
	}, [isTrashDataSuccess, trashData]);

	return (
		<S.Trash>
			{isTrashDataLoading ? (
				<S.TrashLoader>
					<Loader size='medium' />
				</S.TrashLoader>
			) : (
				<S.TrashWrap>
					<TrashHeader data={trash} />

					{trash && Object.keys(trash).length ? (
						<>
							<TrashPanel filter={trashFilter} setFilter={setTrashFilter} />
							<TrashResult filter={trashFilter} data={trash} />
						</>
					) : (
						<>
							<TrashPanel filter={trashFilter} setFilter={setTrashFilter} />
							<TrashEmpty filter={trashFilter} />
						</>
					)}
				</S.TrashWrap>
			)}
		</S.Trash>
	);
};
