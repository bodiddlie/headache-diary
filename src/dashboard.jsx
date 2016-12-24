import React from 'react';
import moment from 'moment';
import {
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

import {db} from './firebase';

const margins = {left: 20, right: 20, top: 20, bottom: 20};

export class Dashboard extends React.Component {
  static contextTypes = {
    uid: React.PropTypes.string
  }

  state = {
    startDate: moment().subtract(1, 'months'),
    endDate: moment(),
    data: []
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.uid && this.context.uid !== prevContext.uid) {
      this.db = db.ref().child('entries').child(this.context.uid);
      this.loadData();
    }
  }

  loadData = () => {
    const start = this.state.startDate.format('YYYY-MM-DD');
    const end = this.state.endDate.format('YYYY-MM-DD');
    this.db.orderByKey().startAt(start).endAt(end).once('value', snap => {
      const data = [];
      snap.forEach(child => {
        const entry = child.val();
        entry.dateName = moment(entry.date, 'YYYY-MM-DD').format('MMM D');
        data.push(entry);
      });
      this.setState({data});
    });
  }

  render() {
    return (
      <section className="dashboard">
        <h1>Dashboard</h1>
        <div style={{background: '#fff'}}>
          <ResponsiveContainer width="100%" height="100%" minHeight={250}>
            <LineChart margin={margins} data={this.state.data}>
              <XAxis name="Date" dataKey="dateName" tick={<AxisTick/>} height={40}/>
              <YAxis type="number" domain={[0, 10]} tickCount={11} />
              <Line type="monotone" dataKey="painLevel" stroke="#8884d8" dot={<PainDot/>} />
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    )
  }
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