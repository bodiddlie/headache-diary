// @flow
import React from 'react';

import {NumberLabels} from './number-labels';
import {GridLines} from './grid-lines';
import {LineChart} from './line-chart';
import {Points} from './points';
import {Average} from './average';

type Props = {
  data: any[],
  height: number,
  condensed: boolean
}
export class Chart extends React.Component {
  props: Props;

  svg: any;
  listener: () => void;

  state = {
    width: 0
  }

  componentDidMount() {
    this.updateWidth();
    this.listener = this.updateWidth.bind(this);
    window.addEventListener('resize', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }

  updateWidth() {
    if (!this.svg) return;
    const width = this.svg.getBoundingClientRect().width;
    this.setState({width});
  }

  render() {
    const {data, height, condensed} = this.props;
    const verticalGap = (height - 10) / 10;
    const sum = data.reduce((p, c) => p + c.painLevel, 0);
    let avg = 0;

    if (data.length > 0) {
      avg = sum / data.length;
    }

    return (
      <svg width="100%" height={height + 20} ref={r => this.svg = r}>
        <rect x={0} y={0} width={'100%'} height={height + 20} stroke="black" strokeWidth={.75} fill="hsla(0, 0%, 70%, .0)" />
        <NumberLabels height={height} gap={verticalGap} condensed={condensed} />
        <GridLines height={height} gap={verticalGap} />
        <LineChart height={height} data={data} gap={verticalGap} parentWidth={this.state.width} />
        <Points height={height} data={data} gap={verticalGap} />
        {avg > 0 && (
          <Average height={height} avg={avg} parentWidth={this.state.width} />
        )}
      </svg>
    );
  }
}