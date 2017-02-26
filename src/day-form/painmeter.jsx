import React from 'react';
import styled from 'styled-components';

export const PainMeter = ({min, max, value, onSelect}) => {
  const length = max - min + 1;
  const segments = Array.from({length}, (u, i) => (
    <PainSegment 
      key={i}
      value={i + min}
      active={value === i + min}
      onSelect={onSelect}
      count={max - min + 1}
    />
  ));

  return (
    <Meter>
      {segments}
    </Meter>
  );
}

PainMeter.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  value: React.PropTypes.number,
  onSelect: React.PropTypes.func.isRequired
}

PainMeter.defaultProps = {
  min: 0,
  max: 10,
  value: 5
}

const PainSegment = ({value, active, onSelect, count}) => {
  const startColor = 120 - Math.ceil((value / count) * 120);
  const endColor = 120 - Math.ceil(((value + 1) / count) * 120);
  const color = `linear-gradient(to right, hsl(${startColor}, 100%, 50%), hsl(${endColor}, 100%, 50%))`;

  return (
    <Segment color={color} active={active} onClick={() => onSelect(value)}>
      <span>{value}</span>
    </Segment>
  )
}

PainSegment.propTypes = {
  value: React.PropTypes.number.isRequired,
  count: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired,
  onSelect: React.PropTypes.func.isRequired,
}

const Meter = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  box-shadow: inset 2px 2px 16px 1px rgba(0, 0, 0, 0.75);
  border-radius: 25px;
`;

const Segment = styled.div`
  display: flex;
  flex-grow: 1;
  cursor: pointer;
  height: 30px;
  justify-content: center;
  color: #333;
  align-items: center;
  font-weight: bold;
  font-size: .75em;
  border-top: 1px solid #666;
  border-left: 1px solid #666;
  border-bottom: 1px solid #666;
  box-shadow: ${props => props.active ? 'inset 0 0 10px #333' : 'none'};
  background: ${props => props.color};

  &:first-child {
    border-radius: 15px 0 0 15px;
  }

  &:last-child {
    border-right: 1px solid #666;
    border-radius: 0 15px 15px 0;
  }

  &:hover {
    box-shadow: inset 0 0 10px #666;
  }
`;