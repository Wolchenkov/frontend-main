import { FC } from 'react';
import * as S from './FileDetailModal.styled';
import { Button, Text } from 'reshaped/bundle';
import { formatFileSize } from '../../../shared/utility/Utils';
import { SvgComponent } from '../../../shared';
import Link from 'next/link';
import { fileTypes } from '../../../shared/utility/Constants/fileTypes';
import { format, parseISO } from 'date-fns';

interface IFileDetailModal {
	active: boolean;
	deactivate: () => void;
	attachment: IFileInTask;
}

const FileDetailModal: FC<IFileDetailModal> = ({ deactivate, active, attachment }) => {
	return (
		<S.MyModal active={active} onClose={deactivate} padding={0}>
			<S.Header>
				<div>
					<Text variant='body-2' attributes={{ style: { color: 'white', letterSpacing: '-0.02em' } }}>
						{attachment.file_name}
					</Text>
					{attachment.custom_properties?.custom_headers?.created_at && (
						<S.TextLowPriority variant='caption-1'>
							{attachment.custom_properties?.custom_headers?.user_name +
								' ' +
								format(parseISO(attachment.custom_properties?.custom_headers?.created_at), 'dd.MM.yy, HH:mm')}
						</S.TextLowPriority>
					)}
				</div>
				<S.RightSide>
					<S.TextLowPriority variant='caption-1'>{formatFileSize(attachment.size)}</S.TextLowPriority>
					<Link href={attachment.original_url}>
						<SvgComponent style={{ cursor: 'pointer' }} name='download-white' />
					</Link>
					<SvgComponent
						onClick={deactivate}
						style={{ cursor: 'pointer', pointerEvents: 'all' }}
						name='close-line-white'
					/>
				</S.RightSide>
			</S.Header>
			<S.Main>
				<S.MyAvatar
					squared
					icon={
						<div style={{ transform: 'scale(1.25)' }}>
							<SvgComponent name={fileTypes[attachment.extension] || 'sticky-note'} />
						</div>
					}
				/>
				<Text variant='body-1' attributes={{ style: { fontWeight: 600, letterSpacing: '-0.02em' } }}>
					Предварительный просмотр файла недоступен
				</Text>
				<Link href={attachment.original_url}>
					<Button variant='outline' color='white' size='small' endIcon={<SvgComponent name='download-16' />}>
						{`Скачать файл (${formatFileSize(attachment.size)})`}
					</Button>
				</Link>
			</S.Main>
		</S.MyModal>
	);
};

export default FileDetailModal;
