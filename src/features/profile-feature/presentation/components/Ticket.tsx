import React from 'react';
import styled from 'styled-components';
import ticket from "../../../../Assets/ticket.svg";
import code from "./code.svg";

const Ticket: React.FC = () => {

    return (
        <Achievement>
            <img className="img" alt="Img" src={code} />
            <div className="other">
                <div className="img-wrapper">
                    <img className="img-2" alt="Img" src={ticket} />
                </div>
                <h1 className="text-wrapper">Игроман</h1>
                <div className="div">Все статусы</div>
            </div>
        </Achievement>
    )
}

export default Ticket;

const Achievement = styled.div`
    align-items: flex-start;
    background-color: #101A29;
    border-radius: 10px;
    border: 1px none;
    display: flex;
    gap: 14px;
    justify-content: center;
    min-height: 246px;
    min-width: 250px;
    padding: 20px 30px;
    position: relative;
    width: 100%;

    .img {
    height: 206px;
    margin-left: -9px;
    object-fit: cover;
    position: relative;
    width: 70px;
  }

  .other {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 14px;
    margin-right: -9px;
    position: relative;
  }

  .img-wrapper {
    align-items: center;
    border-radius: 8px;
    display: inline-flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 3px;
    position: relative;
}

.img-2 {
    height: 124px;
    object-fit: cover;
    position: relative;
    width: 124px;
}

.text-wrapper {
    color: #ffffff;
    font-family: "Gilroy-Bold", Helvetica;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 28.8px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
    margin: 0;
}

.div {
    color: var(--abafe-5);
    font-family: "Gilroy-Regular", Helvetica;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 25.2px;
    position: relative;
    text-decoration: underline;
    white-space: nowrap;
    width: fit-content;

    &:last-child{
        cursor: pointer;
    }
}
`
