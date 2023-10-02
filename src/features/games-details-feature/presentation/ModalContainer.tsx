

import playersIcon from "../../../assets/console 1.svg";
import timeIcon from "../../../assets/clock 1.svg";
import ageIcon from "../../../assets/vr-glasses 2.svg";

import "./modalStyles.css"
import { Modal } from "antd";
import { useEffect, useState } from "react";
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
import ModalInstance from "./ModalInstance";
import { selectGame } from "../../booking-feature/store/selectors";
import { selectGameTypes } from "../../games-feature/store/gamesType/selectors";

const ModalContainer = (props: { location: Location }) => {
    const location = props.location;
    const navigate = useNavigate();
    const idGame = useParams().id;

    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCancel = () => {
        navigate('/', { replace: true });
        setIsModalOpen(false);
    };

    let gameById: IGame | undefined;
    if (idGame) {
        gameById = useAppSelector(selectGames).find(game => `${game.id}` === idGame);
    }

    const selectedInstance = { id: 1, name: 'Все филиалы' };
    const [isInstanceModalOpen, setIsInstanceModalOpen] = useState<boolean>(selectedInstance ? false : true);

    const goToBooking = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(false);
        setIsInstanceModalOpen(true);
        
    }

    return (
        <>
            <StyledModal centered open={isModalOpen} closeIcon={null} onCancel={handleCancel} width={1000} footer={null}>
                <div className="modalContainer">
                    {/* <div className="galeryContainer">
                        <img src="https://i.pinimg.com/originals/03/46/56/03465604bc3c3b876735816ed4dca695.jpg" alt="" />
                    </div> */}
                    <Slider images={gameById} />
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

            <ModalInstance isModalOpen={isInstanceModalOpen} setIsModalOpen={setIsInstanceModalOpen} selectedInstance={selectedInstance} game={gameById!!} />
        </>
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