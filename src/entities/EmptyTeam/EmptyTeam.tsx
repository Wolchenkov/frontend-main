import { FC } from 'react';
import { Avatar, Button, Text, View } from 'reshaped/bundle';
import { SvgComponent } from '../../shared';

interface IEmptyTeamProps {
	onClick: () => void;
}
export const EmptyTeam: FC<IEmptyTeamProps> = ({ onClick }) => {
	return (
		<View gap={4} align='center' justify='center' paddingTop={29}>
			<Avatar squared={true} icon={<SvgComponent name='group-neutral-faded-large' />} />
			<View align='center' gap={1}>
				<Text variant='body-1' attributes={{ style: { fontWeight: 600, letterSpacing: '-0.02em' } }}>
					Здесь пока нет команд
				</Text>
				<Text
					variant='caption-1'
					color='neutral-faded'
					attributes={{ style: { fontWeight: 500, letterSpacing: '-0.02em' } }}
				>
					Команды состоят из участников, которых можно добавить в проект
				</Text>
			</View>
			<Button onClick={onClick} size='small' color='white' variant='outline'>
				Создать новую команду
			</Button>
		</View>
	);
};
