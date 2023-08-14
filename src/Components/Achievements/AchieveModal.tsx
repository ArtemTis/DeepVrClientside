import React from 'react'
import { IAchieve } from './Achievements'
import styled from 'styled-components'
import { Button, Modal } from 'antd'
import { NextButton } from '../Common/Markup/NextButton'

interface IProps {
    item?: IAchieve,
}

const AchieveModal: React.FC<IProps> = ({ item }) => {
    return (
        <ModalWrapper>
            <img src={item?.icon} alt={item?.title} />
            <div>
                <h2>{item?.title}</h2>
                <h3>Награда</h3>
                <p>За прохождение этого задания Вам палагается промокод: {item?.promo}</p>
                <h3>Получение</h3>
                <p>{item?.description}</p>
                {
                    item?.type === 'my' &&
                    <StyledButton>Забрать баллы</StyledButton>
                }
            </div>
        </ModalWrapper>
    )
}

export default AchieveModal;

const ModalWrapper = styled.div`
    display: flex;
    padding: 20px 16px;

    h2{
        color: #FFF;
        font-family: Gilroy;
        font-size: 32px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: uppercase;
    }
    h3{
        color: var(--white, #FFF);
        font-family: Gilroy;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%; /* 38.4px */

        margin: 20px 0 6px !important;
    }
    p{
        color: #ABAFE5;
        font-family: Gilroy;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 32px */
    }
    
    img{
        width: 400px;
        height: 400px;

        margin-right: 20px;
    }

    div{
        width: 780px;
        
        *{
            margin: 0;
        }
    }
`

const StyledButton = styled.button`
    border-radius: 16px;
    background: linear-gradient(90deg, #36C0E7 3.84%, #4B51EA 84.38%, #4B51EA 86.98%);
    box-shadow: 0px 15px 60px 0px rgba(66, 130, 233, 0.45);
    cursor: pointer;

    width: 280px;
    height: 65px;
    border: 0;
    outline: none;

    color: #FFF;
    text-align: center;
    font-family: Gilroy;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-top: 20px !important;

    &:hover{
        color: #FFF;
    }
`