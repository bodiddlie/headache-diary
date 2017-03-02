// @flow
import React from 'react';

type Props = {
  data: any,
  height: number,
  gap: number
}

export const Points = (props: Props) => {
  const {data, height, gap} = props;
  const calcYPos = (level) => ((10 - level) * gap) + 5;
  const hgap = 97 / (data.length - 1);

  return (
    <svg x="7%" y="5" width="90%" height={height + 20}>
      {data.map((val, i) => {
        const fill = 120 - Math.ceil((val.painLevel / 11) * 120);
        const cx = hgap * i + 2;
        const cy = calcYPos(val.painLevel);
        return (
          <circle 
            key={`dot${i}`} 
            cx={`${cx}%`} 
            cy={cy} 
            r={3} 
            stroke="black"
            strokeWidth=".25"
            fill={`hsl(${fill}, 100%, 50%)`}
          />
        );
      })}
    </svg>
  )
}