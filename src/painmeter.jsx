import React, {Component} from 'react';
import cx from 'classnames';

import './painmeter.css';

export class PainMeter extends Component {
  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number
  }

  static defaultProps = {
    min: 0,
    max: 10
  }

  state = {
    value: 5
  }

  handleSelect = (value) => {
    this.setState({value});
  }

  render() {
    const {min, max} = this.props;
    let segments = [];
    for (let i = min; i <= max; i++) {
      segments.push((
        <PainSegment
          key={i}
          value={i}
          active={this.state.value === i}
          onSelect={this.handleSelect}
          first={i === min}
          last={i === max}
        />
      ));
    }

    return (
      <div className="meter">
        {segments}
      </div>
    );
  }
}

const PainSegment = ({value, active, onSelect, first, last}) => {
  const segmentStyle = {
    background: `hsl(${120 - Math.ceil((value / 10) * 120)}, 100%, 50%`
  };

  const radiusStyle = first ?
    { borderRadius: '15px 0 0 15px' } :
    last ?
      { borderRadius: '0 15px 15px 0' } :
      { borderRadius: '0' }

  const classes = cx(
    'segment',
    { active }
  );

  return (
    <div 
      className={classes}
      style={{...segmentStyle, ...radiusStyle}} 
      onClick={() => onSelect(value)}
    >
      <span>{value}</span>
    </div>
  )
}

PainSegment.propTypes = {
  value: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  first: React.PropTypes.bool,
  last: React.PropTypes.bool
}