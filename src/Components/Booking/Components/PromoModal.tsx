import { Modal } from "antd";
import "../BookingStyles.css";

import { useEffect, useRef, useState } from "react";
import { FormError } from "../../Common/FormFields/FormError";
import { TextInputNonForm } from "../../Common/FormFields/TextInputNonForm";
import { ISummaryResponse } from "../../../Utils/types";
import { AppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { selectToken, selectUser } from "../../../Utils/redux/auth/selectors";
import { selectGame, selectPlayersCount } from "../../../Utils/redux/booking/selectors";
import { Api } from "../../../Utils/api";

import closeIcon from "../../../Assets/closeIcon.svg";
import { LoadIcon } from "../../Common/Markup/LoadIcon";
import { useDispatch } from "react-redux";
import { getSummary, postValidatePromo } from "../../../Utils/redux/summary/asyncActions";
import { selectSummary } from "../../../Utils/redux/summary/selectors";
import { ReqStatus } from "../../../Utils/enums";

interface Props {
  isOpen: boolean;
  onSubmit: (result: string) => void;
  onCancel: () => void;
  value?: string;
}

export const PromoModal: React.FC<Props> = ({
  isOpen,
  onCancel,
  onSubmit,
  value,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const game = useAppSelector(selectGame);
  const count = useAppSelector(selectPlayersCount);

  const summary = useAppSelector(state => state.summaryReducer.summary);
  const validatePromo = useAppSelector(state => state.summaryReducer.promo);

  const reqStatus = useAppSelector(state => state.summaryReducer.reqStatus === ReqStatus.pending);
  const textError = useAppSelector(state => state.summaryReducer.textError);

  const promoReqStatus = useAppSelector(state => state.summaryReducer.promoReqStatus === ReqStatus.pending);

  useEffect(() => {

    dispatch(getSummary({
      game_id: game?.id ?? -1,
      guest_count: count ?? -1,
      user_id: user?.id,
    }))

    onChange();
  }, [game, count, user]);

  const onChange = () => {

    dispatch(postValidatePromo({
      game: game?.id ?? -1,
      price: summary?.price ?? 0,
      token,
      promo_code: inputRef.current?.value ?? "",
    }))

  };

  const submit = () => {
    onSubmit(inputRef.current?.value ?? "");
  };

  const Footer = () => (
    <div className="modal-promo-footer">
      <button
        className={`modal-promo-btn ${validatePromo ? "" : "modal-promo-btn-inactive"
          }`}
        onClick={validatePromo ? submit : undefined}
      >
        Применить
      </button>
    </div>
  );

  return (
    <>
      {isOpen && (
        <Modal
          open={isOpen}
          onCancel={onCancel}
          footer={<Footer />}
          closeIcon={<img src={closeIcon} alt="close" />}
        >
          <div className="modal-promo-content">
            <div className="modal-promo-title">Введите промокод</div>

            <FormError errorMsg={textError} />
            <TextInputNonForm
              placeholder="Промокод"
              inputRef={inputRef}
              defaultValue={value}
              afterElem={<>{reqStatus && <LoadIcon />}</>}
              statusClassName={
                !validatePromo
                  ? "modal-promo-error-input"
                  : promoReqStatus
                    ? "modal-promo-success-input"
                    : ""
              }
              onChange={onChange}
            />
            <div className="modal-promo-description">
              Место для информации о том как и где можно получить промокод.
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
