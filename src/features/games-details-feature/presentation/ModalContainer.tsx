

import playersIcon from "../../../assets/console 1.svg";
import timeIcon from "../../../assets/clock 1.svg";
import ageIcon from "../../../assets/vr-glasses 2.svg";

import "./modalStyles.css"
import { Modal } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Slider from "./Slider";
import styled from "styled-components";
import { Api } from "../../../lib/utils/api";
import { useAppSelector } from "../../../app/store";
import { selectGames } from "../../games-feature/store/games/selectors";
import { useDispatch } from "react-redux";
import { setGame, setTypeGame } from "../../booking-feature/store/slice";
import { BOOKING_PATH } from "../../../lib/utils/routeConstants";
import { IGame } from "../../../lib/utils/types";

const ModalContainer = (props: { location: Location }) => {
    const location = props.location;
    const navigate = useNavigate();
    const idGame = useParams().id;
    const dispatch = useDispatch();

    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCancel = () => {
        navigate('/', { replace: true });
        setIsModalOpen(false);
    };

    const title = 'Survival';
    const genre = "шутер";
    const minNumber = 2;
    const maxNumber = 4;
    const time = 40;
    const age = 12;

    let gameById: IGame | undefined;
    if (idGame) {
        gameById = useAppSelector(selectGames).find(game => `${game.id}` === idGame);
    }
    console.log(gameById);

    const goToBooking = (e: React.MouseEvent) => {
        e.stopPropagation();

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
        dispatch(setGame(gameById));
    }
    

    return (
        <StyledModal centered open={isModalOpen} closeIcon={null} onCancel={handleCancel} width={1000} footer={null}>
            <div className="modalContainer">
                {/* <div className="galeryContainer">
                        <img src="https://i.pinimg.com/originals/03/46/56/03465604bc3c3b876735816ed4dca695.jpg" alt="" />
                    </div> */}
                <Slider images={gameById}/>
                <div className="infoContainer">
                    <div className="info_title">{gameById?.title}</div>
                    <div className="info_genre">Жанр: <span>{gameById?.genre}</span></div>
                    <div className="modal_img_row">
                        <div className="modal__param">
                            <img className="info_game" src={playersIcon} alt="number of players" />
                            <div className="img__info">{gameById?.guest_min}-{gameById?.guest_max}</div>
                        </div>
                        <div className="modal__param">
                            <img className="info_game" src={timeIcon} alt="time of game" />
                            <div className="img__info">{gameById?.time_duration} мин.</div>
                        </div>
                        <div className="modal__param">
                            <img className="info_game" src={ageIcon} alt="age of players" />
                            <div className="img__info">{gameById?.age_limit}+</div>
                        </div>
                    </div>
                    <div className="info_title_desc">Описание игры</div>
                    <div className="info_desc">
                        {gameById?.description}
                        {/* Перенеситесь в прошлое, чтобы посмотреть, сможете ли вы изменить ситуацию, из которой, казалось - не было выхода Что произошло в ночь аварии? А что было потом? Найдите ответы на вопросы, которые до сих пор оставались без ответа */}
                    </div>
                    <button className="info_button" onClick={goToBooking}>Забронировать</button>
                </div>
            </div >
        </StyledModal>
    )
}

export default ModalContainer;

const StyledModal = styled(Modal)`
        .ant-modal-content {
        padding: 0 !important;
        background: transparent !important;
    }

    .ant-modal-close{
        right: 30px;
    }

    @media screen and (max-width: 730px) {
        .ant-modal-close{
            top: 40px;
            right: 46px;
        }
    }
`