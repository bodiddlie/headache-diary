import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import styled from 'styled-components';

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
      <Picker>
        <Month>
          <button type="button" onClick={this.onPrevMonth}>&larr;</button>
          <span>{this.state.currentMonth.format('MMMM YYYY')}</span>
          <button type="button" onClick={this.onNextMonth}>&rarr;</button>
        </Month>
        <Calendar>
          <Item>Sun</Item>
          <Item>Mon</Item>
          <Item>Tue</Item>
          <Item>Wed</Item>
          <Item>Thu</Item>
          <Item>Fri</Item>
          <Item>Sat</Item>
          {dayItems}
        </Calendar>
      </Picker>
    )
  }
}

const Day = ({date, selected, onDayClick, color}) => {
  return (
    <Item>
      <Container onClick={() => onDayClick(date)} selected={selected}>
        <Circle color={color}>
          <span>{date.date()}</span>
        </Circle>
      </Container>
    </Item>
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
  <Item>
    <Container>
      <Circle empty>
        <span>&nbsp;</span>
      </Circle>
    </Container>
  </Item>
);

const Picker = styled.div`
  width: 300px;
  padding: 10px;
`;

const Month = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Item = styled.div`
  text-align: center;
  width: calc(14%);
  height: calc(width);
`;

const Calendar = styled.div`
  font-size: .75em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: ${props => props.selected ? '1px solid blue' : '1px solid transparent'};
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 30px;
  height: 30px;
  transition: all linear 100ms;
  background: ${props => !!props.color ? props.color : 'transparent'};

  &:hover {
    box-shadow: ${props => props.empty ? 'none' : '3px 3px 3px #888'};
  }
`