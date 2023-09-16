

import playersIcon from "../../../Assets/console 1.svg";
import timeIcon from "../../../Assets/clock 1.svg";
import ageIcon from "../../../Assets/vr-glasses 2.svg";

import "./modalStyles.css"
import { Modal } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Slider from "./Slider";

const ModalContainer = (props: { location: Location }) => {
    const location = props.location;
    const navigate = useNavigate();

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

    return (
        <>
            <Modal centered open={isModalOpen} closeIcon={null} onCancel={handleCancel} width={1000} footer={null}>
                <div className="modalContainer">
                    {/* <div className="galeryContainer">
                        <img src="https://i.pinimg.com/originals/03/46/56/03465604bc3c3b876735816ed4dca695.jpg" alt="" />
                    </div> */}
                    <Slider />
                    <div className="infoContainer">
                        <div className="info_title">{title} {id}</div>
                        <div className="info_genre">Жанр: <span>{genre}</span></div>
                        <div className="modal_img_row">
                            <div className="modal__param">
                                <img className="info_game" src={playersIcon} alt="number of players" />
                                <div className="img__info">{minNumber}-{maxNumber}</div>
                            </div>
                            <div className="modal__param">
                                <img className="info_game" src={timeIcon} alt="time of game" />
                                <div className="img__info">{time} мин.</div>
                            </div>
                            <div className="modal__param">
                                <img className="info_game" src={ageIcon} alt="age of players" />
                                <div className="img__info">{age}+</div>
                            </div>
                        </div>
                        <div className="info_title_desc">Описание игры</div>
                        <div className="info_desc">
                            Перенеситесь в прошлое, чтобы посмотреть, сможете ли вы изменить ситуацию, из которой, казалось - не было выхода Что произошло в ночь аварии? А что было потом? Найдите ответы на вопросы, которые до сих пор оставались без ответа
                        </div>
                        <button className="info_button">Забронировать</button>
                    </div>
                </div >
            </Modal>
        </>
    )
}

export default ModalContainer;