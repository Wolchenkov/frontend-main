import React, { FC, useEffect, useState } from 'react';
import * as S from './Post.styled';
import { PostRow } from './PostRow/PostRow';
import { SvgComponent } from '../../../shared';
import { useToggle } from 'reshaped/bundle';
import { AddPostModal } from '../../../entities/Modal/AddPost/AddPostModal';
import { useGetPostsQuery } from '../../../store/management/managementApi';

export const ManagementPost: FC = () => {
	const [myPosts, setMyPosts] = useState<IManagementPost[]>();

	const {
		active: isAddPostModalActive,
		activate: activateAddPostModal,
		deactivate: deactivateAddPostModal,
	} = useToggle(false);

	const { data: posts } = useGetPostsQuery();

	useEffect(() => {
		if (posts) {
			setMyPosts(posts);
		}
	}, [posts]);

	return (
		<>
			<S.Title variant='title-3'>Должности</S.Title>
			<S.Description variant='body-2'>
				Здесь вы можете добавить новую должность, отредактировать её название или удалить
			</S.Description>

			{myPosts ? (
				myPosts.length ? (
					<S.Table>
						<S.TableHead>
							<S.TableHeadCell variant='caption-1' color='neutral-faded'>
								Название
							</S.TableHeadCell>
							<S.TableHeadCell variant='caption-1' color='neutral-faded'>
								Участники
							</S.TableHeadCell>
						</S.TableHead>
						{myPosts.map((post) => (
							<PostRow key={post.id} data={post} currentPosts={myPosts.map(({ position }) => position)} />
						))}

						<S.AddButton
							variant='ghost'
							startIcon={<SvgComponent name='add-line' />}
							size='small'
							onClick={activateAddPostModal}
						>
							<S.AddButtonText variant='caption-1' color='neutral-faded'>
								Добавить
							</S.AddButtonText>
						</S.AddButton>
					</S.Table>
				) : (
					<S.Table>
						<S.AddButton
							variant='ghost'
							startIcon={<SvgComponent name='add-line' />}
							size='small'
							attributes={{ style: { padding: 0 } }}
							onClick={activateAddPostModal}
						>
							<S.AddButtonText variant='caption-1' color='neutral-faded'>
								Добавить
							</S.AddButtonText>
						</S.AddButton>
					</S.Table>
				)
			) : (
				<></>
			)}

			<AddPostModal
				currentPosts={myPosts?.map(({ position }) => position) ?? []}
				isActive={isAddPostModalActive}
				closeModal={deactivateAddPostModal}
			/>
		</>
	);
};
