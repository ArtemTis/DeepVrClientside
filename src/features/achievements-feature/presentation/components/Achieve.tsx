import React from 'react'
import styled from 'styled-components'

import receivedIcon from '../../../../assets/achievement/received.svg'

interface IProp {
  title: string,
  icon: string,
  received?: boolean,
  sorted?: boolean,
  showModal: () => void
}

const Achieve:React.FC<IProp> = ({title, icon, sorted, received, showModal}) => {
  return (
    <StyledAchiev onClick={() => showModal()}>
      <h3>{title}</h3>
      <div>
        <img src={icon} alt={title}/>
        {
          !sorted && received &&
          <img src={receivedIcon} alt='received' className='received'/>
        }
      </div>
    </StyledAchiev>
  )
}

export default Achieve


const StyledAchiev = styled.div`
  display: flex;
  padding: 20px 30px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  align-self: stretch;
  cursor: pointer;

  border-radius: 16px;
  background: #1F2032;

  height: 108px;

  /* Achive-Shadow */
  box-shadow: 0px 15px 40px 0px rgba(67, 181, 224, 0.10);

  h3{
    margin: 0;
    color: var(--white, #FFF);
    font-family: Gilroy;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;

    text-align: start;
  }

  img{
    width: 64px;
    height: 64px;
    position: absolute;
    top: -32px;
    left: -12px;
    
    &.received{
      
      top: -32px;
    }
  }

  div{
    position: relative;
    /* height: 10px; */
    width: 64px;
  }
`