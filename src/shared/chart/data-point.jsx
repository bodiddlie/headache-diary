// @flow
import React from 'react';

type Props = {
  entry: any,
  cx: number,
  cy: number
}

export const DataPoint = (props: Props) => {
  const {entry, cx, cy} = props;
  const fill = 120 - Math.ceil((entry.painLevel / 11) * 120);

  return (
    <circle
      cx={`${cx}%`}
      cy={cy}
      r={3}
      stroke="black"
      strokeWidth=".25"
      fill={`hsl(${fill}, 100%, 50%)`}
    />
  );
}