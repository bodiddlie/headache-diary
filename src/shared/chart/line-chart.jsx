// @flow
import React from 'react';

type Props = {
  data: any,
  height: number,
  gap: number,
  avgColor: string
}

export const LineChart = (props: Props) => {
  const {data, height, gap, avgColor} = props;
  const calcYPos = (level) => ((10 - level) * gap) + 5;
  const hgap = 97 / (data.length - 1);

  let sum = 0;
  let lines = [];

  data.forEach((val, i, arr) => {
    const x = hgap * i + 2;
    const y = calcYPos(val.painLevel);
    if (i > 0) {
      lines.push((
        <line
          key={`line${i}`}
          x1={`${x - hgap}%`}
          y1={calcYPos(arr[i-1].painLevel)}
          x2={`${x}%`}
          y2={y}
          stroke="black"
          strokeWidth="1" 
        />
      ))
    }
    sum += val.painLevel;
  });

  const avg = data.length > 0 ? calcYPos(sum / data.length) : 0;

  return (
    <svg x="7%" y="5" width="90%" height={height + 20}>
      {lines}
      {avg > 0 && (
        <line x1={0} y1={avg} x2={'100%'} y2={avg} stroke={avgColor} strokeWidth={.95} />
      )}
    </svg>
  );
}