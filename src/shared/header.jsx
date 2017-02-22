import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

export const Header = ({children, marginBottom}) => (
  <Container marginBottom={marginBottom}>
    {children}
  </Container>
)

Header.propTypes = {
  children: React.PropTypes.node,
  marginBottom: React.PropTypes.string
}

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3em;
  background-color: hsla(0, 0%, 50%, .4);
  color: #efefef;
  padding: .5em;
  margin-bottom: ${props => props.marginBottom || '0'};
`

/*
const buttonStyle = (hue) => css`
  background-image: linear-gradient(to bottom, #42d934, #53914c);
  border-radius: 8px;
  color: #efefef;
  font-size: 12px;
  padding: 2px 5px 2px 5px;
  margin-left: 20px;
  text-decoration: none;

  &:hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #49e837, #65b35b);
  }
`
*/

const buttonStyle = (hue) => css`
  background-image: linear-gradient(to bottom, hsl(${hue}, 69%, 53%), hsl(${hue}, 31%, 43%));
  border-radius: 8px;
  color: #efefef;
  font-size: 12px;
  padding: 2px 5px 2px 5px;
  margin-left: 20px;
  text-decoration: none;

  &:hover {
    background-image: linear-gradient(to bottom, hsl(${hue}, 80%, 60%), hsl(${hue}, 42%, 50%));
  }
`

export const HeaderButton = styled.button`
  ${buttonStyle(114)}
`

export const HeaderLinkButton = styled(Link)`
  ${buttonStyle(114)}
`

export const HeaderTextLink = styled(Link)`
  text-decoration: none;
  color: #cdcdcd;
  font-weight: bold;

  &:hover {
    color: #efefef;
  }
`
