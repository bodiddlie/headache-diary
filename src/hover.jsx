import React, {Component} from 'react';

export class Hover extends Component {
  static propTypes = {
    children: React.PropTypes.func.isRequired,
    style: React.PropTypes.object
  }

  state = {
    hovered: false
  }

  onMouseOver = () => {
    this.setState({hovered: true});
  }

  onMouseLeave = () => {
    this.setState({hovered: false});
  }

  render() {
    return (
      <div onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave} style={this.props.style}>
        {this.props.children(this.state)}
      </div>
    )
  }
}