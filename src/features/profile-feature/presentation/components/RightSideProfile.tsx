import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CitySelectPopup } from '../../../../lib/ui/Popups/CitySelectPopup'
import { LoadIcon } from '../../../../lib/ui/LoadIcon'
import { BonusCard } from './BonusCrad'
import { HorizontalScrollArea } from '../../../../lib/ui/HorizontalScrollArea'
import { LoadWrapper } from '../../../../lib/ui/LoadWrapper'
import { RootState, useAppDispatch, useAppSelector } from '../../../../app/store'
import { selectToken, selectUser } from '../../../auth-feature/store/selectors'
import { selectBonuses, selectUserCity } from '../../store/selectors'
import { ReqStatus } from '../../../../lib/utils/enums'
import { getBonusesInfo, getHistory, getUserCity } from '../../store/asyncActions'
import { setToken, setUser } from '../../../auth-feature/store/slice'
import { Api } from '../../../../lib/utils/api'

import arrowRight from "../../../../assets/arrow-right.svg";
import logoutIcon from "../../../../assets/logoutIcon.svg";
import logoBonus1 from "../../../../assets/logo-bonus1-light.svg";
import logoBonus2 from "../../../../assets/logo-bonus2-light.svg";
import logoBonus3 from "../../../../assets/logo-bonus3-light.svg";
import { useNavigate } from 'react-router'
import { PROFILE_CITY_PATH } from '../../../../lib/utils/routeConstants'

const RightSideProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);
    const citySelected = useAppSelector(selectUserCity);
    console.log(user);
    console.log(citySelected);
    console.log(token);
    

    const bonuses = useAppSelector(selectBonuses);
    const isLoading = useAppSelector((state: RootState) => state.profileReducer.reqStatus === ReqStatus.pending);

    useEffect(() => {
        dispatch(getBonusesInfo());
        dispatch(getHistory(user?.id!!));
        dispatch(getUserCity());
    }, [])

    const bonusesRefs = {
        "1": useRef<HTMLDivElement>(),
        "2": useRef<HTMLDivElement>(),
        "3": useRef<HTMLDivElement>(),
    };

    const logOut = () => {
        dispatch(setUser(undefined));
        dispatch(setToken(undefined));
        Api.logout({ token }).then((res) => {
            if (Api.checkStatus(res)) {
            }
        });
    };


    return (
        <ProfileRight>
            <div
                className="profile-divide"
                onResize={() => console.log("resize")}
            >
                <div className="profile-divide-header">Баланс</div>
                <LoadWrapper isLoading={isLoading} height={1}>
                    <HorizontalScrollArea
                        firstElemRef={bonusesRefs["1"]}
                        lastElemRef={bonusesRefs["3"]}
                        viewportClassName="bonus-card-wrapper"
                        wrapperClassName="bonus-card-scroll-root"
                    >
                        <BonusCard
                            id="1"
                            cardRef={bonusesRefs["1"]}
                            header="Доступно"
                            value={bonuses?.quantity_all ?? 0}
                            image={logoBonus1}
                        />
                        <BonusCard
                            id="2"
                            cardRef={bonusesRefs["2"]}
                            header="Активно"
                            value={bonuses?.quantity_real ?? 0}
                            image={logoBonus2}
                        />
                        <BonusCard
                            id="3"
                            cardRef={bonusesRefs["3"]}
                            header="Временные"
                            value={bonuses?.quantity_expired ?? 0}
                            description={
                                bonuses?.next_expired_date
                                    ? `Бонусы истекают ${bonuses?.next_expired_date}`
                                    : undefined
                            }
                            image={logoBonus3}
                        />
                    </HorizontalScrollArea>
                </LoadWrapper>
            </div>

            <div className="profile-divide">
                <div
                    className="profile-divide-btn-full"
                    onClick={()=> navigate(`../${PROFILE_CITY_PATH}`)}
                    // onClick={() =>
                    //     addPopup(<CitySelectPopup  preselected={citySelected} />)
                    // }
                >
                    <span>Выбрать город</span>
                    <span className="profile-divide-header-option">
                        {isLoading ? (
                            <LoadIcon />
                        ) : (
                            <>{(citySelected?.name || user?.city.name) ?? "Не выбрано"}</>
                        )}
                        <img
                            src={arrowRight}
                            alt="Выбрать город"
                            className="profile-divide-header-img"
                        />
                    </span>
                </div>
                <div className="divide-line" />
                <div className="profile-divide-btn-full" onClick={logOut}>
                    Выйти из аккаунта
                    <img
                        src={logoutIcon}
                        alt="Выйти из аккаунта"
                        className="profile-divide-header-img"
                    />
                </div>
            </div>

            <div className="profile-divide">
                <div
                    className="profile-divide-btn-full"
                    // onClick={() =>
                    //     addPopup(<CitySelectPopup />)
                    // }
                >
                    <span>О приложении</span>
                </div>
                <div className="divide-line" />
                <div className="profile-divide-btn-full">
                    Форма обратной связи
                </div>
            </div>
        </ProfileRight>
    )
}

export default RightSideProfile

const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1250px) {
    max-width: 40vw;
  }
  @media screen and (max-width: 900px) {
    max-width: 100vw;
  }
`