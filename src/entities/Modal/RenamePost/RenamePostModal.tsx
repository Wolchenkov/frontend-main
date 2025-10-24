import React, { FC, useEffect, useRef, useState } from 'react';
import * as S from './RenamePostModal.styled';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';

interface IRenamePostModalProps {
	name: string;
	isActive: boolean;
	currentPosts: string[];
	closeModal: () => void;
	renamePost: (name: string) => void;
}

export const RenamePostModal: FC<IRenamePostModalProps> = ({
	name,
	isActive,
	currentPosts,
	closeModal,
	renamePost,
}) => {
	const renamePostInputRef = useRef<HTMLInputElement>(null);
	const [newPostName, setNewPostName] = useState(name);
	const [isPostNameValid, setIsPostNameValid] = useState(false);
	const [isShowError, setIsShowError] = useState(false);

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				renamePostInputRef.current?.focus();
			}, 100);
		}
	}, [isActive]);

	useEffect(() => {
		setNewPostName(name);
	}, [name, isActive]);

	useEffect(() => {
		const newIsPostNameValid = currentPosts
			.map((currentPost) => currentPost.toLowerCase())
			.includes(newPostName.trim().toLowerCase());
		setIsPostNameValid(!newIsPostNameValid);
	}, [currentPosts, newPostName]);

	useEffect(() => {
		setIsShowError(!isPostNameValid && newPostName.trim().toLowerCase() !== name.toLowerCase());
	}, [newPostName, name, isPostNameValid]);

	return (
		<Modal size='660px' padding={0} active={isActive} onClose={closeModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Переименовать должность
					</Text>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={closeModal}
				/>
			</View>
			<Divider />
			<View padding={4}>
				<View paddingBottom={10} attributes={{ style: { position: 'relative' } }}>
					<S.RenamePostInput
						name='name'
						ref={renamePostInputRef}
						placeholder={name}
						value={newPostName}
						onChange={(e) => setNewPostName(e.target.value)}
						autoComplete='off'
					/>
					{isShowError && (
						<S.RenamePostError variant='caption-1' color='critical'>
							Должность с таким названием уже существует
						</S.RenamePostError>
					)}
				</View>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button
					color='primary'
					size='small'
					disabled={!newPostName.trim() || !isPostNameValid}
					onClick={() => renamePost(newPostName.trim())}
				>
					<Text variant='caption-1'>Обновить</Text>
				</Button>
			</View>
		</Modal>
	);
};
