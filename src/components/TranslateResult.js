import React from 'react';

import language from '../google-translate-api/languages';
import style from '../style';

class TranslateResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  btnStyle() {
    return {
      ...style.st_result_area,
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
              <div style={style.st_audio_button}>
                <div style={style.st_audio_button_img}></div>
              </div>
              <div style={style.st_body}>{this.displayResult(type)}</div>
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

              <div style={style.st_language}>
                <select style={style.st_lang_selector}>
                  {this.renderLanguageSelector()}
                </select>
              </div>

              {this.renderTranslateBlock("orig")}

              <div style={{...style.st_language, marginTop: "3px"}}>CHINESE (SIMPLIFIED)</div>

              {this.renderTranslateBlock("trans")}

              <div>
                <a style={{...style.st_link, float: "left"}} target="_blank" href="extension://xxx/options.html">EXTENSION OPTIONS</a>
                <a style={{...style.st_link, float: "right"}} target="_blank" href="https://translate.google.com/?" >MORE »</a>
              </div>

            </div>
    );
  }
}

module.exports = TranslateResult;
