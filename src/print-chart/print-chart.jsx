// @flow

import React from 'react';

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
    <Header user={uid} />
    <ChartForm uid={uid} month={month} />
  </main>
)