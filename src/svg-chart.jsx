import React from 'react';
import styled from 'styled-components';

const height = 90;
const gridGap = (height - 10) / 10;

const gridLines = Array.from({length: 11}, (u, i) => (
  <line key={'grid' + i} x1={0} y1={5 + (i * gridGap)} x2={300} y2={5 + (i  * gridGap)} stroke="hsl(0, 0%, 70%)" strokeWidth={.75} />
));
export const SvgChart = ({data}) => {
  const lines = [];
  const dots = [];
  data.forEach((val, i, arr) => {
    const fill = 120 - Math.ceil((val.painLevel / 11) * 120);
    const gap = 260 / (arr.length - 1);
    const cx = gap * i + 20;
    const calcYPos = (level) => ((10 - level) * gridGap) + 5;
    const cy = calcYPos(val.painLevel);
    if (i > 0) {
      lines.push(<line key={'line' + i} x1={cx - gap} y1={calcYPos(arr[i-1].painLevel)} x2={cx} y2={calcYPos(val.painLevel)} stroke="black" strokeWidth="1"/>)
    }
    dots.push(<circle key={'dot' + i} cx={cx} cy={cy} r={3} stroke="black" strokeWidth=".25" fill={`hsl(${fill}, 100%, 50%)`}/>)
  });
  return (
    <ChartContainer>
      <svg width="300px" height={height}>
        <rect x={0} y={0} width={300} height={height} stroke="black" strokeWidth={.75} fill="hsla(0, 0%, 50%, .4)" />
        {gridLines}
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
`;