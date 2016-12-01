import React, {Component, PropTypes} from 'react'
import {DayPicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

import {PainMeter} from './painmeter';
import {TextBox} from './shared/textbox';
import {DatePicker} from './shared/datepicker';

import './day-form.css';

import data from './data';

export class DayForm extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired
  }

  state = {
    date: this.props.date,
    painLevel: 5,
    notes: ''
  }

  componentDidMount() {
    const {date} = this.props;
    if (data.entries.hasOwnProperty(date.format('YYYY-MM-DD'))) {
      const entry = data.entries[date.format('YYYY-MM-DD')];
      this.setState(entry);
    }
  }

  handleDateChange = (date, modifiers, evt) => {
    this.setState({date})
  }

  handleLevelChange = (painLevel) => {
    this.setState({painLevel});
  }

  handleNotesChange = (notes) => {
    this.setState({notes});
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.state);
  }

  checkBooked = (day) => {
    const dayString = day.format('YYYY-MM-DD');
    //return !day.isSame(this.state.date, 'day') && data.entries.hasOwnProperty(dayString);
    return data.entries.hasOwnProperty(dayString);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <DatePicker />
          <DayPicker 
            initialVisibleMonth={() => this.state.date}
            onDayClick={this.handleDateChange} 
            modifiers={{
              selected: (day) => day.isSame(this.state.date, 'day'),
              booked: this.checkBooked
            }}
          />
          <div style={{width: '100%'}}>
            <PainMeter max={10} onSelect={this.handleLevelChange} value={this.state.painLevel} />
          </div>
          <TextBox label="Notes" name="notes" value={this.state.notes} onChange={this.handleNotesChange} />
          <div>
            <button className="submit" type="submit">Save</button>
          </div>
      </form>
    )
  }
}