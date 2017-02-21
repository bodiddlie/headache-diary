import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

import {auth} from '../firebase';
import {Header as H, HeaderButton, HeaderLinkButton, HeaderTextLink} from '../shared/header';

export const Header = withRouter(({user, push}) => (
  <H>
    <Left>
      <HeaderTextLink to="/">Pain Diary</HeaderTextLink>
    </Left>
    {!!user ? (
      <Right>
        <HeaderTextLink to="/days">Go To Pain Form</HeaderTextLink> 
        <HeaderButton onClick={() => auth.signOut()}><i className="fa fa-sign-out"></i> Logout</HeaderButton>
      </Right>
    ) : (
      <Right>
        <HeaderLinkButton to="/login"><i className="fa fa-sign-in"></i> Log In</HeaderLinkButton>
      </Right>
    )}
  </H>
))

const Left = styled.div`
`

const Right = styled.div`
`