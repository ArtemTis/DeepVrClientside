
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../../assets/Img.png';

import "./cardStyles.css"
import { BOOKING_PATH, GAMES_DETAILS_PATH } from '../../../lib/utils/routeConstants';
import { IGame } from '../../../lib/utils/types';
import { useDispatch } from 'react-redux';
import { setGame, setTypeGame } from '../../booking-feature/store/slice';

const GamesCard: React.FC<{ game: IGame }> = ({ game }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        dispatch(setGame(game));
    }

    const openModal = () => {
        navigate(`${GAMES_DETAILS_PATH}/${game.id}`, { state: { previousLocation: location } });
    }

    return (
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
    )
}

export default GamesCard;
