import React, { FC, useEffect, useRef, useState } from 'react';
import * as S from './AddPostModal.styled';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';
import { SvgComponent } from '../../../shared';
import { useShowToast } from '../../../shared/utility/Hooks';
import { useAddPostMutation } from '../../../store/management/managementApi';

interface IAddPostModalProps {
	currentPosts: string[];
	isActive: boolean;
	closeModal: () => void;
}

export const AddPostModal: FC<IAddPostModalProps> = ({ currentPosts, isActive, closeModal }) => {
	const AddPostInputRef = useRef<HTMLInputElement>(null);
	const [postName, setPostName] = useState('');
	const [isPostNameValid, setIsPostNameValid] = useState(false);

	const showToast = useShowToast();
	const [addPost] = useAddPostMutation();

	const handleCloseModal = () => {
		closeModal();
		setPostName('');
	};

	const handleAddPost = () => {
		closeModal();
		setPostName('');
		addPost({
			name: postName,
		})
			.unwrap()
			.then(() => {
				showToast('Должность добавлена');
			})
			.catch((error) => {
				showToast(`Ошибка! ${error?.data?.message}`);
			});
	};

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				AddPostInputRef.current?.focus();
			}, 100);
		}
	}, [isActive]);

	useEffect(() => {
		const newIsPostNameValid = currentPosts
			.map((currentPost) => currentPost.toLowerCase())
			.includes(postName.trim().toLowerCase());
		setIsPostNameValid(!newIsPostNameValid);
	}, [currentPosts, postName]);

	return (
		<Modal size='660px' padding={0} active={isActive} onClose={handleCloseModal}>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
						Новая должность
					</Text>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={handleCloseModal}
				/>
			</View>
			<Divider />
			<View padding={4}>
				<View paddingBottom={10} attributes={{ style: { position: 'relative' } }}>
					<S.AddPostInput
						name='name'
						ref={AddPostInputRef}
						placeholder='Название должности'
						value={postName}
						onChange={(e) => setPostName(e.target.value)}
						autoComplete='off'
					/>
					{!isPostNameValid && (
						<S.AddPostError color='critical' variant='caption-1'>
							Такая должность уже существует, введите другое название
						</S.AddPostError>
					)}
				</View>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button color='primary' size='small' disabled={!postName.trim() || !isPostNameValid} onClick={handleAddPost}>
					<Text variant='caption-1'>Добавить</Text>
				</Button>
			</View>
		</Modal>
	);
};
