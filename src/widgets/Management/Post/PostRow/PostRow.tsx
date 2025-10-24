import React, { FC, useState } from 'react';
import * as S from './PostRow.styled';
import { PostMenu } from '../PostMenu/PostMenu';

interface IPostRowProps {
	data: IManagementPost;
	currentPosts: string[];
}

export const PostRow: FC<IPostRowProps> = ({ data, currentPosts }) => {
	const { id, position, users_count } = data;

	const [isRowHovered, setIsRowHovered] = useState(false);

	return (
		<S.TableRow
			isHovered={isRowHovered}
			onMouseEnter={() => setIsRowHovered(true)}
			onMouseLeave={() => setIsRowHovered(false)}
		>
			<S.TableRowCell variant='caption-1'>{position}</S.TableRowCell>
			<S.TableRowCell variant='caption-1'>{users_count}</S.TableRowCell>
			<PostMenu isVisible={isRowHovered} id={id} name={position} currentPosts={currentPosts} />
		</S.TableRow>
	);
};
