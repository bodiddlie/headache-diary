import React from 'react'
import styled from 'styled-components';

import {PainForm} from './pain-form';
import {Uid} from '../uid';
import {Header} from './header';

export const DayForm = () => (
  <Uid>
    {(uid) => (
      <div>
        <Header />
        <Wrapper>
          <PainForm uid={uid} />
        </Wrapper>
      </div>
    )}
  </Uid>
)

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`