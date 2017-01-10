import React from 'react'
import styled from 'styled-components';

import {PainForm} from './pain-form';
import {Dashboard} from './dashboard';
import {Uid} from './uid';

export const DayForm = () => (
  <Uid>
    {(uid) => (
      <Wrapper>
        <FormContainer>
          <PainForm uid={uid} />
        </FormContainer>
        <ChartContainer>
          <Dashboard uid={uid} />
        </ChartContainer>
      </Wrapper>
    )}
  </Uid>
)

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 50vw;
  padding: 5px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 50vw;
  padding: 5px;
`