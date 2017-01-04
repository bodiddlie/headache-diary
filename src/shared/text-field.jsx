import React from 'react';
import {StyleSheet, css} from 'aphrodite';

let styles;

export const TextField = ({value, label, errorText, onFieldChanged, type, showError}) => (
  <div className={css(styles.group)}>
    <label className={css(styles.label)}>{label}</label>
    <input
      className={css(styles.input, styles.focus)}
      type={type}
      placeholder={label}
      value={value}
      onChange={onFieldChanged}
    />
    {showError && 
      <div className={css(styles.error)}>
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

styles = StyleSheet.create({
  label: {
    display: 'block',
    fontWeight: 'bold'
  },
  input: {
    display: 'block',
    width: '100%',
    fontSize: 'x-large',
    padding: '5px',
    borderRadius: '5px',
    boxShadow: 'none',
    border: '1px solid #dcdcdc',
    transition: 'box-shadow 0.3s, border 0.3s'
  },
  focus: {
    ':focus': {
      border: '1px solid #00ddee',
      boxShadow: '0 0 5px 1px #969696'
    }
  },
  group: {
    margin: '10px 0',
    width: '100%'
  },
  error: {
    color: 'red',
    fontWeight: 'bold'
  }
})