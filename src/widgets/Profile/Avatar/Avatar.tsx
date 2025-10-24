import { FC, useRef, useState } from 'react';
import { useShowToast } from '../../../shared/utility/Hooks';
import { Actionable, DropdownMenu, Icon, Loader, Text, useToast, useToggle } from 'reshaped/bundle';
import { useFileUploadMutation } from '../../../store/uploads/uploadsApi';
import { useDelAvatarMutation, useUploadAvatarMutation } from '../../../store/auth/authApi';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { getInitials } from '../../../shared/utility/Utils';
import * as S from './Avatar.styled';

interface IAvatarProps {
	user: IMember | undefined;
	refetch: any;
}

export const UserAvatar: FC<IAvatarProps> = ({ user, refetch }) => {
	const showToast = useShowToast();
	const toast = useToast();
	const [showCircle, setShowCircle] = useState(false);
	const [isUploading, setUploading] = useState(false);
	const { active, activate, deactivate } = useToggle();

	const [uloadFile] = useFileUploadMutation();
	const [uploadAvatar] = useUploadAvatarMutation();
	const fileInputRef = useRef<HTMLInputElement>(null);
	function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
		setShowCircle(false);
		const file = event.target.files?.[0];
		if (file) {
			setUploading(true);
			if (file?.size / 1024 / 1024 > 4) {
				setUploading(false);
				toast.show({
					color: 'critical',
					text: (
						<>
							<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em' } }}>
								Не удалось загрузить файл
							</Text>
							<Text variant='body-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Размер файла не должен превышать 4 Мб
							</Text>
						</>
					),
					icon: <Icon svg={<SvgComponent name='close-circle-white' />} size={6} />,
				});
				return;
			}

			uloadFile(file).then((response) => {
				if ('data' in response)
					uploadAvatar({ avatar: [{ uuid: response.data.uuid }] }).then(() => {
						refetch().then(() => setUploading(false));
					});
			});
		}
	}

	const [delAvatar] = useDelAvatarMutation();
	function deleteAvatar() {
		delAvatar().then(() => {
			refetch();
			showToast('Аватар удален');
		});
	}

	return (
		<S.AvatarContainer
			onMouseEnter={() => setShowCircle(true)}
			onMouseLeave={() => {
				setShowCircle(false);
				deactivate();
			}}
		>
			{isUploading ? (
				<S.AvatarLoader>
					<Loader size='small' />
				</S.AvatarLoader>
			) : (
				<AvatarCustom src={user?.avatar ? user.avatar : undefined} initials={getInitials(user?.name ?? '')} size={20} />
			)}
			{showCircle && (
				<S.AvatarDropdownMenu>
					<DropdownMenu active={active} onClose={deactivate} width='144px'>
						<DropdownMenu.Trigger>
							{(attributes) => (
								<Actionable {...attributes} onClick={active ? deactivate : activate}>
									<SvgComponent name='camera-line' />
								</Actionable>
							)}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item onClick={() => fileInputRef.current?.click()}>Загрузить</DropdownMenu.Item>
							<DropdownMenu.Item disabled={user?.avatar === null} onClick={deleteAvatar}>
								Удалить
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu>
				</S.AvatarDropdownMenu>
			)}
			<input
				type='file'
				ref={fileInputRef}
				style={{ display: 'none' }}
				accept='image/*'
				onChange={handleAvatarUpload}
			/>
		</S.AvatarContainer>
	);
};
