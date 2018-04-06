import React from 'react';

class TranslateResultLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (<p>{this.props.text}</p>);
  }
}

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
    let sentences = this.props.res.sentences;
    return sentences.map((item, key) => {
      if (item.trans) {
        return <TranslateResultLine text={item.trans} key={key} />
      }
    });
  }

  render() {
    return (<div id={this.props.id} style={this.btnStyle()}>{this.displayResult()}</div>);
  }
}


module.exports = TranslateResult;
