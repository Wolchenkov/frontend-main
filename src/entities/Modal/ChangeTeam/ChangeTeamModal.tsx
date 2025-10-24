import React, { FC, useState } from 'react';
import { Button, Divider, Modal, Text, View } from 'reshaped/bundle';

import { PillChangeTeam } from '../../Pills/ChangeTeam/PillChangeTeam';
import { getInitials } from '../../../shared/utility/Utils';
import styled from 'styled-components';
import { AvatarCustom, SvgComponent } from '../../../shared';

interface IRefreshTeamProps {
	activeModalChangeTeam: boolean;
	deactivateModalChangeTeam: () => void;
	row: UserForTeam;
	title: string;
	approve: (teamId: number) => void;
}

const MyText = styled(Text)`
	letter-spacing: -0.01em;
`;
export const ChangeTeamModal: FC<IRefreshTeamProps> = ({
	activeModalChangeTeam,
	deactivateModalChangeTeam,
	row,
	title,
	approve,
}) => {
	const [newTeam, setNewTeam] = useState<number>(0);

	return (
		<Modal
			size='660px'
			active={activeModalChangeTeam}
			onClose={() => {
				setNewTeam(0);
				deactivateModalChangeTeam();
			}}
			padding={0}
		>
			<View padding={4} direction='row' align='center' attributes={{ style: { justifyContent: 'space-between' } }}>
				<Modal.Title>
					<MyText variant='body-medium-2'>Сменить команду</MyText>
				</Modal.Title>
				<SvgComponent
					name='close-line-modal'
					style={{ cursor: 'pointer', pointerEvents: 'all' }}
					onClick={() => {
						setNewTeam(0);
						deactivateModalChangeTeam();
					}}
				/>
			</View>
			<Divider />
			<View padding={4}>
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingBottom: 64 }}>
					<View direction='column' gap={2}>
						<MyText variant='caption-1' color='neutral-faded'>
							Участник
						</MyText>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<AvatarCustom
								src={row.attributes?.avatar ? row.attributes?.avatar : ''}
								color='positive'
								initials={getInitials(row?.attributes?.name ? row?.attributes?.name : '')}
								size={6}
							/>
							<MyText variant='body-1'>{row?.attributes?.name}</MyText>
						</div>
					</View>
					<View direction='column' gap={2}>
						<MyText variant='caption-1' color='neutral-faded'>
							Текущая команда
						</MyText>
						<MyText variant='body-1'>{title}</MyText>
					</View>
				</div>

				<PillChangeTeam newTeam={newTeam} setNewTeam={setNewTeam} titleTeam={title} />
			</View>
			<Divider />
			<View direction='row-reverse' padding={4}>
				<Button
					disabled={newTeam === 0}
					onClick={() => {
						approve(newTeam);
						setNewTeam(0);
					}}
					color='primary'
					type='button'
					size='small'
				>
					Сохранить
				</Button>
			</View>
		</Modal>
	);
};
