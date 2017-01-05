import React from 'react';
import styled from 'styled-components';

export const TextField = ({value, label, errorText, onFieldChanged, type, showError}) => (
  <InputGroup>
    <Label>{label}</Label>
    <Input
      type={type}
      placeholder={label}
      value={value}
      onChange={onFieldChanged}
    />
    {showError && 
      <ValidationError>
        {errorText}
      </ValidationError>
    }
  </InputGroup>
)

TextField.propTypes = {
  value: React.PropTypes.any,
  label: React.PropTypes.string.isRequired,
  errorText: React.PropTypes.string,
  type: React.PropTypes.string,
  showError: React.PropTypes.bool,
  onFieldChanged: React.PropTypes.func
}

TextField.defaultProps = {
  type: 'text'
}

const InputGroup = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-size: x-large;
  padding: 5px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #dcdcdc;
  transition: box-shadow 0.3s, border 0.3s;

  &:focus {
    border: 1px solid #00ddee;
    box-shadow: 0 0 5px 1px #969696;
  }
`;

const ValidationError = styled.div`
  color: red;
  font-weight: bold;
`;