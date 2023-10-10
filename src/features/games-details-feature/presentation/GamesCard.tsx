
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../../assets/Img.png';

import "./cardStyles.css"
import { BOOKING_PATH, GAMES_DETAILS_PATH } from '../../../lib/utils/routeConstants';
import { IGame } from '../../../lib/utils/types';
import { useDispatch } from 'react-redux';
import { setCredentials, setDate, setGame, setPlayersCount, setTime, setTypeGame } from '../../booking-feature/store/slice';
import { CitySelectHome } from '../../games-feature/presentation/components/CitySelectHome';
import ModalInstance from './ModalInstance';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { selectAllInstances, selectInstance } from '../../profile-feature/store/selectors';
import useGameType from '../../../lib/utils/hooks/useGameTypes';
import { gamesTypes } from '../../games-feature/store/gamesType/asyncActions';
import { selectGameTypes } from '../../games-feature/store/gamesType/selectors';

const GamesCard: React.FC<{ game: IGame }> = ({ game }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const selectedInstance = useAppSelector(selectInstance);
    const [isInstanceModalOpen, setIsInstanceModalOpen] = useState<boolean>(false);

    const instances = useAppSelector(selectAllInstances);
    const {gameTypes, isLoading} = useGameType();
    // useEffect(() => {
    //     dispatch(gamesTypes());
    // }, [])
    // const gameTypes = useAppSelector(selectGameTypes);

    const goToBooking = (e: React.MouseEvent) => {
        e.stopPropagation();
        // setIsInstanceModalOpen(true);

        if (instances.length > 1) {
            setIsInstanceModalOpen(true);
            console.log(game);
            console.log(gameTypes);
        } else {
            dispatch(gamesTypes());

            const gameTypeOfGame = gameTypes.find(type => type.id === game.gameTypeId);

            navigate(`${BOOKING_PATH}/3`);
            dispatch(setTypeGame(gameTypeOfGame));
            dispatch(setGame(game));
            dispatch(setPlayersCount(game.guest_min));

            dispatch(setDate(undefined));
            dispatch(setTime(undefined));
            dispatch(setCredentials(undefined));
        }
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
