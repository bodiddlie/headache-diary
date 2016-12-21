import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import cx from 'classnames';

export class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    calculateBackground: PropTypes.func,
    onDayClick: PropTypes.func,
    onMonthChange: PropTypes.func
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
        date: current.month() === currentMonth.month() ? current : null,
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

    this.props.onMonthChange && this.props.onMonthChange(currentMonth);
  }

  onPrevMonth = () => {
    const currentMonth = moment(this.state.currentMonth).subtract(1, 'months');
    this.setState({
      currentMonth,
      days: this.generateDays(currentMonth)
    });

    this.props.onMonthChange && this.props.onMonthChange(currentMonth);
  }

  onDayClick = (day) => {
    this.setState({
      value: day
    });

    this.props.onDayClick(day);
  }

  render() {
    const {days} = this.state;
    const {calculateBackground} = this.props;

    const dayItems = days.map((day, index) => {
      if (day.date) {
      const color = calculateBackground ? calculateBackground(day.date) : 'transparent';
        return (
          <Day
            key={day.date.format('MMDDYYYY')}
            date={day.date}
            selected={day.date.isSame(this.state.value, 'day')}
            onDayClick={this.onDayClick}
            color={color}
          />
        );
      } else {
        return <EmptyDay key={index} />;
      }
    })
    return (
      <div className="datepicker">
        <div className="dp-month">
          <button type="button" onClick={this.onPrevMonth}>&larr;</button>
          <span>{this.state.currentMonth.format('MMMM YYYY')}</span>
          <button type="button" onClick={this.onNextMonth}>&rarr;</button>
        </div>
        <div className="dp-calendar">
          <div className="dp-calendar--item">Sun</div>
          <div className="dp-calendar--item">Mon</div>
          <div className="dp-calendar--item">Tue</div>
          <div className="dp-calendar--item">Wed</div>
          <div className="dp-calendar--item">Thu</div>
          <div className="dp-calendar--item">Fri</div>
          <div className="dp-calendar--item">Sat</div>
          {dayItems}
        </div>
      </div>
    )
  }
}

const Day = ({date, selected, onDayClick, color}) => {
  const containerClasses = cx(
    'dp-container',
    {selected}
  );

  const circleColorStyle = {
    background: color
  };

  return (
    <div className="dp-calendar--item">
      <div className={containerClasses} onClick={() => onDayClick(date)}>
        <div className="dp-day" style={circleColorStyle}>
          <span>{date.date()}</span>
        </div>
      </div>
    </div>
  )
}

Day.propTypes = {
  date: PropTypes.object.isRequired,
  booked: PropTypes.bool,
  selected: PropTypes.bool,
  onDayClick: PropTypes.func.isRequired,
  color: PropTypes.string
}

const EmptyDay = () => (
  <div className="dp-calendar--item">
    <div className="dp-empty">
      <div className="dp-day">
        <span>&nbsp;</span>
      </div>
    </div>
  </div>
);