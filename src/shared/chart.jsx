// @flow
import React from 'react';
import ReactDOM from 'react-dom';

const avgColor = 'hsl(178, 56%, 50%)';

type ChartProps = {
  data: any[],
  height: number,
  condensed: boolean
}
export class Chart extends React.Component {
  props: ChartProps;

  svg: any;

  state = {
    width: 0
  }

  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  updateWidth() {
    if (!this.svg) return;
    const width = ReactDOM.findDOMNode(this.svg).getBoundingClientRect().width;
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
        <LineChart height={height} data={data} />
        {avg > 0 && (
          <Average height={height} avg={avg} parentWidth={this.state.width} />
        )}
      </svg>
    );
  }
}

type NumberLabelsProps = {
  height: number,
  gap: number,
  condensed: boolean
}
const NumberLabels = ({height, gap, condensed}: NumberLabelsProps) => {
  const arr = Array.from({length: 11}, (u, i) => i);
  const nums = arr.reverse();

  return (
    <svg x="2%" y="5" width="4%" height={height + 20}>
      {nums.map((num, index) => (
        <text 
          key={`number${num}`}
          x="90%"
          y={5 + (index * gap)}
          fill="black"
          fontSize="10"
          fontWeight="bold"
          dominantBaseline="central"
          textAnchor="end"
        >{condensed ? (index % 5 > 0 ? '' : num) : num}</text>
      ))}
    </svg>
  );
}

const GridLines = ({height, gap}: {height: number, gap: number}) => {
  const arr = Array.from({length: 11}, (u, i) => i);

  return (
    <svg x="7%" y="5" width="90%" height={height + 20}>
      {arr.map(i => (
        <line
          key={`grid${i}`}
          x1={0}
          y1={5 + (i * gap)}
          x2={'100%'}
          y2={5 + (i * gap)}
          stroke={i % 5 > 0 ? 'hsla(0, 0%, 90%, .6)' : 'hsla(0, 0%, 90%, 1)'}
          strokeDasharray={i % 5 > 0 ? '5 3' : '8 1'}
          strokeWidth=".55"
        />
      ))}
    </svg>
  )
}

const LineChart = ({data, height}: {data: any, height: number}) => {
  const verticalGap = (height - 10) / 10;
  const lines = [];
  const dots = [];
  let sum = 0;
  let avg = 0;
  let avgY = 0;
  const calcYPos = (level) => ((10 - level) * verticalGap) + 5;

  data.forEach((val, i, arr) => {
    const fill = 120 - Math.ceil((val.painLevel / 11) * 120);
    const gap = 97 / (arr.length - 1);
    const cx = gap * i + 2;
    const cy = calcYPos(val.painLevel);
    if (i > 0) {
      lines.push(<line key={'line' + i} x1={`${cx - gap}%`} y1={calcYPos(arr[i-1].painLevel)} x2={`${cx}%`} y2={calcYPos(val.painLevel)} stroke="black" strokeWidth="1"/>)
    }
    dots.push(<circle key={'dot' + i} cx={`${cx}%`} cy={cy} r={3} stroke="black" strokeWidth=".25" fill={`hsl(${fill}, 100%, 50%)`}/>)
    sum += val.painLevel;
  });

  if (data.length > 0) {
    avg = sum / data.length;
    avgY = calcYPos(avg);
  }

  return (
    <svg x="7%" y="5" width="90%" height={height + 20}>
      {lines}
      {dots}
      {avgY > 0 && (
        <line x1={0} y1={avgY} x2={'100%'} y2={avgY} stroke={avgColor} strokeWidth={.95} />
      )}
    </svg>
  )
}

type AverageProps = {
  height: number,
  parentWidth: number,
  avg: number
}
class Average extends React.Component {
  props: AverageProps;

  childSvg: any;

  state = {
    childWidth: 0
  };

  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth.bind(this));
  }

  updateWidth() {
    if (!this.childSvg) return;

    const childWidth = ReactDOM.findDOMNode(this.childSvg).getBoundingClientRect().width;
    this.setState({
      childWidth
    });
  }

  render() {
    const {height, avg} = this.props;
    const xPos = (this.props.parentWidth / 2) - (this.state.childWidth / 2);
    return (
      <svg x={xPos} y={height + 8} overflow="visible" ref={r => this.childSvg = r}>
        <rect 
          x="0"
          y="0"
          width={5} 
          height={5} 
          stroke="black"
          strokeWidth={.75}
          fill={avgColor}
        />
        <text 
          x="7"
          y="2"
          fontSize="12" 
          fontWeight="bold" 
          dominantBaseline="central" 
          fill="black"
        >Avg: {avg.toFixed(2)}</text>
      </svg>
    );
  }
}