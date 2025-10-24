import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useGetOurTeamsQuery } from '../../../store/teams/teamsApi';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useCreateGroupMutation } from '../../../store/groups/groupsApi';

export function useAddGroupModalController(active: boolean, onClose: () => void) {
	const addGroupInputRef = useRef<HTMLInputElement>(null);
	const showToast = useShowToast();
	const [createGroup] = useCreateGroupMutation();
	const { data: ourTeams } = useGetOurTeamsQuery();

	const [inputValue, setInputValue] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(true);
	const [errorText, setErrorText] = useState<string>('Error text');
	const [teamId, setTeamId] = useState<number | undefined>(undefined);

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				addGroupInputRef.current?.focus();
			}, 100);
		}
	}, [active]);

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setIsValid(true);
		setInputValue(e.target.value);
	};

	const onCloseModal = () => {
		onClose();
		setInputValue('');
		setIsValid(true);
	};

	const sendNewGroup = () => {
		createGroup({ name: inputValue.trim(), team_id: teamId })
			.unwrap()
			.then(() => {
				setInputValue('');
				onClose();
				showToast('Группа создана');
			})
			.catch((error) => {
				if (error.status === 422) {
					setIsValid(false);
					setErrorText('Такое название уже существует, введите другое название');
				}
			});
	};

	function addTeamsInGroup(_fieldName: string, fieldValue: number | undefined) {
		setIsValid(true);
		setTeamId(fieldValue);
	}

	return {
		errorText,
		addGroupInputRef,
		changeHandler,
		inputValue,
		onCloseModal,
		isValid,
		ourTeams,
		sendNewGroup,
		addTeamsInGroup,
		teamId,
	};
}
