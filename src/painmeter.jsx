import React from 'react';
import cx from 'classnames';

export const PainMeter = ({min, max, value, onSelect}) => {
  let segments = [];
  for (let i = min; i <= max; i++) {
    segments.push((
      <PainSegment
        key={i}
        value={i}
        active={value === i}
        onSelect={onSelect}
        first={i === min}
        last={i === max}
        count={max - min + 1}
      />
    ));
  }

  return (
    <div className="meter">
      {segments}
    </div>
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

const PainSegment = ({value, active, onSelect, first, last, count}) => {
  const startColor = 120 - Math.ceil((value / count) * 120);
  const endColor = 120 - Math.ceil(((value + 1) / count) * 120);
  const segmentStyle = {
    background: `linear-gradient(to right, hsl(${startColor}, 100%, 50%), hsl(${endColor}, 100%, 50%))`
  };

  const classes = cx(
    'segment',
    { active }
  );

  return (
    <div 
      className={classes}
      style={segmentStyle} 
      onClick={() => onSelect(value)}
    >
      <span>{value}</span>
    </div>
  )
}

PainSegment.propTypes = {
  value: React.PropTypes.number.isRequired,
  count: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  first: React.PropTypes.bool,
  last: React.PropTypes.bool,
}