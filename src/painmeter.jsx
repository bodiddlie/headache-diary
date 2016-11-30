import React, {Component} from 'react';

import {HoverHOC} from './hover';

export class PainMeter extends Component {
  state = {
    value: 5
  };

  handleSelect = (value) => {
    this.setState({value});
  }

  render() {
    const meterStyle = {
      display: 'flex'
    };

    let segments = [];
    /*
    for (let i = 0; i <= 10; i++) {
      segments.push((
        <Hover key={i} style={{flexGrow: '1'}}>
          {({hovered}) => (
            <PainSegment 
              value={i} 
              active={this.state.value === i} 
              hovered={hovered} 
              onSelect={this.handleSelect} 
            />
          )}
        </Hover>
      ));
    }
    */
    for (let i = 0; i <= 10; i++) {
      segments.push((
        <HoverPainSegment
          key={i}
          value={i}
          active={this.state.value === i}
          onSelect={this.handleSelect}
        />
      ));
    }

    return (
      <div style={meterStyle}>
        {segments}
      </div>
    );
  }
}

const PainSegment = ({value, active, hovered, onSelect}) => {
  const segmentStyle = {
    display: 'flex',
    flexGrow: '1',
    height: '50px',
    justifyContent: 'center',
    background: `hsl(${120 - Math.ceil((value / 10) * 120)}, 100%, 50%`,
    color: '#333',
    alignItems: 'center',
    fontWeight: 'bold',
    border: active ?
      '5px solid purple' :
      hovered ?
        '5px solid #cdcdcd' :
        '5px solid transparent'
  };

  return (
    <div style={segmentStyle} onClick={() => onSelect(value)}><span>{value}</span></div>
  )
}

PainSegment.propTypes = {
  value: React.PropTypes.number.isRequired,
  active: React.PropTypes.bool.isRequired,
  hovered: React.PropTypes.bool.isRequired,
  onSelect: React.PropTypes.func.isRequired
}

const HoverPainSegment = HoverHOC(PainSegment);