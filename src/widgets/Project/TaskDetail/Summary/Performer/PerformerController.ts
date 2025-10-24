import { useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { getSortedPersonOptions, getSortedPersonSubscribers } from '../../../../../shared/utility/Utils';
import { useUpdateIssueMutation } from '../../../../../store/projects/projectsApi';
import { useWindowDimensions } from '../../../../../shared/utility/Hooks';

interface ITaskSummaryProps {
	taskState: ITaskDetail;
	setTaskState?: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	setChildState?: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	dataProject: IOneProject;
	refetchTaskData: any;
}

export const usePerformerController = ({
	taskState,
	setTaskState,
	setChildState,
	dataProject,
	refetchTaskData,
}: ITaskSummaryProps) => {
	const { slug: projectSlug } = dataProject;
	const {
		active: isDropdownPerformerActive,
		activate: activatePerformerDropdown,
		deactivate: deactivatePerformerDropdown,
	} = useToggle(false); // дропдаун для смены исполнителя
	const pillRef = useRef<HTMLDivElement>(null);
	const { height } = useWindowDimensions();

	const [options, setOptions] = useState<IMember[]>([]);
	const [shownOptions, setShownOptions] = useState<IMember[]>(options);
	const [selectedOption, setSelectedOption] = useState<IMember | null>((taskState.delegate as IMember | null) ?? null);
	const [filter, setFilter] = useState('');

	const [updateIssue] = useUpdateIssueMutation();

	useEffect(() => {
		setSelectedOption(taskState.delegate as IMember | null);
	}, [taskState.delegate]);

	useEffect(() => {
		if (selectedOption?.id === taskState.delegate_id || selectedOption === null) return;
		setTaskState &&
			setTaskState((prev) => {
				if (prev) {
					return {
						...prev,
						delegate: { ...selectedOption, role: '' },
						delegate_id: selectedOption?.id,
					};
				} else return prev;
			});
		setChildState &&
			setChildState((prev) => {
				if (prev) {
					return {
						...prev,
						children: [
							...prev.children.map((child) => {
								if (child.id === taskState.id)
									return { ...child, delegate: { ...selectedOption, role: '' }, delegate_id: selectedOption?.id };
								else return child;
							}),
						],
					};
				} else return prev;
			});

		const body = { delegate_id: selectedOption?.id };
		const payload = { projectSlug, body, projectIssueId: taskState.id };
		updateIssue(payload).then(() => refetchTaskData());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

	useEffect(() => {
		setOptions(getSortedPersonOptions(dataProject.usersMember));
	}, [dataProject.usersMember]);

	useEffect(() => {
		setShownOptions(options.filter((option) => option.name.toLowerCase().includes(filter.toLowerCase())));
	}, [filter, options]);

	const handlePillButtonClick = () => {
		isDropdownPerformerActive ? deactivatePerformerDropdown() : activatePerformerDropdown();
		selectedOption
			? setOptions(getSortedPersonSubscribers(options, [selectedOption], 'selected'))
			: setOptions(getSortedPersonOptions(options));
		setShownOptions(options);
		setFilter('');
	};

	const dropDownMaxHeight = useMemo(() => {
		if (!pillRef.current || !height) return 'none';
		const { top: searchTopCoord, height: searchHeight } = pillRef.current.getBoundingClientRect();
		const maxHeight = height - searchTopCoord - searchHeight - 40;
		return `${maxHeight}px`;
	}, [height]);

	return {
		isDropdownPerformerActive,
		pillRef,
		handlePillButtonClick,
		dropDownMaxHeight,
		filter,
		setFilter,
		shownOptions,
		selectedOption,
		setSelectedOption,
	};
};
