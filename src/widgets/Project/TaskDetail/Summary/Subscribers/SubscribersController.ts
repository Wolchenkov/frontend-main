import { useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'reshaped/bundle';
import { getSortedPersonOptions, getSortedPersonSubscribers } from '../../../../../shared/utility/Utils';
import { useWindowDimensions } from '../../../../../shared/utility/Hooks';
import { useRouter } from 'next/router';
import { useUpdateIssueMutation } from '../../../../../store/projects/projectsApi';
interface ISubscribersProps {
	taskState: ITaskDetail;
	setTaskState: React.Dispatch<React.SetStateAction<ITaskDetail | null>>;
	dataProject: IOneProject;
	refetchTaskData: any;
}
export const useSubscribersController = ({
	taskState,
	setTaskState,
	refetchTaskData,
	dataProject,
}: ISubscribersProps) => {
	const { height } = useWindowDimensions();
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const [updateIssue] = useUpdateIssueMutation();
	// подписчики
	const subscriberRef = useRef<HTMLDivElement>(null);
	const {
		active: isDropdownSubscribersActive,
		activate: activateSubscribersDropdown,
		deactivate: deactivateSubscribersDropdown,
	} = useToggle(false); // дропдаун для смены подписчиков

	const [subscribers, setSubscribers] = useState<IMember[]>([]);
	const [shownSubscribers, setShownSubscribers] = useState<IMember[]>(subscribers);
	const [selectedSubscribers, setSelectedSubscribers] = useState<IMember[] | undefined>(taskState.subscribers);
	const [filterSubscribers, setFilterSubscribers] = useState('');

	useEffect(() => {
		if (JSON.stringify(selectedSubscribers) !== JSON.stringify(taskState.subscribers)) {
			setTaskState((prev) => {
				if (prev) {
					return {
						...prev,
						subscribers: selectedSubscribers,
					};
				} else return prev;
			});

			const body = { subscribers: selectedSubscribers?.map(({ id }) => id) };
			const payload = { projectSlug, body, projectIssueId: taskState.id };
			updateIssue(payload).then(() => refetchTaskData());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedSubscribers]);

	useEffect(() => {
		setSubscribers(getSortedPersonOptions([...dataProject.clientMembers, ...dataProject.usersMember]));
	}, [dataProject.clientMembers, dataProject.usersMember]);

	useEffect(() => {
		setShownSubscribers(
			subscribers.filter((option) => option.name.toLowerCase().includes(filterSubscribers.toLowerCase()))
		);
	}, [filterSubscribers, subscribers]);

	const handlePillSubscribersButtonClick = () => {
		isDropdownSubscribersActive ? deactivateSubscribersDropdown() : activateSubscribersDropdown();
		selectedSubscribers?.length
			? setSubscribers(getSortedPersonSubscribers(subscribers, selectedSubscribers, 'selected'))
			: setSubscribers(getSortedPersonOptions(subscribers));
		setShownSubscribers(subscribers);
		setFilterSubscribers('');
	};

	const handleOptionClick = (member: IMember) => {
		activateSubscribersDropdown();
		const isAlreadySelected = selectedSubscribers?.some((selected) => selected.id === member.id);
		if (isAlreadySelected) {
			setSelectedSubscribers(selectedSubscribers?.filter((selected) => selected.id !== member.id));
		} else {
			selectedSubscribers && setSelectedSubscribers([...selectedSubscribers, member]);
		}
	};
	const dropDownSubscribersMaxHeight = useMemo(() => {
		if (!subscriberRef.current || !height) return 'none';
		const { top: searchTopCoord, height: searchHeight } = subscriberRef.current.getBoundingClientRect();
		const maxHeight = height - searchTopCoord - searchHeight - 40;
		return `${maxHeight}px`;
	}, [height]);

	return {
		isDropdownSubscribersActive,
		deactivateSubscribersDropdown,
		subscriberRef,
		handlePillSubscribersButtonClick,
		selectedSubscribers,
		dropDownSubscribersMaxHeight,
		filterSubscribers,
		setFilterSubscribers,
		shownSubscribers,
		handleOptionClick,
	};
};
