import { Button, Modal, Radio, RadioChangeEvent, Row } from "antd";
import { ColLg } from "../Common/Markup/ColLg";
import { DefaultLayout } from "../Layout/DefaultLayout";
import "./AchievementsStyles.css";

import img from "../../Assets/mirage-astronaut.png";
import styled from "styled-components";

import star from "../../Assets/achievement/star.svg"
import tournBig from "../../Assets/achievement/tournBig.svg"
import space from "../../Assets/achievement/space.svg"
import friends from "../../Assets/achievement/friends.svg"
import puzzles from "../../Assets/achievement/puzzles.svg"
import photo from "../../Assets/achievement/photo.svg"
import close from "../../Assets/close-cross.svg"
import Achieve from "./Achieve";
import { useEffect, useState } from "react";
import AchieveModal from "./AchieveModal";



export interface IAchieve {
  id: number,
  title: string,
  icon: string,
  description: string,
  promo: string,
  type: 'my' | 'all'
}

export const Achievements: React.FC = () => {

  const items: IAchieve[] = [
    {
      id: 1,
      title: 'Просто хороший человек',
      icon: star,
      type: 'my',
      description: 'Хороший мальчик или девочка',
      promo: 'GOOD100',
    },
    {
      id: 2,
      title: 'За участие в турнире',
      icon: tournBig,
      type: 'my',
      description: 'Перенеситесь в прошлое, чтобы посмотреть, сможете ли вы изменить ситуацию, из которой, казалось - не было выхода. Что произошло в ночь аварии? А что было потом? Найдите ответы на вопросы, которые до сих пор оставались без ответа.',
      promo: 'SALE1000',
    },
    {
      id: 3,
      title: 'Первый сыграл в новую игру',
      icon: space,
      type: 'my',
      description: 'Первый раз, Первый раз, Первый раз, Первый раз',
      promo: 'FIRST500',
    },
    {
      id: 4,
      title: 'Привёл много друзей',
      icon: friends,
      type: 'my',
      description: 'Не имей сто друзей, а имей новый промокод',
      promo: 'FRIENDS&FAMILY',
    },
    {
      id: 5,
      title: 'Решение головоломки',
      icon: puzzles,
      type: 'all',
      description: 'Большая бошка, большой мозг',
      promo: 'GD2000',
    },
    {
      id: 6,
      title: 'Оставил отзыв с фото',
      icon: photo,
      type: 'all',
      description: 'Перенеситесь в прошлое, чтобы посмотреть, сможете ли вы изменить ситуацию, из которой, казалось - не было выхода. Что произошло в ночь аварии? А что было потом? Найдите ответы на вопросы, которые до сих пор оставались без ответа. ',
      promo: 'FREE123',
    },
  ]

  const [sortItems, setSorrtItems] = useState<Array<IAchieve>>(items.filter(item => item.type === 'my'));
  const [sorted, setIsSorted] = useState<boolean>(false);

  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === 'my') {
      setSorrtItems(items.filter(item => item.type === 'my'))
      setIsSorted(true);
    } else {
      setSorrtItems(items);
      setIsSorted(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<IAchieve>();

  const showModal = (id: number) => {
    setIsModalOpen(true);
    setActiveModal(items.find(item => item.id === id));
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(false);
  };

  return (
    <DefaultLayout>
      <StyledWrapper>
        <StyledTitle>Достижения</StyledTitle>
        <StyledGroup defaultValue="my" buttonStyle="solid" onChange={onChange}>
          <StyledRadio value="my">
            Мои достижения
          </StyledRadio>
          <StyledRadio value="all">
            Все достижения
          </StyledRadio>
        </StyledGroup>

        <StyledWrapperItems>
          {
            sortItems.map(item => (
              <Achieve icon={item.icon} title={item.title} received={item.type === 'my'} key={item.id} sorted={sorted} showModal={() => showModal(item.id)} />
            ))
          }

        </StyledWrapperItems>

        <StyledModal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          footer={[
            // <Button key="submit" type="primary" onClick={handleOk}>
            //   Забрать баллы
            // </Button>,
          ]}
          closeIcon={<img src={close} alt="close icon" />}
        >
          <AchieveModal item={activeModal} />

        </StyledModal>
      </StyledWrapper>
    </DefaultLayout>
  );
};

const StyledGroup = styled(Radio.Group)`
  padding: 10px 24px;

  border-radius: 16px;
  /* background: #2B2C45; */
  background: rgba(31, 32, 50, 1);


  margin-bottom: 20px;

  display: block;
`

const StyledRadio = styled(Radio.Button)`
  color: var(--abafe-5, #ABAFE5);
  text-align: center;
  font-family: Gilroy;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: 0.04px;

  &.ant-radio-button-wrapper{
    background: none !important;
    border: none !important;
    padding: 13px 22px;
    height: 54px;
    display: inline-flex;
    align-items: center;

    :hover{
      color: #ABAFE5;
    }

    &::before{
      content: none;
    }
  }

  &.ant-radio-button-wrapper-checked{
    border-radius: 10px;
    background: linear-gradient(105.69deg, #952EF1 8.78%, #17C5E7 99.66%) !important;

    color: #FFF;
    text-align: center;
    font-family: Gilroy;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 28px */
    letter-spacing: 0.04px;
  }
`

const StyledModal = styled(Modal)`
  min-width: 1280px !important;
  padding-bottom: 0px !important;
  border-radius: 16px !important;
  background: rgba(25, 26, 41, 1) !important;
  top: 10vh;

  margin: auto;

  .ant-modal-content{
    padding: 40px !important;
    border-radius: 16px !important;
    
  }
  .ant-modal-footer{
    margin-top: 0 !important;
  }

`

const StyledWrapperItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`

const StyledTitle = styled.h1`
  color: var(--white, #FFF);
  text-align: center;
  font-family: Gilroy;
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: 180%; /* 82.8px */
  text-transform: uppercase;

  margin: 40px auto 20px;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: start;

  margin: 0 auto;


  max-width: 1220px;
`