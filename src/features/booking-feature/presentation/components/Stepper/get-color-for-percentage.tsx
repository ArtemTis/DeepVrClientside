import React from 'react';

export const getColorForPercentage = (percent: number, colorStops: {color: string, percent: number}[]) => {
  let color = '#4B51EA'; 

  for (let i = 0; i < colorStops.length; i++) {
    const { color: stopColor, percent: stopPercent } = colorStops[i];
    
    if (percent <= stopPercent) {
      color = stopColor;
      break;
    }
  }

  return color;
};