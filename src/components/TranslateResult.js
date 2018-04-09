import React from 'react';

import language from '../google-translate-api/languages';
import style from '../style';

class TranslateResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  wrapperStyle() {
    return {
      ...style.st_result_wrapper,
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
            <div id={this.props.id} style={this.wrapperStyle()}>

              <div style={style.st_translate_body}>

                <div style={style.st_language}>
                  <select style={style.st_lang_selector}>
                    {this.renderLanguageSelector()}
                  </select>
                </div>

                {this.renderTranslateBlock("orig")}

                <div style={{...style.st_language, marginTop: "3px"}}>CHINESE (SIMPLIFIED)</div>

                {this.renderTranslateBlock("trans")}

                <div style={style.st_option}>
                  <a style={style.st_link} target="_blank" href="extension://xxx/options.html">EXTENSION OPTIONS</a>
                  <a style={style.st_link} target="_blank" href="https://translate.google.com/?" >MORE »</a>
                </div>

              </div>

              <div style={style.st_close_button}></div>

              <div style={style.st_result_arrow}>
                <div style={{...style.st_result_arrow_border, ...style.st_result_arrow_before}}></div>
                <div style={{...style.st_result_arrow_border, ...style.st_result_arrow_after}}></div>
              </div>


            </div>
    );
  }
}

module.exports = TranslateResult;
