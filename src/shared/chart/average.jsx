// @flow
import React from 'react';

const avgColor = 'hsl(178, 56%, 50%)';

type Props = {
  height: number,
  parentWidth: number,
  avg: number
}

export class Average extends React.Component {
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
    window.removeEventListener('reisze', this.listener);
  }

  updateWidth() {
    if (!this.svg) return;

    const width = this.svg.getBoundingClientRect().width;
    this.setState({width});
  }

  render() {
    const {height, avg, parentWidth} = this.props;
    const xPos = (parentWidth / 2) - (this.state.width / 2);
    return (
      <svg x={xPos} y={height + 8} overflow="visible" ref={r => this.svg = r}>
        <rect x="0" y="0" width="5" height="5" stroke="black" strokeWidth=".75" fill={avgColor} />
        <text x="7" y="2" fontSize="12" fontWeight="12" dominantBaseline="central" fill="black">Avg: {avg.toFixed(2)}</text>
      </svg>
    )
  }
}