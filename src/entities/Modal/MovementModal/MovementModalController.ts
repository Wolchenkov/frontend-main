import { useGetGroupsQuery } from '../../../store/groups/groupsApi';
import { useEffect, useState } from 'react';

interface IMovementGroup {
	id: number;
	name: string;
	projects: any;
	active: boolean;
}

export function useMovementModalController(deactivate: () => void) {
	const { data: currentGroups, isLoading } = useGetGroupsQuery();
	const [groups, setGroups] = useState<IMovementGroup[]>([]);

	useEffect(() => {
		if (currentGroups) {
			setGroups(
				currentGroups.map((group: IMovementGroup) => {
					return {
						...group,
						active: false,
					};
				})
			);
		}
	}, [currentGroups]);

	const onCloseModal = () => {
		deactivate();
		setGroups((prevState) => [...prevState.map((elem) => ({ ...elem, active: false }))]);
	};

	const isDisabledBtn = () => {
		const res = groups.find((elem) => elem.active);
		return !res;
	};

	const onSelectElement = (id: number) => {
		setGroups((prevState) => {
			return [
				...prevState.map((elem) => {
					if (elem.id === id) {
						return {
							...elem,
							active: true,
						};
					} else return { ...elem, active: false };
				}),
			];
		});
	};

	return {
		groups,
		isLoading,
		onSelectElement,
		isDisabledBtn,
		onCloseModal,
	};
}
