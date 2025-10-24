import * as S from './MovementModal.styled';
import { Button, Dismissible, Divider, Modal, Text, View, Loader, useToast, Icon } from 'reshaped/bundle';
import React, { FC } from 'react';
import { useMovementModalController } from './MovementModalController';
import { SvgComponent } from '../../../shared';
import { useMovementProjectFromGroupMutation } from '../../../store/groups/groupsApi';
import { useRouter } from 'next/router';

interface MovementModalProps {
	active: boolean;
	deactivate: () => void;
	projectName: string | undefined;
}
export const MovementModal: FC<MovementModalProps> = ({ active, deactivate, projectName }) => {
	const { groups, isLoading, onSelectElement, isDisabledBtn, onCloseModal } = useMovementModalController(deactivate);
	const [movementProject] = useMovementProjectFromGroupMutation();
	const router = useRouter();
	const { slug: projectSlug } = router.query;
	const toast = useToast();

	const onMovementProject = () => {
		const foundedGroup = groups.find((group) => group.active);

		if (foundedGroup) {
			movementProject({ id: foundedGroup.id, body: { projects: [{ slug: projectSlug }] } })
				.unwrap()
				.then(() => {
					onCloseModal();
					toast.show({
						size: 'small',
						color: 'inverted',
						text: (
							<Text variant='body-strong-2' attributes={{ style: { letterSpacing: '-0.01em', color: 'white' } }}>
								Проект перенесен
							</Text>
						),
						icon: <Icon svg={<SvgComponent name='zap' />} size={5} />,
					});
				})
				.catch((err: any) => {
					throw new Error(err);
				});
		}
	};

	return (
		<S.MovementModal size='660px' padding={0} active={active} onClose={onCloseModal}>
			<View padding={4}>
				<Dismissible
					closeAriaLabel='Закрыть'
					attributes={{ style: { display: 'flex', alignItems: 'center' } }}
					onClose={onCloseModal}
				>
					<Modal.Title>
						<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
							<p>
								Переместить проект <span style={{ fontWeight: '700' }}>{projectName}</span> в группу:
							</p>
						</Text>
					</Modal.Title>
				</Dismissible>
			</View>
			<Divider />
			<View>
				<S.MovementModalElementWrapper>
					{isLoading && <Loader size='medium' attributes={{ style: { margin: '10px auto' } }} />}
					{groups &&
						groups.map((group) => (
							<S.MovementModalElement key={group.id} onClick={() => onSelectElement(group.id)} active={group.active}>
								<SvgComponent name='folder-3-line-faded' />
								<Text
									attributes={{
										style: {
											letterSpacing: '-0.02em',
											fontWeight: '500',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											fontSize: '14px',
											marginLeft: '8px',
										},
									}}
									variant='body-medium-2'
								>
									{group.name}
								</Text>
							</S.MovementModalElement>
						))}
				</S.MovementModalElementWrapper>
			</View>
			<Divider />
			<View padding={4} align='end'>
				<Button color='primary' size='small' onClick={onMovementProject} disabled={isDisabledBtn()}>
					<Text variant='caption-1'>Переместить</Text>
				</Button>
			</View>
		</S.MovementModal>
	);
};
