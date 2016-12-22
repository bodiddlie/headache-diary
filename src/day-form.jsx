import React, {Component} from 'react'
import moment from 'moment';
import _ from 'lodash';

import {db} from './firebase';

import {PainMeter} from './painmeter';
import {TextBox} from './shared/textbox';
import {DatePicker} from './shared/datepicker';

export class DayForm extends Component {
  static contextTypes = {
    uid: React.PropTypes.string
  }

  state = {
    date: moment(),
    painLevel: 5,
    notes: '',
    entries: {},
    currentMonth: moment().startOf('month')
  }

  constructor(props) {
    super(props);

    this.debouncedNotes = _.debounce(this.updateNotes, 1000);
  }

  componentWillUnmount() {
    this.db.off();
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    const {date, currentMonth} = this.state;
    if (this.context.uid && this.context.uid !== prevContext.uid) {
      this.db = db.ref().child('entries').child(this.context.uid);
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
      this.setState({entries});
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

    const colorFn = (pain) => {
      const startColor = 120 - Math.ceil((pain / 11) * 120);
      const endColor = 120 - Math.ceil(((pain + 1) / 11) * 120);
      return `radial-gradient(circle, hsl(${startColor}, 100%, 50%), 60%, hsl(${endColor}, 100%, 50%))`;
    };

    if (day.isSame(this.state.date, 'day')) {
      return this.state.painLevel >= 0 ? colorFn(this.state.painLevel): 'transparent';
    } else if (this.state.entries.hasOwnProperty(dayString)) {
      return colorFn(this.state.entries[dayString].painLevel);
    }
    return 'transparent';
  }

  render() {
    return (
      <form className="day-form" onSubmit={this.handleSubmit}>
          <DatePicker 
            calculateBackground={this.calculateBackground}
            onDayClick={this.getEntryForDate}
            onMonthChange={this.handleMonthChange}
          />
          <div style={{width: '100%'}}>
            <PainMeter 
              max={10} 
              onSelect={this.handleLevelChange} 
              value={this.state.painLevel} 
            />
          </div>
          <TextBox 
            label="Notes" 
            name="notes" 
            value={this.state.notes} 
            onChange={this.handleNotesChange} 
          />
      </form>
    )
  }
}