import { Radio, RadioChangeEvent, Row } from "antd";
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
import Achieve from "./Achieve";
import { useState } from "react";



interface IAchieve {
  id: number,
  title: string,
  icon: string,
  type: 'my' | 'all'
}

export const Achievements: React.FC = () => {

  const items: IAchieve[] = [
    {
      id: 1,
      title: 'Просто хороший человек',
      icon: star,
      type: 'my'
    },
    {
      id: 2,
      title: 'За участие в турнире',
      icon: tournBig,
      type: 'my'
    },
    {
      id: 3,
      title: 'Первый сыграл в новую игру',
      icon: space,
      type: 'my'
    },
    {
      id: 4,
      title: 'Привёл много друзей',
      icon: friends,
      type: 'my'
    },
    {
      id: 5,
      title: 'Решение головоломки',
      icon: puzzles,
      type: 'all'
    },
    {
      id: 6,
      title: 'Оставил отзыв с фото',
      icon: photo,
      type: 'all'
    },
  ]

  const [sortItems, setSorrtItems] = useState<Array<IAchieve>>(items);

  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === 'my') {
      setSorrtItems(items.filter(item => item.type === 'my'))
    }else{
      setSorrtItems(items)
    }
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
              <Achieve icon={item.icon} title={item.title} />
            ))
          }

        </StyledWrapperItems>
        {/* <ColLg>
          <div className="achievments-header">
            Раздел находится в разработке
          </div>
          <img src={img} alt="" className="achievments-image" />
          <div className="achievments-text">
            Данный раздел еще не готов и находится в разработке, возвращатесь
            позже
          </div>
        </ColLg> */}
      </StyledWrapper>
    </DefaultLayout>
  );
};

const StyledGroup = styled(Radio.Group)`
  padding: 10px 24px;

  border-radius: 16px;
  background: #2B2C45;

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
    background: var(--linear, linear-gradient(90deg, #36C0E7 3.84%, #4B51EA 84.38%, #4B51EA 86.98%)) !important;

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

  margin: 90px auto 20px;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  align-items: start;
`