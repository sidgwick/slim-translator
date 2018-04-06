import React from 'react';

class TranslateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onButtonClick() {
    this.props.onClick();
  }

  btnStyle() {
    return {
      top: this.props.pos.top,
      left: this.props.pos.left
    };
  }

  render() {
    return (<button id={this.props.id} onClick={(e) => this.onButtonClick()} style={this.btnStyle()}></button>);
  }
}


module.exports = TranslateButton;
