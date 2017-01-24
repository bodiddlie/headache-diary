import React from 'react';
import {
  LineChart, 
  Line,
  Tooltip,
  XAxis,
  ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

const fakeData = Array.from({length: 30}, () => {return {}});
export const Chart = ({data}) => {
    return (
      <ChartContainer>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={data.length > 0 ? data : fakeData}>
            {data.length > 0 &&(
              <Line type="linear" dataKey="painLevel" name="Pain Level" stroke="#888fd8" dot={<PainDot/>} />
            )}
            <XAxis dataKey="dateName" hide={true} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
}
Chart.propTypes = {
  data: React.PropTypes.array.isRequired
}

const PainDot = ({cx, cy, stroke, payload}) => {
  const fill = 120 - Math.ceil((payload.painLevel / 11) * 120);
  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20}>
      <circle cx={10} cy={10} r={4} stroke="black" fill={`hsl(${fill}, 100%, 50%)`} />
    </svg>
  )
}
PainDot.propTypes = {
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
  stroke: React.PropTypes.string,
  payload: React.PropTypes.object
}

const ChartContainer = styled.div`
  background: #efefef;
  border: 1px solid red;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  margin-top: 2em;
`