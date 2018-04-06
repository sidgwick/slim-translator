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
    let btn_id = `${this.props.id}_button`
    return (
            <div id={this.props.id} style={this.btnStyle()}>
              <div id={btn_id} onClick={(e) => this.onButtonClick()}></div>
            </div>
    );
  }
}


module.exports = TranslateButton;
