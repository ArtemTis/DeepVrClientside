import React from 'react'
import styled from 'styled-components'
import { IChildren } from '../utils/types';

interface IProps {
    children: IChildren;
}

const ErrorText: React.FC<IProps> = ({ children }) => {
    return (
        <StyledErrorText>{children}</StyledErrorText>
    )
}

export default ErrorText

const StyledErrorText = styled.p`
    color: #FFF;
    font-family: 'SF Pro Display';
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
`