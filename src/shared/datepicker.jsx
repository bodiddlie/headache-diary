import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import cx from 'classnames';

export class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    calculateBackground: PropTypes.func
  }

  constructor(props) {
    super(props);

    const value = this.props.value || moment();
    const currentMonth = moment(value).startOf('month');
    const days = this.generateDays(currentMonth);

    this.state = {
      value,
      currentMonth,
      days
    }
  }

  generateDays = (currentMonth) => {
    const lastMonthDays = moment(currentMonth).startOf('month').day();
    let current = moment(currentMonth).subtract(lastMonthDays, 'days');

    let days = [];

    for (let i = 0; i < 42; i++) {
      let day = {
        date: current,
      }
      days.push(day);
      current = moment(current).add(1, 'days');
    }

    return days;
  }

  onNextMonth = () => {
    const currentMonth = moment(this.state.currentMonth).add(1, 'months');
    this.setState({
      currentMonth,
      days: this.generateDays(currentMonth)
    });
  }

  onPrevMonth = () => {
    const currentMonth = moment(this.state.currentMonth).subtract(1, 'months');
    this.setState({
      currentMonth,
      days: this.generateDays(currentMonth)
    });
  }

  onDayClick = (day) => {
    if (day.isBefore(this.state.currentMonth, 'month')) {
      this.onPrevMonth();
    } else if(day.isAfter(this.state.currentMonth, 'month')) {
      this.onNextMonth();
    }

    this.setState({
      value: day
    });
  }

  render() {
    const {days} = this.state;
    let dayRows = [];
    for (let row = 0; row < 6; row++) {
      let dayCells = [];
      for (let col = 0; col < 7; col++) {
        const day = days[col + (row * 7)];

        const color = this.props.calculateBackground ?
          this.props.calculateBackground(day.date) :
          'transparent';
        dayCells.push((
          <Day 
            key={col} 
            date={day.date}
            selected={day.date.isSame(this.state.value, 'day')}
            onDayClick={this.onDayClick}
            color={color}
          />
        ))
      }
      dayRows.push(<tr key={row}>{dayCells}</tr>);
    }
    return (
      <div className="datepicker">
        <div className="dp-month">
          <button type="button" onClick={this.onPrevMonth}>&larr;</button>
          <span>{this.state.currentMonth.format('MMMM YYYY')}</span>
          <button type="button" onClick={this.onNextMonth}>&rarr;</button>
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

const Day = ({date, selected, onDayClick, color}) => {
  const containerClasses = cx(
    'dp-container',
    {selected}
  );

  const classes = cx(
    'dp-day',
  );

  const circleColorStyle = {
    background: color
  };

  return (
    <td>
      <div className={containerClasses} onClick={() => onDayClick(date)}>
      <div className={classes} style={circleColorStyle}>
        <span>{date.date()}</span>
      </div>
      </div>
    </td>
  );
}

Day.propTypes = {
  date: PropTypes.object.isRequired,
  booked: PropTypes.bool,
  selected: PropTypes.bool,
  onDayClick: PropTypes.func.isRequired,
  color: PropTypes.string
}