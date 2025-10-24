import { FC } from 'react';
import { Button, Dismissible, Divider, FormControl, Modal, Text, View } from 'reshaped/bundle';
import * as S from './ApplicationModal.styled';
import { Calendar } from './Calendar/Calendar';
import { Vacation } from './Vacation/Vacation';
import { useApplicationController } from './ApplicationController';

interface IApplicationModalProps {
	isActive: boolean;
	busyData: string[][];
	closeModal: () => void;
}

export const ApplicationModal: FC<IApplicationModalProps> = ({ isActive, busyData, closeModal }) => {
	const {
		vacationTypes,
		newApplication,
		comment,
		setComment,
		handleModalClose,
		changeApplicationData,
		createNewApplication,
	} = useApplicationController({ closeModal });

	return (
		<>
			{vacationTypes && (
				<S.ApplicationModal size='520px' padding={0} active={isActive} onClose={handleModalClose}>
					<View padding={4}>
						<Dismissible closeAriaLabel='Закрыть' onClose={handleModalClose}>
							<Modal.Title>
								<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
									Написать заявление
								</Text>
							</Modal.Title>
						</Dismissible>
					</View>
					<Divider />

					<View padding={4} paddingBottom={3} direction='row' gap={2}>
						<Calendar busyData={busyData} onChange={changeApplicationData} />
						<Vacation types={vacationTypes} onChange={changeApplicationData} />
					</View>

					<S.ApplicationCommentWrap>
						<FormControl>
							<FormControl.Label>Комментарий</FormControl.Label>
							<S.ApplicationComment
								value={comment}
								name='comment'
								placeholder='Введите комментарий'
								onChange={(evt) => setComment(evt.value)}
								inputAttributes={{ autoComplete: 'off' }}
							/>
						</FormControl>
					</S.ApplicationCommentWrap>

					<View direction='row' padding={4} justify='end' gap={1}>
						<Button size='small' onClick={handleModalClose}>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Отменить
							</Text>
						</Button>
						<Button
							color='primary'
							size='small'
							disabled={
								!(newApplication?.date_start && newApplication?.date_end && newApplication?.dictionary_type_vacation_id)
							}
							onClick={createNewApplication}
						>
							<Text variant='body-medium-2' attributes={{ style: { letterSpacing: '-0.02em' } }}>
								Отправить
							</Text>
						</Button>
					</View>
				</S.ApplicationModal>
			)}
		</>
	);
};
