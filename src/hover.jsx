import React, {Component} from 'react';

/*
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
*/

export const HoverHOC = (Wrapped) => {
  return class Hover extends React.Component {
    state = {
      hovered: false
    }

    getWrapped(instance) {
      console.log(instance);
      this.element = instance;
    }

    componentDidMount() {
      this.element.getDOMNode().addEventListener('mousemove', this.onMouseOver);
      this.element.getDOMNode().addEventListener('mouseleave', this.onMouseLeave);
    }

    componentWillUnmount() {
      this.element.getDOMNode().removeEventListener('mousemove', this.onMouseOver);
      this.element.getDOMNode().removeEventListener('mouseleave', this.onMouseLeave);
    }

    onMouseOver = () => {
      console.log('hovering');
      this.setState({hovered: true});
    }

    onMouseLeave = () => {
      this.setState({hovered: false});
    }

    render() {
      const props = Object.assign({}, this.props, {ref: this.getWrapped.bind(this)})
      return (
        <Wrapped 
          {...props} 
          hovered={this.state.hovered} 
        />
      );
    }
  }
}