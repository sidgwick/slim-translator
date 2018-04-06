import React from 'react';

class TranslateResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  btnStyle() {
    return {
      top: this.props.pos.top,
      left: this.props.pos.left
    };
  }

  displayResult() {
      let text = [];
      this.props.res.sentences.forEach((item) => {
        if (item.trans) {
          text.push(item.trans);
        }
      });
      let result = text.join("\n");
      console.log(result);
      return result;
  }

  render() {
    console.log(this.props);
    return (<div id={this.props.id} style={this.btnStyle()}>{this.displayResult()}</div>);
  }
}


module.exports = TranslateResult;
