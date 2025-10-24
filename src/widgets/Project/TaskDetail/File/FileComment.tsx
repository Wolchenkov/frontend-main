import { FC } from 'react';
import * as S from './File.styled';
import { SvgComponent } from '../../../../shared';
import { Text } from 'reshaped/bundle';
import { fileTypes } from '../../../../shared/utility/Constants/fileTypes';
import { formatFileSize } from '../../../../shared/utility/Utils';

interface FileWithId {
	file: File;
	id: number;
}

interface IFileProps {
	file: FileWithId;
	delFile: (id: number) => void;
}

export const FileComment: FC<IFileProps> = ({ file, delFile }) => {
	return (
		<>
			<S.File>
				<SvgComponent name={fileTypes[file.file.name.split('.').at(-1) || ''] || 'sticky-note'} />
				<Text
					variant='caption-1'
					attributes={{
						style: { fontWeight: 500, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis' },
					}}
				>
					{file.file.name}
				</Text>
				<Text
					variant='caption-1'
					color='neutral-faded'
					attributes={{ style: { fontWeight: 500, letterSpacing: '-0.01em', marginRight: 8 } }}
				>
					{formatFileSize(file.file.size)}
				</Text>
				<S.DeleteIcon
					onClick={(e) => {
						e.stopPropagation();
						delFile(file.id);
					}}
				>
					<SvgComponent name='close-line' />
				</S.DeleteIcon>
			</S.File>
		</>
	);
};
