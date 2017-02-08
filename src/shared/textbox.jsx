import React from 'react';
import styled from 'styled-components';

export const TextBox = ({label, name, value, onChange}) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <TextArea 
        value={value} 
        name={name} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </Container>
  );
}

TextBox.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

const Container = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px #ccc, 0 10px 15px #eee inset;
  border: 1px solid #aaa;

  &:focus {
    border: 1px solid #555;
    outline: none;
    box-shadow: 0 0 3px #aaa;
  }
`;