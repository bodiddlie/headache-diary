// @flow
import React from 'react';

type Props = {
  height: number,
  gap: number
}

export const GridLines = ({height, gap}: Props) => {
  const arr: number[] = Array.from({length: 11}, (u, i) => i);

  return (
    <svg x="7%" y="5" width="90%" height={height + 20}>
      {arr.map(i => (
        <line 
          key={`grid${i}`}
          x1={0}
          y1={5 + (i * gap)}
          x2={'100%'}
          y2={5 + (i * gap)}
          stroke={i % 5 > 0 ? 'hsla(0, 0%, 90%, .6)' : 'hsla(0, 0%, 90%, 1)'}
          strokeDasharray={i % 5 > 0 ? '5 3' : '8 1'}
          strokeWidth=".55"
        />
      ))}
    </svg>
  );
}