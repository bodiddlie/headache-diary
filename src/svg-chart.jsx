import React from 'react';
import styled from 'styled-components';

export const SvgChart = ({data}) => {
  const lines = [];
  const dots = [];
  data.forEach((val, i, arr) => {
    console.log(val);
    const fill = 120 - Math.ceil((val.painLevel / 11) * 120);
    const gap = 100 / arr.length;
    const cx = gap * i + 1;
    const cy = 12 - val.painLevel;
    if (i > 0) {
      lines.push(<line key={'line' + i} x1={cx - gap} y1={12 - arr[i-1].painLevel} x2={cx} y2={12 - val.painLevel} stroke="black" strokeWidth=".15"/>)
    }
    dots.push(<circle key={'dot' + i} cx={cx} cy={cy} r={.5} stroke="black" strokeWidth=".05" fill={`hsl(${fill}, 100%, 50%)`}/>)
  });
  return (
    <ChartContainer>
      <svg viewBox="0 0 100 15" preserveAspectRatio="none" width="100%" height="75px">
        <line x1="0" y1="0" x2="0" y2="15" stroke="black" />
        <line x1="0" y1="15" x2="100" y2="15" stroke="black" />
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
  padding: .5rem;
  margin-top: 2rem;
`;