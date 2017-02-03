import React from 'react';
import styled from 'styled-components';

export const SvgChart = ({data}) => {
  const lines = [];
  const dots = [];
  data.forEach((val, i, arr) => {
    const fill = 120 - Math.ceil((val.painLevel / 11) * 120);
    const gap = 290 / (arr.length - 1);
    const cx = gap * i + 5;
    const calcYPos = (level) => ((10 - level) * 5) + 5;
    const cy = calcYPos(val.painLevel);
    if (i > 0) {
      lines.push(<line key={'line' + i} x1={cx - gap} y1={calcYPos(arr[i-1].painLevel)} x2={cx} y2={calcYPos(val.painLevel)} stroke="black" strokeWidth="1"/>)
    }
    dots.push(<circle key={'dot' + i} cx={cx} cy={cy} r={3} stroke="black" strokeWidth=".25" fill={`hsl(${fill}, 100%, 50%)`}/>)
  });
  return (
    <ChartContainer>
      <svg width="300px" height="60px">
        {lines}
        {dots}
      </svg>
    </ChartContainer>
  )
}
SvgChart.propTypes = {
  data: React.PropTypes.array
}

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: hsla(0, 0%, 50%, 0.40);
`;