import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {auth} from './firebase';

export const Header = ({user}) => (
  <Container>
    <Left>Pain Diary</Left>
      {!!user ? (
        <Right>
          <span>Welcome, {user.displayName}</span>
          <LogoutButton onClick={() => auth.signOut()}>Logout</LogoutButton>
        </Right>
      ) : (
        <Right>
          <Link to="/login">Login</Link>
        </Right>
      )}
  </Container>
)

Header.propTypes = {
  user: React.PropTypes.object
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3em;
  background-color: #787878;
  color: #efefef;
  padding: .5em;
  margin-bottom: 1rem;
`

const Left = styled.div`
`

const Right = styled.div`
`

const LogoutButton = styled.button`
  color: #efefef;
  background-color: #0000ff;
  display: inline-block;
  border: none;
  padding: .6em .9em;
  margin: 0 .3em;
  border-radius: 2em;
  cursor: pointer;

  &:hover {
    background-color: #3333ff;
  }
`