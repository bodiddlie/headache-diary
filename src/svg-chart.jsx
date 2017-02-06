import React from 'react';
import styled from 'styled-components';

const height = 70;
const gridGap = (height - 10) / 10;

const gridLines = Array.from({length: 11}, (u, i) => (
  <line key={'grid' + i} x1={20} y1={5 + (i * gridGap)} x2={300} y2={5 + (i * gridGap)} stroke={i % 5 > 0 ? 'hsla(0, 0%, 90%, .6)' : 'hsla(0, 0%, 90%, 1)'} strokeDasharray="5 3" strokeWidth=".55" />
));
// const gridLines = [
//   <line key="grid1" x1={20} y1={5} x2={300} y2={5} stroke="hsl(0, 0%, 90%)" strokeDasharray="5 3" strokeWidth=".75" />,
//   <line key="grid2" x1={20} y1={5 + (5 * gridGap)} x2={300} y2={5 + (5 * gridGap)} stroke="hsl(0, 0%, 90%)" strokeDasharray="5 3" strokeWidth=".75" />,
//   <line key="grid3" x1={20} y1={5 + (10 * gridGap)} x2={300} y2={5 + (10 * gridGap)} stroke="hsl(0, 0%, 90%)" strokeDasharray="5 3" strokeWidth=".75" />,
// ]
const numbers = [
  <text key="number0" x="7" y={5} fill="black" fontSize="10" fontWeight="bold" dominantBaseline="central" textAnchor="middle">10</text>,
  <text key="number1" x="7" y={5 + (5 * gridGap)} fill="black" fontSize="10" fontWeight="bold" dominantBaseline="central" textAnchor="middle">5</text>,
  <text key="number2" x="7" y={5 + (10 * gridGap)} fill="black" fontSize="10" fontWeight="bold" dominantBaseline="central" textAnchor="middle">0</text>,
];

export const SvgChart = ({data}) => {
  const lines = [];
  const dots = [];
  let sum = 0;
  let avg = 0;
  let avgY = 0;
  const calcYPos = (level) => ((10 - level) * gridGap) + 5;

  data.forEach((val, i, arr) => {
    const fill = 120 - Math.ceil((val.painLevel / 11) * 120);
    const gap = 260 / (arr.length - 1);
    const cx = gap * i + 20;
    const cy = calcYPos(val.painLevel);
    if (i > 0) {
      lines.push(<line key={'line' + i} x1={cx - gap} y1={calcYPos(arr[i-1].painLevel)} x2={cx} y2={calcYPos(val.painLevel)} stroke="black" strokeWidth="1"/>)
    }
    dots.push(<circle key={'dot' + i} cx={cx} cy={cy} r={3} stroke="black" strokeWidth=".25" fill={`hsl(${fill}, 100%, 50%)`}/>)
    sum += val.painLevel;
  });

  if (data.length > 0) {
    avg = sum / data.length;
    avgY = calcYPos(avg);
  }

  return (
    <ChartContainer>
      <svg width="300px" height={height + 20}>
        <rect x={0} y={0} width={300} height={height + 20} stroke="black" strokeWidth={.75} fill="hsla(0, 0%, 70%, .0)" />
        {gridLines}
        {numbers}
        {avgY > 0 && (
          <g>
            <line x1={0} y1={avgY} x2={300} y2={avgY} stroke="blue" strokeWidth={.75} />
            <text x={150} y={height + 10} fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="central" fill="blue">Avg: {avg.toFixed(2)}</text>
          </g>
        )}
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