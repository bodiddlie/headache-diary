// @flow
import React from 'react';

import {NumberLabels} from './number-labels';
import {GridLines} from './grid-lines';
import {LineChart} from './line-chart';
import {Points} from './points';
import {Average} from './average';

const avgColor = 'hsl(178, 56%, 50%)';

type Props = {
  data: any[],
  height: number,
  condensed: boolean
}

export const Chart = (props: Props) => {
  const {data, height, condensed} = props;
  const verticalGap = (height - 10) / 10;
  const sum = data.reduce((p, c) => p + c.painLevel, 0);
  let avg = 0;

  if (data.length > 0) {
    avg = sum / data.length;
  }

  return (
    <div>
      <svg width="100%" height={height + 10}>
        <rect x={0} y={0} width={'100%'} height={height + 10} stroke="black" strokeWidth={.75} fill="hsla(0, 0%, 70%, .0)" />
        <NumberLabels height={height} gap={verticalGap} condensed={condensed} />
        <GridLines height={height} gap={verticalGap} />
        <LineChart height={height} data={data} gap={verticalGap} avgColor={avgColor} />
        <Points height={height} data={data} gap={verticalGap} />
      </svg>
      <Average avg={avg} avgColor={avgColor} />
    </div>
  );
}