
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../../assets/Img.png';

import "./cardStyles.css"
import { BOOKING_PATH, GAMES_DETAILS_PATH } from '../../../lib/utils/routeConstants';
import { IGame } from '../../../lib/utils/types';
import { useDispatch } from 'react-redux';
import { setGame, setTypeGame } from '../../booking-feature/store/slice';
import { CitySelectHome } from '../../games-feature/presentation/components/CitySelectHome';
import ModalInstance from './ModalInstance';
import { useState } from 'react';

const GamesCard: React.FC<{ game: IGame }> = ({ game }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectedInstance = { id: 1, name: 'Все филиалы' };
    const [isInstanceModalOpen, setIsInstanceModalOpen] = useState<boolean>(selectedInstance ? false : true);

    const goToBooking = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsInstanceModalOpen(true);
    }

    const openModal = () => {
        navigate(`${GAMES_DETAILS_PATH}/${game.id}`, { state: { previousLocation: location } });
    }

    return (
        <>
            <div className="card" onClick={openModal}>
                <img src={game.logo} alt={game.title} />
                <div className="card-info">
                    <div className="card-info__text">
                        <div className="card__title">{game.title}</div>
                        <div className="card__text">
                            {
                                (game.guest_min || game.guest_max) &&
                                <span>{game.guest_min}-{game.guest_max} персоны</span>
                            }
                            {
                                game.time_duration &&
                                <span>· {game.time_duration} мин</span>
                            }
                            {
                                game.age_limit &&
                                <span>· {game.age_limit}+</span>
                            }
                        </div>
                    </div>
                    <button className="card-button" onClick={e => goToBooking(e)}>{game.price} ₽</button>
                </div>
            </div>
            <ModalInstance isModalOpen={isInstanceModalOpen} setIsModalOpen={setIsInstanceModalOpen} selectedInstance={selectedInstance} game={game} />
        </>
    )
}

export default GamesCard;
