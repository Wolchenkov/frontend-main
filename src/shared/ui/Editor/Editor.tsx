import { FC, memo, useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Underline from '@editorjs/underline';
import Image from '@editorjs/image';
import Attaches from '@editorjs/attaches';
import Link from '@editorjs/link';
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import Tribute from 'tributejs';
import { ru } from './locales/ru';
import * as S from './Editor.styled';
import ReactDOMServer from 'react-dom/server';
import { Avatar } from 'reshaped/bundle';
import { getInitials } from '../../utility/Utils';

const TOOLS = {
	header: Header,
	image: Image,
	attaches: Attaches,
	link: Link,
	list: List,
	delimiter: Delimiter,
	table: Table,
	underline: Underline,
} as { [key: string]: any };

interface IEditorProps {
	placeholder?: string | false;
	data?: OutputData;
	onChange: React.Dispatch<React.SetStateAction<OutputData | undefined>>;
	tools: (keyof typeof TOOLS)[];
	id: string;
	fileUpload?: (file: File) => void;

	mentionValues?: { key: string; value: string; avatar: string | null }[];
	setMentions?: React.Dispatch<React.SetStateAction<number[]>>;
	readOnly?: boolean;
}
export const Editor: FC<IEditorProps> = ({
	placeholder,
	data,
	onChange,
	tools,
	id,
	fileUpload,
	mentionValues,
	setMentions,
	readOnly,
}) => {
	const ref = useRef<EditorJS>();

	useEffect(() => {
		if (!ref.current) {
			const editor = new EditorJS({
				holder: id,
				i18n: ru,
				tools: {
					...(tools.includes('header') && { header: { class: TOOLS.header, inlineToolbar: ['bold', 'italic'] } }),
					...(tools.includes('underline') && { underline: TOOLS.underline }),
					...(tools.includes('image') && {
						image: {
							class: TOOLS.image,
							config: {
								uploader: {
									uploadByFile(file: File) {
										if (fileUpload) {
											return fileUpload(file);
										}
									},
								},
							},
						},
					}),
					...(tools.includes('attaches') && {
						attaches: {
							class: TOOLS.attaches,
							config: {
								uploader: {
									uploadByFile(file: File) {
										if (fileUpload) {
											return fileUpload(file);
										}
									},
								},
								buttonText: 'Загрузите файл',
							},
						},
					}),
					...(tools.includes('link') && { link: TOOLS.link }),
					...(tools.includes('list') && { list: TOOLS.list }),
					...(tools.includes('delimiter') && { delimiter: TOOLS.delimiter }),
					...(tools.includes('table') && { table: TOOLS.table }),
				},
				data: data ? data : undefined,
				placeholder,
				readOnly,
				onReady() {
					if (mentionValues) {
						const tribute = new Tribute({
							collection: [
								{
									trigger: '@',
									values: mentionValues,
									lookup: 'key',
									menuItemTemplate: function (item) {
										const componentHTML = ReactDOMServer.renderToString(
											<>
												<Avatar
													src={item.original.avatar ? item.original.avatar : undefined}
													initials={getInitials(item.original.key)}
													size={6}
												/>
												<S.DropdownItemText variant='body-2'>{item.original.key}</S.DropdownItemText>
											</>
										);
										return componentHTML;
									},
									selectTemplate: function (item) {
										setMentions &&
											setMentions((prev) => {
												const newValue = !prev.includes(+item.original.value) ? +item.original.value : null;
												if (newValue !== null) {
													return [...prev, newValue];
												} else {
													return prev;
												}
											});
										return '@' + item.original.key;
									},
								},
							],
						});
						const element = document.getElementById(id);

						if (element) {
							tribute.attach(element);
						}
					}
				},
				async onChange(api) {
					const data = await api.saver.save();
					onChange(data);
				},
			});
			ref.current = editor;
		}

		return () => {
			if (ref.current && ref.current.destroy) {
				ref.current.destroy();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <S.Editor id={id} />;
};

export default memo(Editor);
