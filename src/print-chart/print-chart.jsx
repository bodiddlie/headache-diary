import React from 'react';

import {Uid} from '../uid';
import {Header} from './header';
import {ChartForm} from './chart-form';

export const ChartPage = () => (
  <Uid>
    {(uid) => (
      <PrintChart uid={uid} />
    )}
  </Uid>
)

const PrintChart = ({uid}) => (
  <main>
    <Header user={uid} />
    <ChartForm uid={uid} />
  </main>
)

PrintChart.propTypes = {
  uid: React.PropTypes.string
}