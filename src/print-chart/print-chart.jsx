import React from 'react';

import {Uid} from '../uid';
import {Header} from './header';
import {ChartForm} from './chart-form';

export const ChartPage = ({match}) => (
  <Uid>
    {(uid) => (
      <PrintChart uid={uid} month={match.params.month} />
    )}
  </Uid>
)
ChartPage.propTypes = {
  match: React.PropTypes.object
}

const PrintChart = ({uid, month}) => (
  <main>
    <Header user={uid} />
    <ChartForm uid={uid} month={month} />
  </main>
)

PrintChart.propTypes = {
  uid: React.PropTypes.string,
  month: React.PropTypes.string
}