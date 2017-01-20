import React from 'react'
import styled from 'styled-components';

import {PainForm} from './pain-form';
import {Uid} from './uid';

export const DayForm = () => (
  <Uid>
    {(uid) => (
      <Wrapper>
        <PainForm uid={uid} />
      </Wrapper>
    )}
  </Uid>
)

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`