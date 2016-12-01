import React from 'react';

export const TextBox = ({label, name, value, onChange}) => {
  return (
    <div style={{width: '100%'}}>
      <label htmlFor={name}>{label}</label>
      <textarea value={value} name={name} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

TextBox.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}