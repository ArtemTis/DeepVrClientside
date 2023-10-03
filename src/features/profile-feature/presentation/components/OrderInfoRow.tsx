import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { curencyFormat, dateFormatDayMonth } from "../../../../lib/utils/format";
import useGameType from "../../../../lib/utils/hooks/useGameTypes";
import { IBookingFields, IBookingHistory, IOrderHistoryItem } from "../../../../lib/utils/types";
import { selectGameTypes } from "../../../games-feature/store/gamesType/selectors";
import "../pages/AccountStyles.css";
import { gamesTypes } from "../../../games-feature/store/gamesType/asyncActions";

interface Props {
  order: IOrderHistoryItem;
}

export const OrderInfoRow: React.FC<Props> = ({ order }) => {

  return (
    <div className="profile-order-info">
      <div className="profile-order-info-row profile-order-info-row-header">
        <span className="profile-order-info-span">
          № {order.id.slice(-5)}
        </span>
        <span className="profile-order-info-span">
          {order.priceInfo ? curencyFormat.format(order.priceInfo.price) : 1}
        </span>
      </div>
      {
        order.bookings.map((booking) => (

          <BookingHistory booking={booking} key={booking.id}/>
        ))
      }

    </div>
  );
};

interface BookingHistoryProps {
  booking: IBookingHistory
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ booking }) => {
  const dispatch = useAppDispatch();
  const countLastDigit = booking.guestCount % 10;

  const ending =
    countLastDigit === 1
      ? "а"
      : countLastDigit >= 2 && countLastDigit <= 4
        ? "ы"
        : "";

  const gameTypes = useGameType();

  console.log('gameType: ' + gameTypes + "booking: " + booking.game.gameTypeId);
  
  const gameTypesName = gameTypes.find(type => type.id === booking.game.gameTypeId)

  return (
    <div className="profile-order-info-row">
      <span className="profile-order-info-span">{`${booking.guestCount
        } персон${ending} | ${booking.game.titleOverride} | ${gameTypesName}`}</span>
      <span className="profile-order-info-row-date">
        {`от ${dateFormatDayMonth.format(new Date(booking.bookingDate))}`}
      </span>
    </div>
  )
}