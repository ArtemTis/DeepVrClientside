import { Row } from 'antd'
import React from 'react'
import { Outlet } from 'react-router'
import "./AccountStyles.css";
import styled from 'styled-components';

const ProfileLayout = () => {
    return (
        // <Row justify="center">
        <Wrapper>
            <div className="profile-wrapper">

                <Outlet />

            </div>
        </Wrapper>
    )
}

export default ProfileLayout

const Wrapper = styled.div`
     display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`