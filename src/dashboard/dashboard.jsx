import React from 'react';
import moment from 'moment';
import {DateRangePicker} from 'react-dates';
import styled from 'styled-components';

import {db} from '../firebase';
import {PainChart} from './pain-chart';

export class Dashboard extends React.Component {
  static contextTypes = {
    uid: React.PropTypes.string
  }

  state = {
    startDate: moment().subtract(1, 'months'),
    endDate: moment(),
    startFocus: false,
    endFocus: false,
    focused: null,
    data: []
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.context.uid && this.context.uid !== prevContext.uid) {
      this.db = db.ref().child('entries').child(this.context.uid);
    }
    if (this.db && this.state.startDate && this.state.endDate && (
        (!prevState.startDate || !prevState.startDate.isSame(this.state.startDate, 'day')) ||
        (!prevState.endDate || !prevState.endDate.isSame(this.state.endDate, 'day')) ||
        (this.state.data.length === 0)
    )) {
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
      <DashSection>
        <h1>Dashboard</h1>
        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={({startDate, endDate}) => {this.setState({startDate, endDate})}}
          focusedInput={this.state.focused}
          onFocusChange={(focused) => {this.setState({focused})}}
          isOutsideRange={() => false}
          initialVisibleMonth={() => this.state.startDate}
          withPortal={true}
          numberOfMonths={1}
        />
        <PainChart data={this.state.data}/>
      </DashSection>
    )
  }
}

const DashSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`