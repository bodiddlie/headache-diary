import React from 'react';
import styled from 'styled-components';

export const Header = () => (
  <Container>
    <Left>Home</Left>
    <Middle>Pain Diary</Middle>
    <Right>
      <LogoutButton>Logout</LogoutButton>
    </Right>
  </Container>
)

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 3em;
  background-color: #787878;
  color: #efefef;
  padding: .5em;
`

const Left = styled.div`
`

const Middle = styled.div`
  flex-grow: 1;
  text-align: center;
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