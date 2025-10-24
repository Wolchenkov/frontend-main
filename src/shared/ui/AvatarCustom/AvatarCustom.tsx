import React, { FC } from 'react';
import * as S from './AvatarCustom.styled';
import Image from 'next/image';

export const ColorToBackground = {
	'neutral': '#E9E9EB',
	'neutral-faded': '#F4F5F7',
  'primary': '#FF6633',
	'primary-faded': '#FDEDE7',
	'positive': '#118D2E',
  'positive-faded': '#E6FEF3',
	'critical': '#DA0000',
	'critical-faded': '#FDE7E9',
};

export const ColorToTextColor = {
	'neutral': '#000000',
	'neutral-faded': '#14171F',
  'primary': '#FFFFFF',
	'primary-faded': '#FF6633',
	'positive': '#FFFFFF',
  'positive-faded': '#118D2E',
	'critical': '#FFFFFF',
	'critical-faded': '#CD1C28',
};

interface IAvatarCustomProps {
	size?: number;
	color?: string;
	src?: string;
	initials?: string;
}

export const AvatarCustom: FC<IAvatarCustomProps> = ({src, color = 'neutral', initials, size = 12}) => {
	return (
		<S.AvatarCustom size={size} color={color} className={color}>
      {src
				? <Image
						src={src}
						layout='fill'
						sizes={`${size * 4}px`}
						objectFit='cover'
						objectPosition='center'
						unoptimized
						alt=''/>
				: initials
					? <S.AvatarCustomInitials size={size} color={color}>{initials}</S.AvatarCustomInitials>
					: null}
		</S.AvatarCustom>
	);
};
