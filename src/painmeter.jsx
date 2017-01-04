import React from 'react';
import {StyleSheet, css} from 'aphrodite';

let styles;

export const PainMeter = ({min, max, value, onSelect}) => {
  const length = max - min + 1;
  const segments = Array.from({length}, (u, i) => (
    <PainSegment 
      key={i}
      value={i + min}
      active={value === i + min}
      onSelect={onSelect}
      first={i + min === min}
      last={i + min === max}
      count={max - min + 1}
    />
  ));

  return (
    <div className={css(styles.meter)}>
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

  const classes = css(
    styles.segment,
    first && styles.firstSegment,
    last && styles.lastSegment,
    active && styles.active,
    styles.hover
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

styles = StyleSheet.create({
  meter: {
    display: 'flex',
    marginTop: '2em',
    width: '100%'
  },
  segment: {
    marginTop: 0,
    display: 'flex',
    flexGrow: 1,
    cursor: 'pointer',
    height: '50px',
    justifyContent: 'center',
    color: '#333',
    alignItems: 'center',
    fontWeight: 'bold',
    borderTop: '1px solid #666',
    borderLeft: '1px solid #666',
    borderBottom: '1px solid #666',
  },
  firstSegment: {
    borderRadius: '15px 0 0 15px'
  },
  lastSegment: {
    borderRight: '1px solid #666',
    borderRadius: '0 15px 15px 0'
  },
  hover: {
    ':hover': {
      boxShadow: 'inset 0 0 10px #666'
    }
  },
  active: {
    boxShadow: 'inset 0 0 10px #333'
  }
});