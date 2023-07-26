import React from 'react';

import { getColorForPercentage } from './get-color-for-percentage';
import { Label } from './label';
import { LoaderProps, LabelPosition } from './loader-components';

import styled from 'styled-components';

type Props = Required<Omit<LoaderProps, "value" | "maxValue" | "innerText" | "type"> & {percent: number; innerBlock: null | React.ReactElement;}>;

const CircleLoaderContainer = styled.div<{width: number | string}>`
  position: relative;
  width: ${({width}) => (width === 'expand' ? '100%' : width + 'px')};
  height: ${({width}) => (width === 'expand' ? '100%' : width + 'px')};
`;

const Circle = styled.circle<{height: number}>`
  fill: transparent;
  stroke: rgba(255, 255, 255, 0.29);
  stroke-width: ${props => props.height}px;
`;

const ProgressCircle = styled(Circle)<{percent: number; colors: {color: string, percent: number}[]}>`
  stroke: ${props => getColorForPercentage(props.percent, props.colors)};
  stroke-dasharray: 283;
  stroke-dashoffset: ${props => (100 - props.percent) * 2.83};
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.3s ease-in-out;
`;

const CircleContainer = styled.div<{labelPosition: LabelPosition}>`
  display: flex;
  flex-direction: ${({ labelPosition }) => ((labelPosition === "top" || labelPosition === "bottom") ? "column" : "row")};
  align-items: ${({ labelPosition }) => ((labelPosition === "top" || labelPosition === "bottom") ? "left" : "center")};
`;

const InnerDiv = styled.div<{width: number | string}>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export function CircleLoaderGipno (props: Props) {

    let {width, height, percent, colorStops, innerBlock, label, fontSize, labelPosition} = props;
    if(!labelPosition) labelPosition = "left";
    
    return (
        <CircleContainer labelPosition={labelPosition}>
            {(labelPosition === 'top' || labelPosition === 'left') && <Label width={width} labelPosition={labelPosition} fontSize={fontSize}>{label}</Label>}
            <CircleLoaderContainer width={width}>
                <svg viewBox="0 0 100 100">
                <Circle height={height} cx="50" cy="50" r="45" />
                <ProgressCircle height={height} percent={percent} colors={colorStops} cx="50" cy="50" r="45" />
                </svg>
                <InnerDiv width={width}>
                  {innerBlock}
                </InnerDiv>
            </CircleLoaderContainer>
            {(labelPosition === 'bottom' || labelPosition === 'right') && <Label width={width} labelPosition={labelPosition} fontSize={fontSize}>{label}</Label>}
        </CircleContainer>
    )
}
