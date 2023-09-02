import { Button, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { Api } from "../../../../lib/utils/api";
import { BonusCard } from "../components/BonusCrad";
import { OrdersAllPopup } from "../../../../lib/ui/Popups/OrdersAllPopup";
import { SettingsPopup } from "../../../../lib/ui/Popups/SettingsPopup";
import { CitySelectPopup } from "../../../../lib/ui/Popups/CitySelectPopup";

import "./AccountStyles.css";

import gearIcon from "../../../../assets/gearIcon.svg";
import arrowRight from "../../../../assets/arrow-right.svg";
import logoutIcon from "../../../../assets/logoutIcon.svg";
import logoBonus1 from "../../../../assets/logo-bonus1-light.svg";
import logoBonus2 from "../../../../assets/logo-bonus2-light.svg";
import logoBonus3 from "../../../../assets/logo-bonus3-light.svg";
import styled from "styled-components";
import close from "../../../../assets/close-cross.svg"
import warning from "../../../../assets/warning.svg"
import { IGetBonusesInfoResponse, IOrderHistoryItem } from "../../../../lib/utils/types";
import { selectSelectedCity, selectToken, selectUser } from "../../../auth-feature/store/selectors";
import { setSelectedCity, setToken, setUser } from "../../../auth-feature/store/slice";
import { LoadWrapper } from "../../../../lib/ui/LoadWrapper";
import { OrderInfoRow } from "../components/OrderInfoRow";
import Ticket from "../components/Ticket";
import { HorizontalScrollArea } from "../../../../lib/ui/HorizontalScrollArea";
import { LoadIcon } from "../../../../lib/ui/LoadIcon";

let tempPopups: Array<React.ReactElement> = [];

export const Profile: React.FC = () => {
  const [bonuses, setBonuses] = useState<IGetBonusesInfoResponse>();
  const [history, setHistory] = useState<Array<IOrderHistoryItem>>();
  const [isLoadingBonuses, setIsLoadingBonuses] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  const citySelected = useAppSelector(selectSelectedCity);

  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const [popupWindows, setPopupWindows] = useState<Array<React.ReactElement>>(
    []
  );

  useEffect(() => {
    setIsLoadingBonuses(true);
    Api.getBonusesInfo({ token })
      .then((res) => {
        setIsLoadingBonuses(false);
        setBonuses(res.data);
      })
      .catch((err) => console.log("error at getBonusesSummary:", err))
      .finally(() => setIsLoadingBonuses(false));

    setIsLoadingHistory(true);
    setIsLoadingCity(true);
    user &&
      Promise.all([
        Api.getHistory(user.id),
        Api.getAllCities(),
        Api.getUserCity(token),
      ])
        .then(([history, cities, selectedCity]) => {
          if (Api.checkStatus(history) && Api.checkStatus(cities)) {
            if (Api.checkStatus(selectedCity)) {
              const c = cities.data.find(
                (d) => d.name === selectedCity.data?.city
              );
              dispatch(setSelectedCity(c));
              setIsLoadingCity(false);
            }
            return Promise.all([
              history.data,
              ...history.data.map((order) => {
                console.log(order)
                console.log(cities)
                order.location = cities.data.find((c) => c.id == +order.location_id);
                const ids = JSON.parse(order.games_id) as Array<number>;
                return Promise.all([
                  ...ids.map((gameId) =>
                    Api.getGameInfo(order.location?.code ?? "", gameId)
                  ),
                ]).then((games) => {
                  order.games = games
                    .filter((g) => Api.checkStatus(g))
                    .map((g) => g.data);
                  return order;
                });
              }),
            ]).then(([history]) => {
              setHistory(history);
              setIsLoadingCity(false);
              setIsLoadingHistory(false);
            });
          }
        })
        .catch((err) => console.log("error at getHistory:", err))
        .finally(() => {
          setIsLoadingCity(false);
          setIsLoadingHistory(false);
        });

  }, []);

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

  const lastPopup = popupWindows[(popupWindows.length ?? 0) - 1] ?? undefined;
  tempPopups = popupWindows;

  const addPopup = (elem: React.ReactElement) => {
    const popups = [...tempPopups];
    popups.push(elem);
    setPopupWindows(popups);
  };

  const removeLastPopup = () => {
    let popups = [...tempPopups];
    const newLength = tempPopups.length - 1;
    popups = popups.slice(0, newLength >= 0 ? newLength : 0);
    setPopupWindows(popups);
  };

  return (
    <Row justify="center">
      <div className="profile-wrapper">
        {!!lastPopup ? (
          <>{lastPopup}</>
        ) : (
          <>
            <StyledHeader>
              <StyledBackBtn>
              </StyledBackBtn>
              <StyledTitle>
                Профиль
              </StyledTitle>
              <StyledSettingsBtn
                onClick={() =>
                  addPopup(
                    <SettingsPopup
                      addPopup={addPopup}
                      onBackClick={removeLastPopup}
                    />
                  )
                }>
                Настройки
                <img
                  src={gearIcon}
                  alt="Открыть настройки профиля"
                />
              </StyledSettingsBtn>
            </StyledHeader>

            <ProfileBody>
              <ProfileLeft>
                <div className="profile-divide">
                  <div className="profile-divide-header">
                    <span>Заказы</span>
                    <span
                      className="profile-order-info-more"
                      onClick={() => {
                        addPopup(
                          <OrdersAllPopup
                            history={history}
                            onBackClick={removeLastPopup}
                          />
                        );
                      }}
                    >
                      Смотреть все
                    </span>
                  </div>
                  <LoadWrapper isLoading={isLoadingHistory} height={1}>
                    {history &&
                      history.slice(-3).map((order) => {
                        return <OrderInfoRow order={order} key={order.id} />;
                      })}
                  </LoadWrapper>
                </div>

                <TicketList className="profile-divide">
                  <Ticket />
                </TicketList>

                <Warning>
                  <img src={warning} alt="warning icon" />
                  <h3>Ваши бонусы скоро сгорят. Успейте воспользоваться до 10.04.2022</h3>
                  <img src={close} alt="close cross" />
                </Warning>
              </ProfileLeft>


              <ProfileRight>
                <div
                  className="profile-divide"
                  onResize={() => console.log("resize")}
                >
                  <div className="profile-divide-header">Баланс</div>
                  <LoadWrapper isLoading={isLoadingBonuses} height={1}>
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
                    onClick={() =>
                      addPopup(<CitySelectPopup onBackClick={removeLastPopup} />)
                    }
                  >
                    <span>Выбрать город</span>
                    <span className="profile-divide-header-option">
                      {isLoadingCity ? (
                        <LoadIcon />
                      ) : (
                        <>{citySelected ? citySelected.name : "Не выбрано"}</>
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
                    onClick={() =>
                      addPopup(<CitySelectPopup onBackClick={removeLastPopup} />)
                    }
                  >
                    <span>О приложении</span>
                  </div>
                  <div className="divide-line" />
                  <div className="profile-divide-btn-full">
                    Форма обратной связи
                  </div>
                </div>
              </ProfileRight>
            </ProfileBody>

          </>
        )}
      </div>
    </Row>
  );
};


const StyledSettingsBtn = styled.div`
  cursor: pointer;
  border-radius: 24px;
  background: #FFF;
  padding: 10px 18px;
  color: #24313F;
  font-family: 'SF Pro Display';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;


  display: inline-flex;
  align-items: center;
  box-sizing: inherit;


  /* position: absolute; */
	top: 24px;
	left: 300px;

  img{
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }
`

const StyledTitle = styled.h1`
  margin: 0;
  color: var(--white, #FFF);
  text-align: center;
  font-family: 'SF Pro Display';
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: 180%; /* 82.8px */
  letter-spacing: 1px;

  grid-area: A;
`

const StyledHeader = styled.div`
  /* position: relative; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;

  width: 1220px;
`

const StyledBackBtn = styled.div`
  width: 102px;
`

const ProfileBody = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 600px);
  grid-auto-flow: column;
  gap: 20px;
  
  max-width: 1720px;
`

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const TicketList = styled.div`
  display: flex;
  gap: 20px;
`

const Warning = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 30px;
  border-radius: 16px;
  background: var(--f-9-d-450, #F9D450);

  h3{
    color: var(--050411, #050411);
    font-family: Gilroy;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; 
    margin: 0;
  }
  img:last-child{
    cursor: pointer;
  }
`