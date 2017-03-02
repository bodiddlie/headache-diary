// @flow
import React from 'react';

type Props = {
  data: any,
  height: number,
  gap: number,
  parentWidth: number
}

const avgColor = 'hsl(178, 56%, 50%)';

export const LineChart = (props: Props) => {
  const {data, height, gap, parentWidth} = props;
  const width = parentWidth * .9;
  const calcYPos = (level) => ((10 - level) * gap) + 5;
  const hgap = 97 / (data.length - 1);

  let d = '';
  let sum = 0;

  data.forEach((val, i) => {
    const xpct = (hgap * i + 2) / 100.0;
    const x = width * xpct;
    const y = calcYPos(val.painLevel);
    d += d === '' ? `M ${x} ${y} ` : `L ${x} ${y} `;
    sum += val.painLevel;
  });

  const avg = data.length > 0 ? calcYPos(sum / data.length) : 0;

  return (
    <svg x="7%" y="5" width="90%" height={height + 20}>
      <path d={d} stroke="black" strokeWidth="1" fill="transparent" />
      {avg > 0 && (
        <line x1={0} y1={avg} x2={'100%'} y2={avg} stroke={avgColor} strokeWidth={.95} />
      )}
    </svg>
  );
}