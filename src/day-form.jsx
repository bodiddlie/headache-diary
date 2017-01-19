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
  width: 100%;
  align-items: flex-start;
  
  @media (min-width: 768px) {
    flex-wrap: nowrap;
  }
`

const FormContainer = styled.div`
  display: flex;
  flex: 1 1 50%;
  padding: 5px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex: 1 1 50%;
  padding: 5px;
`