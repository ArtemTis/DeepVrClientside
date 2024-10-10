import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { curencyFormat, dateFormatDayMonth } from "../../../../lib/utils/format";
import useGameType from "../../../../lib/utils/hooks/useGameTypes";
import { IBookingFields, IBookingHistory, IGame, IGameType, IOrderHistoryItem } from "../../../../lib/utils/types";
import { selectGameTypes } from "../../../games-feature/store/gamesType/selectors";
import "../pages/AccountStyles.css";
import { gamesTypes } from "../../../games-feature/store/gamesType/asyncActions";
import { selectGames } from "../../../games-feature/store/games/selectors";

interface Props {
  order: IOrderHistoryItem;
}

export const OrderInfoRow: React.FC<Props> = ({ order }) => {
  const gameTypes = useAppSelector(selectGameTypes);
  const games = useAppSelector(selectGames);

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

          <BookingHistory booking={booking} key={booking.id} gameTypes={gameTypes} games={games} />
        ))
      }

    </div>
  );
};

interface BookingHistoryProps {
  booking: IBookingHistory;
  gameTypes: IGameType[];
  games: IGame[];
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ booking, gameTypes, games }) => {
  const countLastDigit = booking.guestCount % 10;

  const ending =
    countLastDigit === 1
      ? "а"
      : countLastDigit >= 2 && countLastDigit <= 4
        ? "ы"
        : "";

  const gameInBooking = games.find(game => game.id === booking.gameId);

  // const gameTypesName = gameTypes.find(type => type.id === booking.game.gameTypeId);

  return (
    <div className="profile-order-info-row">
      <span className="profile-order-info-span">{`${booking.guestCount
        } персон${ending} | ${gameInBooking?.title} | ${gameInBooking?.game_type_title}`}</span>
      <span className="profile-order-info-row-date">
        {`от ${dateFormatDayMonth.format(new Date(booking.bookingDate))}`}
      </span>
    </div>
  )
}