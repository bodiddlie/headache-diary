import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import _ from 'lodash';
import styled from 'styled-components';

import {db} from '../firebase';

export class ChartForm extends Component {
  static propTypes = {
    uid: PropTypes.string
  }

  state = {
    startDate: moment().subtract(60, 'days'),
    endDate: moment(),
    data: []
  }

  componentDidMount() {
    this.updateData(this.props);
  }

  componentDidUpdate(prevProps) {
    this.updateData(prevProps);
  }

  updateData(prevProps) {
    const {startDate, endDate} = this.state;
    if (this.props.uid && (this.props.uid !== prevProps.uid || !this.db)) {
      this.db = db.ref().child('entries').child(this.props.uid);
      this.loadEntriesForDates(startDate, endDate);
    }
  }

  loadEntriesForDates = (startDate, endDate) => {
    const start = startDate.format('YYYY-MM-DD');
    const end = endDate.format('YYYY-MM-DD');
    this.db.orderByKey().startAt(start).endAt(end).once('value').then(snap => {
      const entries = snap.val() || {};
      const keys = Object.keys(entries);
      const data = [];
      keys.forEach(key => {
        const entry = Object.assign({}, entries[key]);
        data.push(entry);
      })
      this.setState({data})
    }, err => {console.log(err)});
  }

  render() {
    return (
      <main>
        Chart goes here.
      </main>
    )
  }
}