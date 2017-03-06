// @flow
import React from 'react';

import {DataPoint} from './data-point';

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
        const cx = hgap * i + 2;
        const cy = calcYPos(val.painLevel);
        return (
          <DataPoint key={`dot${i}`} cx={cx} cy={cy} entry={val} />
        );
      })}
    </svg>
  )
}