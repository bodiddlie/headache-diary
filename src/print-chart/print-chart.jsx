// @flow

import React from 'react';
import styled from 'styled-components';

import {Uid} from '../uid';
import {Header} from './header';
import {ChartForm} from './chart-form';

export const ChartPage = ({match}: any) => (
  <Uid>
    {(uid) => (
      <PrintChart uid={uid} month={match.params.month} />
    )}
  </Uid>
)

type ChartProps = {
  uid: string,
  month: string
};

const PrintChart = ({uid, month}: ChartProps) => (
  <main>
    <HeaderContainer>
      <Header user={uid} />
    </HeaderContainer>
    <ChartForm uid={uid} month={month} />
  </main>
)

const HeaderContainer = styled.div`
  @media print {
    display: none;
  }
`