import React from 'react';
import {StyleSheet, css} from 'aphrodite';

let styles;

export const TextBox = ({label, name, value, onChange}) => {
  return (
    <div className={css(styles.textBox)}>
      <label className={css(styles.label)} htmlFor={name}>{label}</label>
      <textarea 
        className={css(styles.textArea, styles.focus)}
        value={value} 
        name={name} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
}

TextBox.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

styles = StyleSheet.create({
  textBox: {
    width: '100%',
    marginTop: '2em'
  },
  label: {
    display: 'block',
    fontWeight: 'bold'
  },
  textArea: {
    padding: '10px',
    width: '100%',
    height: '150px',
    borderRadius: '5px',
    boxShadow: '0px 0px 3px #ccc, 0 10px 15px #eee inset',
    border: '1px solid #aaa',
  },
  focus: {
    ':focus': {
      backgroundColor: '#fff',
      borderRadius: '5px',
      border: '1px solid #555',
      outline: 'none',
      boxShadow: '0 0 3px #aaa'
    }
  }
});