import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import * as S from './AddProjectStage.styled';
import { useAddNewStageMutation } from '../../../store/projects/projectsApi';
import { useRouter } from 'next/router';
import { SvgComponent } from '../../../shared';
import { useShowToast } from '../../../shared/utility/Hooks';
interface IAddTeamModalProps {
	active: boolean;
	onClose: () => void;
	size: string;
	projectIssueSort: IKanban[];
	projectSlug?: string;
}

export const AddProjectStageModal: FC<IAddTeamModalProps> = ({
	active,
	onClose,
	size,
	projectIssueSort,
	projectSlug,
}) => {
	const [stageName, setStageName] = useState(''); // название этапа
	const inputRef = useRef<HTMLInputElement>(null); // ссылка на инпут
	const [errorMessage, setErrorMessage] = useState(false); // валидация названия этапа

	useEffect(() => {
		if (active) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 100);
		}
	}, [active]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setErrorMessage(false);
		setStageName(e.target.value);
	};

	const closeModal = () => {
		onClose();
		setStageName('');
		setErrorMessage(false);
	};
	const [addStage] = useAddNewStageMutation();
	const [isClicked, setIsClicked] = useState(false);

	const showToast = useShowToast();
	const router = useRouter();
	const { slug } = router.query;
	function createStage() {
		if (
			projectIssueSort
				.map((el) => el.name.toLowerCase())
				.flat()
				.includes(stageName.trim().toLowerCase())
		) {
			setErrorMessage(true);
			return;
		}
		setErrorMessage(false);

		const body = { name: stageName.trim(), project_slug: projectSlug || slug };
		if (!isClicked) {
			setIsClicked(true);
			addStage(body).then(() => {
				onClose();
				showToast(`Этап «${stageName}» добавлен`);
				setStageName('');
				setIsClicked(false);
			});
		}
	}

	return (
		<>
			<S.MyModal size={size} active={active} onClose={closeModal} padding={0}>
				<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
					<Modal.Title>
						<S.MyText variant='body-medium-2'>Добавить этап</S.MyText>
					</Modal.Title>
					<SvgComponent
						name='close-line-modal'
						style={{ cursor: 'pointer', pointerEvents: 'all' }}
						onClick={closeModal}
					/>
				</View>
				<Divider />
				<View padding={4}>
					<View paddingBottom={errorMessage ? 7 : 13}>
						<S.MyInput
							value={stageName}
							ref={inputRef}
							placeholder='Введите название этапа'
							onChange={(e) => handleOnChange(e)}
						/>
						{errorMessage && (
							<Text
								color='critical'
								variant='caption-1'
								attributes={{ style: { fontWeight: '500', letterSpacing: '-0.01em', marginTop: 8 } }}
							>
								Такое название уже существует, введите другое название
							</Text>
						)}
					</View>
				</View>
				<Divider />

				<View direction='row' align='center' padding={4} justify='end'>
					<Button
						onClick={createStage}
						disabled={stageName.trim().length === 0 || errorMessage}
						color='primary'
						size='small'
					>
						Добавить
					</Button>
				</View>
			</S.MyModal>
		</>
	);
};
