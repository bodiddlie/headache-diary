import React, {Component, PropTypes} from 'react'
import {DayPicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

import {PainMeter} from './painmeter';
import {TextBox} from './shared/textbox';
import {DatePicker} from './shared/datepicker';

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
    return data.entries.hasOwnProperty(dayString);
  }

  calculateBackground = (day) => {
    const dayString = day.format('YYYY-MM-DD');
    if (data.entries.hasOwnProperty(dayString)) {
      const pain = data.entries[dayString].painLevel;
      const startColor = 120 - Math.ceil((pain / 11) * 120);
      const endColor = 120 - Math.ceil(((pain + 1) / 11) * 120);
      return `radial-gradient(circle, hsl(${startColor}, 100%, 50%), 60%, hsl(${endColor}, 100%, 50%))`;
    }
    return 'transparent';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <DatePicker 
            calculateBackground={this.calculateBackground}
          />
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