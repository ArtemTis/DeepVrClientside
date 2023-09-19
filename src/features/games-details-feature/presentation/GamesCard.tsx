
import { Link, useLocation } from 'react-router-dom';
import img from '../../../assets/Img.png';

import "./cardStyles.css"
import { GAMES_DETAILS_PATH } from '../../../lib/utils/routeConstants';
import { IGame } from '../../../lib/utils/types';

const GamesCard:React.FC<{game: IGame}> = ({game}) => {
    const location = useLocation();
    return (
        <Link to={`${GAMES_DETAILS_PATH}/${game.id}`} state={{ previousLocation: location }}>
            <div className="card">
                <img src={game.logo} alt={game.title} />
                <div className="card-info">
                    <div className="card-info__text">
                        <div className="card__title">{game.title}</div>
                        <div className="card__text">{game.guest_min}-{game.guest_max} персоны · {game.time_duration} мин · {game.age_limit}+</div>
                    </div>
                    <button className="card-button">{game.price} ₽</button>
                </div>
            </div>
        </Link>
    )
}

export default GamesCard;
