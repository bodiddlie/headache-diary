// @flow
import React from 'react';

type Props = {
  height: number,
  gap: number,
  condensed: boolean
}

export const NumberLabels = ({height, gap, condensed}: Props) => {
  const arr: number[] = Array.from({length: 11}, (u, i) => i);
  const nums: number[] = arr.reverse();

  return (
    <svg x="2%" y="5" width="4%" height={height + 20}>
      {nums.map((num, index) => (
        <text
          key={`number${num}`}
          x="90%"
          y={5 + (index * gap)}
          fill="black"
          fontSize="10"
          fontWeight="bold"
          dominantBaseline="central"
          textAnchor="end"
        >{condensed ? (index % 5 > 0 ? '' : num) : num}</text>
      ))}
    </svg>
  );
}