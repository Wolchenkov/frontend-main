import React, { FC } from 'react';
import { Text } from 'reshaped/bundle';

export const Documents: FC = () => {
	return (
		<Text
			variant='body-strong-1'
			color='neutral'
			attributes={{ style: { margin: '0 8px 20px', letterSpacing: '-0.02em' } }}
		>
			Документы
		</Text>
	);
};
