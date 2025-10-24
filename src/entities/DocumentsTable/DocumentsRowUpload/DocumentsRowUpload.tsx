import { FC } from 'react';
import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

import { Text, Avatar, Loader } from 'reshaped/bundle';
import * as S from './DocumentsRowUpload.styled';

interface IDocumentsRowUploadProps {
	upload: { name: string; loaded: number };
}

const DocumentsRowUpload: FC<IDocumentsRowUploadProps> = ({ upload }) => {
	const { name, loaded } = upload;

	return (
		<S.Row>
			<S.NameColumn>
				<Loader size='small' />
				<Text variant='caption-1'>{loaded + '%'}</Text>
				<Text variant='caption-1' attributes={{ style: { paddingLeft: '8px', color: '#898B8F' } }}>
					{name.split('.').slice(0, -1).join('.')}
				</Text>
			</S.NameColumn>
			<div>{<Avatar color='positive' initials='АМ' size={6} />}</div>
			<Text variant='caption-1' attributes={{ style: { color: '#898B8F' } }}>
				{format(new Date(), 'dd.MM.yyyy', { locale: ru })}
			</Text>
			<Text variant='caption-1' attributes={{ style: { color: '#898B8F' } }}>
				{name.split('.').pop()}
			</Text>
			<div></div>
		</S.Row>
	);
};

export default DocumentsRowUpload;
