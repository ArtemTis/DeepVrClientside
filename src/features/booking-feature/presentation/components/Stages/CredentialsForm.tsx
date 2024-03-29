import React, { useEffect, useMemo, useState } from "react";
import { Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { StageLayout } from "./StageLayout";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { FormField } from "../../../../../lib/ui/FormFields/FormField";
import { PhoneInput } from "../../../../../lib/ui/FormFields/PhoneField";
import { FormCheckbox } from "../../../../../lib/ui/FormFields/FormCheckbox";
import { TextAreaInput } from "../../../../../lib/ui/FormFields/TextAreaInput";

import "../../pages/BookingStyles.css";
import "../../../../../lib/ui/CommonStyles.css";

import infoIcon from "../../../../../assets/infoIcon.svg";
import userIcon from "../../../../../assets/user-icon-liliac.svg";
import arrowRight from "../../../../../assets/arrow-right.svg";
import { selectIsAuthorised, selectUser } from "../../../../auth-feature/store/selectors";
import { selectCredentials } from "../../../store/selectors";
import { setCredentials } from "../../../store/slice";
import { ColLg } from "../../../../../lib/ui/ColLg";
import { PromoModal } from "../PromoModal";
import { ACCOUNT_PATH } from "../../../../../lib/utils/routeConstants";

const agreementHref = "/";
const bonusesInfoHref = "/";

export const CredentialsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  const isAuthorised = useAppSelector(selectIsAuthorised);
  const user = useAppSelector(selectUser);

  const credentials = useAppSelector(selectCredentials);

  const {
    register,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      ...credentials,
      name: !!credentials?.name ? credentials?.name : user?.name,
      phone: !!credentials?.phone ? credentials?.phone : user?.phone,
    },
  });

  const watchAllFields = useWatch({ control });

  const [isPromoActive, setIsPromoActive] = useState(!credentials?.useDiscount);
  const [areBonusesActive, setAreBonusesActive] = useState(!credentials?.promo);

  const values = useMemo(() => ({ ...watchAllFields, ...getValues() }), [watchAllFields]);


  useEffect(() => {
    if (values.phone && values.name && values.licenseAgree) {
      console.log(values);
      dispatch(setCredentials(values))
    }
  }, [values])


  const openModal = () => {
    setIsPromoModalOpen(true);
  };
  const closeModal = () => {
    setIsPromoModalOpen(false);
  };
  const submitModalRes = (result: string) => {
    setValue("promo", result);
    setAreBonusesActive(!result);
    setIsPromoModalOpen(false);
  };

  // const onNextClick = () => {
  //   if (isValid) {
  //     dispatch(setCredentials(values));
  //     dispatch(increaseStep());
  //   }
  // };
  // const onBackClick = () => {
  //   dispatch(decreaseStep());
  // };

  return (
    <>

      <Row justify="center" gutter={[20, 20]}>
        <ColLg>
          <form className="credentials-container">
            {/* <form onSubmit={handleSubmit(onSubmit)} id='createModuleForm'> */}
            <PromoModal
              isOpen={isPromoModalOpen}
              onCancel={closeModal}
              onSubmit={submitModalRes}
              value={watchAllFields.promo}
            />

            <FormField
              error={errors.name}
              name="name"
              control={control}
              icon={userIcon}
              type="text"
              required="Введите имя"
              minLength={2}
              placeholder="Введите ваше имя"
            />

            <PhoneInput
              control={control}
              error={errors.phone}
              required
              autocomplete="tel"
            />

            <FormCheckbox
              control={control}
              error={errors.licenseAgree}
              required="Необходимо принять пользовательское соглашение"
              name="licenseAgree"
              children={
                <span>
                  Я принимаю условия{" "}
                  <a href={agreementHref} target="_blank" rel="noreferrer">
                    пользовательского соглашения{" "}
                  </a>
                </span>
              }
            />

            <TextAreaInput
              control={control}
              name="comment"
              placeholder="Комментарий"
              cols={40}
              rows={5}
            />

            {isAuthorised ? (
              <>
                <div
                  className={`credentials-promo-btn credentials-description${isPromoActive ? "" : " credentials-not-usable"
                    }`}
                  onClick={isPromoActive ? openModal : undefined}
                >
                  <input
                    {...register("promo")}
                    type="hidden"
                    className="hidden"
                  />
                  <span>Промокод или сертификат</span>
                  <img src={arrowRight} alt="" />
                </div>

                <div
                  className={`credentials-bonuses-container${areBonusesActive ? "" : " credentials-not-usable"
                    }`}
                >
                  <div className="credentials-description">
                    <span>Баллы и бонусы</span>
                    <a href={bonusesInfoHref} target="_blank" rel="noreferrer">
                      <img
                        src={infoIcon}
                        alt=""
                        className="credentials-description-img"
                      />
                    </a>
                  </div>

                  <FormCheckbox
                    control={control}
                    name="useDiscount"
                    children={<span>Списать до 20% баллами</span>}
                    onChange={(e) => {
                      setIsPromoActive(!e.target.checked);
                      setValue("useDiscount", e.target.checked);
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to={ACCOUNT_PATH}
                  className="credentials-need-login"
                  onClick={openModal}
                >
                  Чтобы использовать бонусы или промокод необходимо{" "}
                  <span>войти</span>
                </NavLink>
              </>
            )}
          </form>
        </ColLg>
      </Row>
    </>
  );
};
