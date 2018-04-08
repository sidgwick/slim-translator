import React from 'react';

import language from '../google-translate-api/languages';

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

  displayResult(type) {
    let sentences = this.props.res.sentences;
    return sentences.map((item, key) => {
      if (item[type]) {
        return item[type];
      }
    });
  }

  renderTranslateBlock(type) {
    return (
            <div className="__st-source-block">
              <div className="__st-audio-button">
                <div className="__st-button-img"></div>
              </div>
              <div className="__st-body">{this.displayResult(type)}</div>
              <br />
            </div>
    );
  }

  renderLanguageSelector() {
    return Object.keys(language).map((item, key) => {
      if (typeof language[item] !== 'string') {
        return;
      }

      return (<option value={item} key={key}>{language[item]}</option>);
    });
  }

  render() {
    return (
            <div id={this.props.id} style={this.btnStyle()}>

              <div className="__st-language">
                <select className="__st-lang-selector">
                  {this.renderLanguageSelector()}
                </select>
              </div>

              {this.renderTranslateBlock("orig")}

              <div className="__st-language __st-target-language">CHINESE (SIMPLIFIED)</div>

              {this.renderTranslateBlock("trans")}

              <div>
                <a className="__st-link __st-link-left" target="_blank" href="extension://xxx/options.html">EXTENSION OPTIONS</a>
                <a className="__st-link __st-link-right" target="_blank" href="https://translate.google.com/?" >MORE »</a>
              </div>

            </div>
    );
  }
}

module.exports = TranslateResult;
