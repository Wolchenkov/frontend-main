import { Dispatch, FC, SetStateAction } from 'react';
import { Text } from 'reshaped/bundle';
import styled from 'styled-components';
import { getInitials } from '../../../shared/utility/Utils';
import { AvatarCustom } from '../../../shared';

interface IOneMemberProps {
	member: IMember;
	isSelected: boolean;
	setAddUserData: Dispatch<SetStateAction<IMember[]>>;
}

const Container = styled.div<{ isSelected: boolean }>`
	background-color: ${(props) => props.isSelected && '#e9e9eb'};
	cursor: pointer;
	padding: 8px 12px;
	display: flex;
	align-items: center;
	gap: 4px;
	border-radius: 6px;
`;

const OneMember: FC<IOneMemberProps> = ({ member, isSelected, setAddUserData }) => {
	function onSelect() {
		if (isSelected) {
			setAddUserData((prev) => [...prev.filter(({ id }) => id !== member.id)]);
		} else setAddUserData((prev) => [...prev, member]);
	}
	return (
		<Container isSelected={isSelected} onClick={onSelect}>
			<AvatarCustom
				src={
					(member as { avatar: string; name: string }).avatar ? (member as { avatar: string; name: string }).avatar : ''
				}
				color='positive'
				initials={getInitials(
					(member as { avatar: string; name: string }).name ? (member as { avatar: string; name: string }).name : ''
				)}
				size={6}
			/>
			<Text variant='body-medium-2'>{(member as { avatar: string; name: string }).name}</Text>
		</Container>
	);
};

export default OneMember;
