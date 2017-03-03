// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  avg: number,
  avgColor: string
}

export const Average = (props: Props) => {
  const {avg, avgColor} = props;

  return (
    <Container>
      <LegendBox color={avgColor} show={avg > 0} />
      <AverageText show={avg > 0}>Avg: {avg.toFixed(2)}</AverageText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 1rem;
`

const LegendBox = styled.div`
  height: 6px;
  width: 6px;
  background-color: ${props => props.color};
  border: 1px solid black;
  display: ${props => props.show ? 'block' : 'none'};
`

const AverageText = styled.div`
  margin-left: 5px;
  font-weight: bold;
  font-size: 12px;
  display: ${props => props.show ? 'block' : 'none'};
`