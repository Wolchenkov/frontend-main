import { Text } from 'reshaped/bundle';
import styled from 'styled-components';

export const Editor = styled.div`
	width: 100%;
	& .ce-toolbar__plus {
		color: var(--rs-color-foreground-neutral-faded);

		&:hover {
			background: rgba(248, 248, 248, 1);
		}
	}

	& .ce-popover {
		max-height: none;
	}

	.ce-popover__items {
		display: flex;
		flex-direction: column;

		& [data-item-name='paragraph'] {
			order: 1;
		}
		& [data-item-name='header'] {
			order: 2;
		}
		& [data-item-name='image'] {
			order: 3;
		}
		& [data-item-name='attaches'] {
			order: 4;
		}
		& [data-item-name='link'] {
			order: 5;
		}
		& [data-item-name='list'] {
			order: 6;
		}
		& [data-item-name='delimiter'] {
			order: 7;
		}
		& [data-item-name='table'] {
			order: 8;
		}
	}

	& .image-tool .cdx-button,
	.cdx-attaches .cdx-button,
	.cdx-loader,
	.cdx-input.link-tool__input {
		border-radius: 8px;
		background-color: var(--background-neutral-faded, #f4f5f7);
		border: none;
		box-shadow: none;
		font-family: Inter;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		letter-spacing: -0.28px;
		color: #52555d;
	}

	& .image-tool--loading .image-tool__image {
		border-radius: 8px;
		border: 1px solid var(--border-neutral, #cfd0d3);
	}

	& .cdx-input {
		box-shadow: none;
		border-radius: 6px;
		border: 1px solid var(--border-neutral, #cfd0d3);
	}

	& .ce-popover-item:hover,
	.ce-toolbar__settings-btn:hover,
	.ce-inline-toolbar__dropdown:hover,
	.ce-inline-tool:hover,
	.ce-conversion-tool:hover {
		background: rgba(248, 248, 248, 1);
	}

	& .ce-popover-item__icon,
	.ce-conversion-tool__icon {
		box-shadow: none;
		background: transparent;
	}

	& .ce-block__content {
		caret-color: #f63;
		color: var(--rs-color-foreground-neutral);
	}

	& .ce-paragraph[data-placeholder]:empty::before {
		color: #898b8f;
	}

	& .ce-delimiter:before {
		background: var(--rs-color-border-neutral-faded);
		border: none;
		height: 1px;
		margin: 0;
		content: '';
		width: 100%;
	}

	& .ce-delimiter {
		line-height: 0;
		padding: 20px 0;
	}

	& .cdx-search-field {
		display: none;
	}
	& .codex-editor__redactor {
		padding: 0 !important;
		caret-color: #ff6633;
	}
	& .ce-block__content ul {
		list-style-type: disc !important; /* Убрать маркеры списка */
	}

	& .ce-block__content ol {
		list-style-type: decimal !important; /* Использовать числовые маркеры списка */
	}

	:focus-visible {
		outline: none !important;
	}
	& .cdx-block {
		padding: 0;
	}

	& .cdx-list {
		padding-left: 40px;
	}
`;

export const DropdownItemText = styled(Text)`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	padding-right: 26px;
	overflow: hidden;

	font-weight: 500;
	letter-spacing: -0.02em;
`;
