import { PopupLayout } from "./PopupLayout";
import { useEffect, useState } from "react";
import ordoredIcon from "../../../assets/ordoredIcon.svg";
import unordoredIcon from "../../../assets/unordoredIcon.svg";
import "../../../features/profile-feature/presentation/pages/AccountStyles.css"
import { IOrderHistoryItem } from "../../utils/types";
import { OrderInfoRow } from "../../../features/profile-feature/presentation/components/OrderInfoRow";
import { OrderInfoRowEmpty } from "../../../features/profile-feature/presentation/components/OrderInfoRowEmpty";
import { useAppSelector } from "../../../app/store";
import { selectOrdersHistory } from "../../../features/profile-feature/store/selectors";


export const OrdersAllPopup: React.FC = () => {
  const [isOrderedDesc, setIsOrdered] = useState(false);
  const history = useAppSelector(selectOrdersHistory);
  const [historySorted, setHistorySorted] = useState<
    Array<IOrderHistoryItem> | undefined
  >(history);

  useEffect(() => {
    setHistorySorted(history);
  }, [history]);

  const toggleSort = () => {
    if (history) {
      setIsOrdered(!isOrderedDesc);
      setHistorySorted(isOrderedDesc ? history : [...history].reverse());
    }
  };

  return (
    <PopupLayout title="Заказы" >
      <div className="popup-order-table-header">
        Заказы
        <img
          src={isOrderedDesc ? ordoredIcon : unordoredIcon}
          alt="Сортировка"
          className="popup-order-table-header-icon"
          onClick={toggleSort}
        />
      </div>
      {historySorted &&
        historySorted.map((order) => {
          return <OrderInfoRow order={order} key={order.id} />;
        })}
      <OrderInfoRowEmpty />
    </PopupLayout>
  );
};
