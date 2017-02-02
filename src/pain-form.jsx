import React, {Component} from 'react'
import moment from 'moment';
import _ from 'lodash';
import styled from 'styled-components';

import {db} from './firebase';
import {PainMeter} from './painmeter';
import {TextBox} from './shared/textbox';
import {DatePicker} from './shared/datepicker';
//import {Chart} from './dashboard/chart';
import {SvgChart} from './svg-chart';

export class PainForm extends Component {
  static propTypes = {
    uid: React.PropTypes.string
  }

  state = {
    date: moment(),
    painLevel: 5,
    notes: '',
    entries: {},
    data: [],
    currentMonth: moment().startOf('month')
  }

  constructor(props) {
    super(props);

    this.debouncedNotes = _.debounce(this.updateNotes, 1000);
  }

  componentWillUnmount() {
    this.db.off();
  }

  componentDidUpdate(prevProps) {
    const {date, currentMonth} = this.state;
    if (this.props.uid && (this.props.uid !== prevProps.uid || !this.db)) {
      this.db = db.ref().child('entries').child(this.props.uid);
      this.getEntryForDate(date);
      this.loadEntriesForMonth(currentMonth);
    }
  }

  getEntryForDate = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    if (this.state.entries.hasOwnProperty(dateString)) {
      const entry = this.state.entries[dateString];
      entry.date = moment(entry.date);
      this.setState(entry);
    } else {
      this.setState({date, painLevel: -1, notes: ''});
    }
  }

  loadEntriesForMonth = (currentMonth) => {
    this.db.off();
    const start = currentMonth.format('YYYY-MM-DD');
    const end = moment(currentMonth).endOf('month').format('YYYY-MM-DD');
    this.db.orderByKey().startAt(start).endAt(end).on('value', snap => {
      const entries = snap.val() || {};
      const keys = Object.keys(entries);
      const data = [];
      keys.forEach(key => {
        const entry = Object.assign({}, entries[key]);
        entry.dateName = moment(entry.date, 'YYYY-MM-DD').format('MMM D');
        data.push(entry);
      })
      this.setState({entries, data});
    }, err => {console.log(err)});
  }

  handleLevelChange = (painLevel) => {
    this.setState({painLevel});
    const date = this.state.date.format('YYYY-MM-DD');
    this.db.child(date).set({
      date,
      notes: this.state.notes,
      painLevel
    });
    this.forceUpdate();
  }

  handleMonthChange = (currentMonth) => {
    this.setState({currentMonth});
    this.loadEntriesForMonth(currentMonth);
  }

  handleNotesChange = (notes) => {
    this.setState({notes});
    this.debouncedNotes();
  }

  updateNotes = () => {
    const date = this.state.date.format('YYYY-MM-DD');
    this.db.child(date).set({
      date,
      notes: this.state.notes,
      painLevel: this.state.painLevel
    });
  }

  calculateBackground = (day) => {
    const dayString = day.format('YYYY-MM-DD');

    //const transparentColor = 'radial-gradient(circle, hsla(0, 0%, 40%, 0.0) 30%, hsla(0, 0%, 40%, 1.0))';
    const transparentColor = 'transparent';

    const colorFn = (pain) => {
      const startColor = 120 - Math.ceil((pain / 11) * 120);
      //return `radial-gradient(circle, hsl(${startColor}, 100%, 50%) 20%, hsl(${startColor}, 15%, 50%))`;
      return `hsl(${startColor}, 100%, 50%)`;
    };

    if (day.isSame(this.state.date, 'day')) {
      return this.state.painLevel >= 0 ? colorFn(this.state.painLevel): transparentColor;
    } else if (this.state.entries.hasOwnProperty(dayString)) {
      return colorFn(this.state.entries[dayString].painLevel);
    }
    return transparentColor;
  }

  render() {
    return (
      <Form>
        <SvgChart data={this.state.data}/>
        <DatePicker 
          calculateBackground={this.calculateBackground}
          onDayClick={this.getEntryForDate}
          onMonthChange={this.handleMonthChange}
        />
        <PainMeter 
          max={10} 
          onSelect={this.handleLevelChange} 
          value={this.state.painLevel} 
        />
        <TextBox 
          label="Notes" 
          name="notes" 
          value={this.state.notes} 
          onChange={this.handleNotesChange} 
        />
      </Form>
    )
  }
}

const Form = styled.form`
  width: 100%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: hsl(238, 5%, 35%);
  border-radius: 1rem;
  padding: 5px;

  @media (min-width: 768px) {
    width: 800px;
  }
`;