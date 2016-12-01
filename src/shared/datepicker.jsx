import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import cx from 'classnames';

import './datepicker.css';

export class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.object
  }

  constructor(props) {
    super(props);

    const value = this.props.value || moment();

    this.state = {
      value,
      currentMonth: value.month(),
      days: this.generateDays(value)
    }
  }

  generateDays = (date) => {
    const lastMonthDays = date.startOf('month').day();
    let current = moment(date).subtract(lastMonthDays, 'days');

    let days = [];

    for (let i = 0; i < 42; i++) {
      let day = {
        date: current,
        booked: i % 2 === 0 ? true : false
      }
      days.push(day);
      current = moment(current).add(1, 'days');
    }

    return days;
  }

  render() {
    const {days} = this.state;
    let dayRows = [];
    for (let row = 0; row < 6; row++) {
      let dayCells = [];
      for (let col = 0; col < 7; col++) {
        const day = days[col + (row * 7)];
        dayCells.push(<Day key={col} {...day} />)
      }
      dayRows.push(<tr key={row}>{dayCells}</tr>);
    }
    return (
      <div className="datepicker">
        <div className="dp-month">
          <button type="button">&larr;</button>
          <span>December 2016</span>
          <button type="button">&rarr;</button>
        </div>
        <table>
          <tbody>
            <tr>
              <td>Sun</td>
              <td>Mon</td>
              <td>Tue</td>
              <td>Wed</td>
              <td>Thu</td>
              <td>Fri</td>
              <td>Sat</td>
            </tr>
            {dayRows}
          </tbody>
        </table>
      </div>
    )
  }
}

const Day = ({date, booked}) => {
  const classes = cx(
    'dp-day',
    {booked}
  );

  return (
    <td>
      <div className={classes}>
        <span>{date.date()}</span>
      </div>
    </td>
  );
}

Day.propTypes = {
  date: PropTypes.object.isRequired,
  booked: PropTypes.bool
}