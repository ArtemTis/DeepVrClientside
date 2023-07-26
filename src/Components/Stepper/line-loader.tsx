import React from 'react';

import { getColorForPercentage } from './get-color-for-percentage';
import { Label } from './label';
import { LoaderProps, LabelPosition } from './loader-components';

import styled from 'styled-components';

type Props = Required<Omit<LoaderProps, "value" | "maxValue" | "innerText" | "type"> & {percent: number; }>;

const LineLoaderContainer = styled.div<{width: number | string; height: number; labelPosition: LabelPosition}>`
  width: ${({ width }) => (width === 'expand' ? '100%' : width + 'px')};
  height: ${({ height }) => (height + 'px')};
  overflow: hidden;
  background-color: #f1f1f1;
  border-radius: 15px;  
  position: relative;
`;

const LineLoader = styled.div<{percent: number; colors: {color: string, percent: number}[]}>`
  height: 100%;
  width: ${props => props.percent}%;
  border-radius: 15px;
  background: ${props => getColorForPercentage(props.percent, props.colors)};
  transition: width 0.3s ease-in-out;
`;

const LineContainer = styled.div<{labelPosition: LabelPosition}>`
  display: flex;
  flex-direction: ${({ labelPosition }) => ((labelPosition === "top" || labelPosition === "bottom") ? "column" : "row")};
  align-items: ${({ labelPosition }) => ((labelPosition === "top" || labelPosition === "bottom") ? "left" : "center")};
`;

export function LineLoaderGipno (props: Props) {

    let {label, fontSize, width, height, percent, colorStops, labelPosition} = props;
    if(!labelPosition) labelPosition = "top";

    return (
        <>
            <LineContainer labelPosition={labelPosition}>
              {(labelPosition === 'top' || labelPosition === 'left') && <Label width={width} labelPosition={labelPosition} fontSize={fontSize}>{label}</Label>}
              <LineLoaderContainer width={width} height={height} labelPosition={labelPosition}>
                <LineLoader percent={percent} colors={colorStops} />
              </LineLoaderContainer>
              {(labelPosition === 'bottom' || labelPosition === 'right') && <Label width={width} labelPosition={labelPosition} fontSize={fontSize}>{label}</Label>}
            </LineContainer>
        </>
    )
}
