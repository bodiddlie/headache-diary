import React, {Component} from 'react'
import moment from 'moment';

import {PainMeter} from './painmeter';
import {TextBox} from './shared/textbox';
import {DatePicker} from './shared/datepicker';

import data from './data';

export class DayForm extends Component {
  state = {
    date: moment(),
    painLevel: 5,
    notes: ''
  }

  componentDidMount() {
    const {date} = this.state;
    this.getEntryForDate(date);
  }

  getEntryForDate = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    if (data.entries.hasOwnProperty(dateString)) {
      const entry = data.entries[dateString];
      this.setState(entry);
    }  else {
      this.setState({date, painLevel: 5, notes: ''});
    }
  }

  handleDateChange = (date) => {
    this.getEntryForDate(date);
  }

  handleLevelChange = (painLevel) => {
    this.setState({painLevel});
    this.forceUpdate();
  }

  handleNotesChange = (notes) => {
    this.setState({notes});
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.state);
  }

  calculateBackground = (day) => {
    const dayString = day.format('YYYY-MM-DD');

    const colorFn = (pain) => {
      const startColor = 120 - Math.ceil((pain / 11) * 120);
      const endColor = 120 - Math.ceil(((pain + 1) / 11) * 120);
      return `radial-gradient(circle, hsl(${startColor}, 100%, 50%), 60%, hsl(${endColor}, 100%, 50%))`;
    };

    if (day.isSame(this.state.date, 'day')) {
      return colorFn(this.state.painLevel);
    } else if (data.entries.hasOwnProperty(dayString)) {
      return colorFn(data.entries[dayString].painLevel);
    }
    return 'transparent';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <DatePicker 
            calculateBackground={this.calculateBackground}
            onDayClick={this.getEntryForDate}
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
          <div>
            <button className="submit" type="submit">Save</button>
          </div>
      </form>
    )
  }
}