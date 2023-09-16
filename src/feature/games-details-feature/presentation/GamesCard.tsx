
import { Link, useLocation } from 'react-router-dom';
import img from '../../../Assets/Img.png';

import "./cardStyles.css"
import { GAMES_DETAILS_PATH } from '../../../Utils/routeConstants';

const GamesCard = () => {
    const location = useLocation();
    return (
        <>
            {Array.from({ length: 8 }, (_, index) =>
                <Link to={`${GAMES_DETAILS_PATH}/${index}`} key={index} state={{ previousLocation: location }}>
                    <div className="card">
                        <img src={img} alt="" />
                        <div className="card-info">
                            <div className="card-info__text">
                                <div className="card__title">CHERNOBYL</div>
                                <div className="card__text">2-4 персоны · 40 мин · 12+</div>
                            </div>
                            <button className="card-button">1050 ₽</button>
                        </div>
                    </div>
                </Link>
            )}
        </>
    )
}

export default GamesCard;
