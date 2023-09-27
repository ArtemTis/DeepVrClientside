import { Modal } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { NextButton } from '../../../lib/ui/NextButton';
import { useAppSelector } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { SelectInstanceList } from '../../../lib/ui/SelectInstanceList';
import { useNavigate } from 'react-router';
import { BOOKING_PATH } from '../../../lib/utils/routeConstants';
import { setGame, setTypeGame } from '../../booking-feature/store/slice';
import { IGame } from '../../../lib/utils/types';

interface IInstance {
    id: number,
    name: string
}

interface IProp {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedInstance: IInstance;
    game: IGame;
}

const ModalInstance:React.FC<IProp> = ({isModalOpen, setIsModalOpen, selectedInstance, game}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const isSelectedInstance = !!useAppSelector(selectInstance);
    const isSelectedInstance = !!selectedInstance;

    const [selected, setSelected] = useState<IInstance | undefined>(
        selectedInstance ?? undefined
    );

    const onSelect = (instance: IInstance | undefined) => {
        setSelected(instance);
    };

    const confirmm = () => {
        if (selected) {
            // dispatch(setSelectedInstance(selected));
            // dispatch(setInstance(selected));
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navigate(`/`);
      };

    const goToBooking = () => {
        // e.stopPropagation();

        navigate(`${BOOKING_PATH}/3`);
        dispatch(setTypeGame({
            "id": 1,
            "title": "Классика",
            "games": [
                {
                    "id": 2,
                    "externalId": "99e94140-b497-4479-9798-b3ae8f6455fa",
                    "titleOverride": "AltSpaceVR",
                    "priceOverride": 1000,
                    "logoOverride": "https://gipno.creatrix-digital.ru/storage/2023/08/17/4621589e68c02b3abe5fe01116ad3ccca1b26b9c.png",
                    "timeDuration": null,
                    "descriptionOverride": null,
                    "gameTypeId": 1
                }
            ],
            "fullGames": [
                {
                    "id": "2",
                    "owner_id": 1,
                    "name": "AltSpaceVR",
                    "use_key": 1,
                    "created_at": "2023-08-17T11:16:51.000000Z",
                    "updated_at": "2023-08-23T12:44:11.000000Z",
                    "title": "AltSpaceVR",
                    "slug": null,
                    "time_duration": null,
                    "price": 1000,
                    "is_active": 1,
                    "logo": "https://gipno.creatrix-digital.ru/storage/2023/08/17/4621589e68c02b3abe5fe01116ad3ccca1b26b9c.png",
                    "guest_min": null,
                    "guest_max": null,
                    "description": null,
                    "age_limit": null,
                    "images": null,
                    "video": null,
                    "genre": null,
                    "actual_build": {
                        "id": "99f971ac-0460-4de2-9903-08660c038829",
                        "game_id": "99e94140-b497-4479-9798-b3ae8f6455fa",
                        "version": "1.0",
                        "platform": "0",
                        "link": "com.altvr.AltspaceVR_Quest",
                        "created_at": "2023-08-25T12:25:30.000000Z",
                        "updated_at": "2023-08-25T12:25:30.000000Z"
                    }
                }
            ]
        }));
        dispatch(setGame(game));
        setIsModalOpen(false);
    }

    return (
        <StyledModal open={isModalOpen} footer={[]} onCancel={handleCancel}>
            <ModalWrapper>
                <SelectInstanceList selected={selected} onSelect={onSelect} />
                <NextButton onClick={goToBooking} isActive={!!selected}>
                    Выбрать
                </NextButton>
            </ModalWrapper>
        </StyledModal>
    )
}

export default ModalInstance

const StyledModal = styled(Modal)`
  margin: 0 auto;
  width: 25vw !important;
  min-width: 280px;

  border-radius: 16px;
background: var(--101-a-29, #191A29);

  img{
    cursor: default !important;
  }

  .ant-modal-close{
    cursor: default !important;
  }

  .ant-modal-close-x{
    cursor: pointer;
  }
`
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`