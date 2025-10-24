import React, { Dispatch, FC, Fragment, SetStateAction } from 'react';
import * as S from './TypeWorkRow.styled';
import { Divider, Icon } from 'reshaped/bundle';
import { SvgComponent } from '../../../../shared';

interface ITypeWorkRow {
	typeWork: ITypeWorkReport;
	slug: string;
	activeTypeWork: string[];
	setActiveTypeWork: Dispatch<SetStateAction<string[]>>;
	value: string;
}

export const TypeWorkRow: FC<ITypeWorkRow> = ({ typeWork, slug, activeTypeWork, setActiveTypeWork, value }) => {
	const { time_amount_type_work, type_work, issue, spent } = typeWork;

	const actionValue = slug + type_work;
	function checkActiveTypeWork() {
		setActiveTypeWork((prev) =>
			prev.includes(actionValue) ? prev.filter((active) => active !== actionValue) : prev.concat(actionValue)
		);
	}
	return (
		<>
			<S.Row>
				<S.TypeWorkNameContainer>
					<Icon
						size={4}
						svg={<SvgComponent name='arrow-right-fill' onClick={checkActiveTypeWork} />}
						attributes={{
							style: { transform: `${activeTypeWork.includes(actionValue) ? 'rotate(90deg)' : 'none'}` },
						}}
					/>
					<S.MyText500 variant='caption-1' maxLines={1}>
						{type_work}
					</S.MyText500>
				</S.TypeWorkNameContainer>
				<div style={{ width: '186px' }} />
				{value === 'За весь период' && <div style={{ width: '126px' }} />}
				<S.ActualTimeContainer>
					<S.MyText500 variant='caption-1' maxLines={1}>
						{time_amount_type_work}
					</S.MyText500>
				</S.ActualTimeContainer>
				<S.FlexEndContainer>
					<S.MyText500 variant='caption-1' maxLines={1}>
						{spent?.toLocaleString('ru-RU')}
					</S.MyText500>
				</S.FlexEndContainer>
				<div style={{ width: '202px' }} />
			</S.Row>
			<Divider />
			<S.IssuesContainer active={activeTypeWork.includes(actionValue)}>
				{activeTypeWork.includes(actionValue) &&
					issue.map(({ id, name, time_amount_in_hour, spent }) => (
						<Fragment key={slug + type_work + id}>
							<S.IssueRow>
								<S.IssueName>
									<S.MyText500 variant='caption-1' maxLines={1}>
										{name}
									</S.MyText500>
								</S.IssueName>
								<div style={{ width: '186px' }} />
								{value === 'За весь период' && <div style={{ width: '126px' }} />}
								<S.ActualTimeContainer>
									<S.MyText500 variant='caption-1'>{time_amount_in_hour}</S.MyText500>
								</S.ActualTimeContainer>
								<S.FlexEndContainer>
									<S.MyText500 variant='caption-1'>{spent?.toLocaleString('ru-RU')}</S.MyText500>
								</S.FlexEndContainer>
								<div style={{ width: '202px' }} />
							</S.IssueRow>
							<Divider />
						</Fragment>
					))}
			</S.IssuesContainer>
		</>
	);
};
