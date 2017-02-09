import React from 'react';
import styled from 'styled-components';
import {Link, withRouter} from 'react-router-dom';

import {auth} from './firebase';

export const Header = withRouter(({user, push}) => (
  <Container>
    <Left>Pain Diary</Left>
      {!!user ? (
        <Right>
          <Button onClick={() => auth.signOut()}><i className="fa fa-sign-out"></i> Logout</Button>
        </Right>
      ) : (
        <Right>
          <StyledLink to="/login"><i className="fa fa-sign-in"></i> Log In</StyledLink>
        </Right>
      )}
  </Container>
))

Header.propTypes = {
  user: React.PropTypes.object
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3em;
  background-color: hsla(0, 0%, 50%, .4);
  color: #efefef;
  padding: .5em;
`

const Left = styled.div`
`

const Right = styled.div`
`

const Button = styled.button`
  background-image: linear-gradient(to bottom, #42d934, #53914c);
  border-radius: 8px;
  font-family: Arial;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 5px 2px 5px;
  text-decoration: none;

  &:hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #49e837, #65b35b);
    text-decoration: none;
  }
`

const StyledLink = styled(Link)`
  background-image: linear-gradient(to bottom, #42d934, #53914c);
  border-radius: 8px;
  font-family: Arial;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 5px 2px 5px;
  text-decoration: none;

  &:hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #49e837, #65b35b);
    text-decoration: none;
  }
`