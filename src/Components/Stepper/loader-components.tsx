import React, { Suspense } from 'react';
import styled from 'styled-components';
import { LineLoaderGipno } from './line-loader';
import { CircleLoaderGipno } from './circle-loader';

type LoaderType = 'line' | 'circle';
type LoaderWidth = number | 'expand';
type InnerPercent = "percent";
type InnerStepper = "stepper";
type CircleInnerType = InnerPercent | React.ReactElement | null | string | InnerStepper;
export type LabelPosition = 'top' | 'bottom' | 'left' | 'right';

export interface LoaderProps {
  value: number;
  width: LoaderWidth;
  height: number;
  innerText: CircleInnerType;
  maxValue?: number;
  label?: string;
  type?: LoaderType;
  labelPosition?: LabelPosition;
  colorStops?: {color: string, percent: number}[];
  fontSize?: number;
}

const Text = styled.text`
  fill: #000;
  font-size: 16px;
`;

const StyledStepper = styled.span`
  fill: #000;
  font-size: 16px;
`

const Percentage = styled.span`
  font-weight: bold;
`;

const InnerIcon = styled.div<{imgUrl: string; width: number}>`
  width: ${({width}) => width + 'px'};
  height: ${({width}) => width + 'px'};
  background-image: ${({imgUrl}) => (imgUrl == "" ? "none" : "url(\'" + imgUrl + "\')")};
  background-repeat: no-repeat;
  background-position: center center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export function LoaderGipno (props: LoaderProps) {
  let {value, 
      width, 
      innerText, 
      height, 
      label, 
      labelPosition, 
      type = "line", 
      maxValue = 100, 
      colorStops, 
      fontSize = 24} = props;

  const normalizedPercent = Math.max(0, Math.min(value, maxValue));
  const percent = Math.round((normalizedPercent / maxValue) * 100);

  if(!colorStops) colorStops = [{color: "#4B51EA", percent: percent}];

  let innerBlock: null | React.ReactElement;
  let iconWidth: number = 500;
  if(typeof(width) === "number") iconWidth = width / 2;

  if(innerText === 'percent') {
    innerBlock = <Text x="50" y="50">
                    <Percentage>{percent}%</Percentage>
                  </Text>;
  }
  else if(innerText === "stepper") {
    innerBlock = <StyledStepper>
                    <Percentage>{value} из {maxValue}</Percentage>
                  </StyledStepper>;
  }
  else if(typeof(innerText) === "string") {
    innerBlock = <InnerIcon width={iconWidth} imgUrl={innerText}></InnerIcon>;
  }
  else {
    innerBlock = <InnerIcon width={iconWidth} imgUrl="">{innerText}</InnerIcon>;
  }

  return (
    <>
      {type === 'line' ? (
        <LineLoaderGipno fontSize={fontSize} width={width} percent={percent} height={height} 
                          colorStops={colorStops} label={label ?? ''} labelPosition={labelPosition ?? "top"}/>
      ) : (
        <CircleLoaderGipno percent={percent} width={width} height={height} label={label ?? ''}  labelPosition={labelPosition ?? "left"}
                          colorStops={colorStops} innerBlock={innerBlock} fontSize={fontSize}/>
      )}
    </>
  );
};
