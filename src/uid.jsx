import React from 'react';

export class Uid extends React.Component {
  static contextTypes = {
    uid: React.PropTypes.string
  }

  static propTypes = {
    children: React.PropTypes.func.isRequired
  }

  render() {
    return this.props.children(this.context.uid);
  }
}