import React, {Component, PropTypes} from 'react'
import {DayPicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

import {PainMeter} from './painmeter';

export class DayForm extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  state = {
    date: null,
    painLevel: 5,
    notes: ''
  }

  handleDateChange = (date, modifiers, evt) => {
    this.setState({date})
  }

  handleLevelChange = (painLevel) => {
    this.setState({painLevel});
  }

  render() {
    return (
      <div>
        <div>
          <DayPicker 
            onDayClick={this.handleDateChange} 
            modifiers={{
              selected: (day) => day.isSame(this.state.date)
            }}
          />
          <div style={{width: '50%'}}>
            <PainMeter />
          </div>
          <div>
            <label>Notes</label>
            <textarea value={this.state.notes} onChange={(e) => {this.setState({notes: e.target.value});}} />
          </div>
        </div>
      </div>
    )
  }
}