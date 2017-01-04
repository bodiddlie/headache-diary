import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {StyleSheet, css} from 'aphrodite';

let styles;

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
      <div className={css(styles.datepicker)}>
        <div className={css(styles.month)}>
          <button type="button" onClick={this.onPrevMonth}>&larr;</button>
          <span>{this.state.currentMonth.format('MMMM YYYY')}</span>
          <button type="button" onClick={this.onNextMonth}>&rarr;</button>
        </div>
        <div className={css(styles.calendar)}>
          <div className={css(styles.item)}>Sun</div>
          <div className={css(styles.item)}>Mon</div>
          <div className={css(styles.item)}>Tue</div>
          <div className={css(styles.item)}>Wed</div>
          <div className={css(styles.item)}>Thu</div>
          <div className={css(styles.item)}>Fri</div>
          <div className={css(styles.item)}>Sat</div>
          {dayItems}
        </div>
      </div>
    )
  }
}

const Day = ({date, selected, onDayClick, color}) => {
  const containerClasses = css(
    styles.container,
    selected && styles.selected
  )

  const circleColorStyle = {
    background: color
  };

  return (
    <div className={css(styles.item)}>
      <div className={containerClasses} onClick={() => onDayClick(date)}>
        <div className={css(styles.day, styles.hover)} style={circleColorStyle}>
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
  <div className={css(styles.item)}>
    <div className={css(styles.empty)}>
      <div className={css(styles.day)}>
        <span>&nbsp;</span>
      </div>
    </div>
  </div>
);

styles = StyleSheet.create({
  datepicker: {
    backgroundColor: 'white',
    width: '300px',
    padding: '10px'
  },
  month: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid transparent'
  },
  selected: {
    border: '1px solid blue'
  },
  empty: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid transparent'
  },
  day: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    width: '30px',
    height: '30px',
    transition: 'all linear 100ms'
  },
  hover: {
    ':hover': {
      boxShadow: '3px 3px 3px #888'
    }
  },
  calendar: {
    fontSize: '.75em',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    textAlign: 'center',
    width: 'calc(14%)',
    height: 'calc(width)'
  }
});