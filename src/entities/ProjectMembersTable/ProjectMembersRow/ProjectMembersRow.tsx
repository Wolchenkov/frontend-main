import { FC, useState } from 'react';
import { Button, Divider, useToggle } from 'reshaped/bundle';
import * as S from './ProjectMembersRow.styled';
import { getInitials } from '../../../shared/utility/Utils';
import { AvatarCustom, SvgComponent } from '../../../shared';
import { ConfirmModal } from '../../Modal/ConfirmModal/ConfirmModal';

interface IProjectMembersRowProps {
	member: IMember;
	isClientTeam: boolean;
	index: number;
	delUser: (id: number) => void;
	managerId?: number;
}

const ProjectMembersRow: FC<IProjectMembersRowProps> = ({ member, index, delUser, managerId }) => {
	const [isHoveredRow, setIsHoveredRow] = useState(false);
	const { active, activate, deactivate } = useToggle(false);

	function confirmDel() {
		delUser(member.id);
		deactivate();
	}
	return (
		<S.Row
			hover={isHoveredRow}
			active={active}
			onMouseEnter={() => setIsHoveredRow(true)}
			onMouseLeave={() => setIsHoveredRow(false)}
		>
			{(index === 0 || index === 1) && <Divider />}
			<S.MainContainer>
				<S.LeftSide>
					<AvatarCustom
						src={
							(member as { avatar: string; name: string }).avatar
								? (member as { avatar: string; name: string }).avatar
								: ''
						}
						color='positive'
						initials={getInitials(
							(member as { avatar: string; name: string }).name ? (member as { avatar: string; name: string }).name : ''
						)}
						size={6}
					/>
					<S.MyText variant='caption-1'>{(member as { avatar: string; name: string }).name}</S.MyText>
				</S.LeftSide>
				<S.RightSide>
					{isHoveredRow && member.id !== managerId && (
						<Button size='small' variant='ghost' startIcon={<SvgComponent name='close-fill' />} onClick={activate} />
					)}
				</S.RightSide>
			</S.MainContainer>
			<Divider />
			<ConfirmModal
				text='Вы действительно хотите удалить участника?'
				active={active}
				deactivate={deactivate}
				confirmDel={confirmDel}
			/>
		</S.Row>
	);
};

export default ProjectMembersRow;
