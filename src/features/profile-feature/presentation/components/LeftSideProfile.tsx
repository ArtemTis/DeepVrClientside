import React from 'react'
import styled from 'styled-components';
import Ticket from './Ticket';
import { LoadWrapper } from '../../../../lib/ui/LoadWrapper';
import { OrderInfoRow } from './OrderInfoRow';
import { OrdersAllPopup } from '../../../../lib/ui/Popups/OrdersAllPopup';
import { RootState, useAppSelector } from '../../../../app/store';
import { selectOrdersHistory } from '../../store/selectors';
import { ReqStatus } from '../../../../lib/utils/enums';
import close from "../../../../assets/close-cross.svg"
import warning from "../../../../assets/warning.svg"
import { Link } from 'react-router-dom';
import { PROFILE_ORDERS_PATH } from '../../../../lib/utils/routeConstants';

const LeftSideProfile:React.FC = () => {

    const history = useAppSelector(selectOrdersHistory);
    const isLoading = useAppSelector((state: RootState) => state.profileReducer.reqStatus === ReqStatus.pending);

  return (
    <ProfileLeft>
    <div className="profile-divide">
      <div className="profile-divide-header">
        <span>Заказы</span>
        <Link to={`../${PROFILE_ORDERS_PATH}`}
          className="profile-order-info-more"
        >
          Смотреть все
        </Link>
      </div>
      <LoadWrapper isLoading={isLoading} height={1}>
        {history &&
          history.slice(0, 3).map((order) => {
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
  )
}

export default LeftSideProfile

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (max-width: 1250px) {
    max-width: 40vw;
  }
  @media screen and (max-width: 900px) {
    max-width: 90vw;
  }
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