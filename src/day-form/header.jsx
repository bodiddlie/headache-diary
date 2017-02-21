import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

import {auth} from '../firebase';
import {Header as H, HeaderButton, HeaderTextLink} from '../shared/header';

export const Header = withRouter(({push}) => (
  <H marginBottom=".5rem">
    <Left>
      <HeaderTextLink to="/">Home</HeaderTextLink>
    </Left>
    <Right>
      <HeaderButton onClick={() => auth.signOut()}><i className="fa fa-sign-out"></i> Logout</HeaderButton>
    </Right>
  </H>
))

const Left = styled.div`
`

const Right = styled.div`
`