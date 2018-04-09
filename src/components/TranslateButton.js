import React from 'react';

import style from '../style';

class TranslateButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onButtonClick(e) {
    this.props.onClick();
  }

  btnStyle() {
    return {
      ...style.st_button_area,
      top: this.props.pos.top,
      left: this.props.pos.left
    };
  }

  render() {
    return (
            <div id={this.props.id} style={this.btnStyle()}>
              <div onClick={(e) => this.onButtonClick(e)} style={style.st_button}></div>
            </div>
    );
  }
}


module.exports = TranslateButton;
