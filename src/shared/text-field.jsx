import React from 'react';

export const TextField = ({value, label, errorText, onFieldChanged, type, showError}) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={onFieldChanged}
    />
    {showError && 
      <div className="validation-error">
        {errorText}
      </div>
    }
  </div>
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