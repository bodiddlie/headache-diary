import React from 'react';
import moment from 'moment';

import {DayForm} from './day-form';

export const FormPage = ({params}) => {
  let date = moment(params.id);
  if (!date.isValid()) date = moment();

  return <DayForm date={date} />
}

FormPage.propTypes = {
  params: React.PropTypes.object.isRequired
}