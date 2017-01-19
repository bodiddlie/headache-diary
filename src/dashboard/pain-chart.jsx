import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const margins = {left: 20, right: 20, top: 20, bottom: 20};

export const PainChart = ({data}) => (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart margin={margins} data={data}>
        <XAxis name="Date" dataKey="dateName" tick={<AxisTick />} height={40}/>
        <YAxis type="number" domain={[0,10]} tickCount={11} />
        <Line type="linear" dataKey="painLevel" stroke="#8884d8" dot={<PainDot/>} />
        <CartesianGrid strokeDasharray="3 3"/>
        <Tooltip/>
      </LineChart>
    </ResponsiveContainer>
)
PainChart.propTypes = {
  data: React.PropTypes.array.isRequired
}

const AxisTick = ({x, y, stroke, payload}) => (
  <g transform={`translate(${x}, ${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#cdcdcd" transform="rotate(-45)">{payload.value}</text>
  </g>
)
AxisTick.propTypes = {
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  stroke: React.PropTypes.string,
  payload: React.PropTypes.object
}

const PainDot = ({cx, cy, stroke, payload}) => {
  const fill = 120 - Math.ceil((payload.painLevel / 11) * 120);
  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20}>
      <circle cx={10} cy={10} r={4} stroke="black" fill={`hsl(${fill}, 100%, 50%)`} />
    </svg>
  );
}
PainDot.propTypes = {
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
  stroke: React.PropTypes.string,
  payload: React.PropTypes.object
}