import React from 'react'
import styled from 'styled-components'

interface IProp {
  title: string,
  icon: string
}

const Achieve:React.FC<IProp> = ({title, icon}) => {
  return (
    <StyledAchiev>
      <h3>{title}</h3>
      <div>
        <img src={icon} alt={title}/>
      </div>
    </StyledAchiev>
  )
}

export default Achieve


const StyledAchiev = styled.div`
  display: flex;
  padding: 20px 30px;
  align-items: center;
  gap: 20px;
  align-self: stretch;

  border-radius: 16px;
  background: #1F2032;

  /* Achive-Shadow */
  box-shadow: 0px 15px 40px 0px rgba(67, 181, 224, 0.10);

  &h3{
    margin: 0;
    color: var(--white, #FFF);
    font-family: Gilroy;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
  }

  &img{
    width: 64px;
    height: 64px;
  }
`