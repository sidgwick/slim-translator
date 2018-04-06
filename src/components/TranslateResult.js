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

  displayResult(type) {
    let sentences = this.props.res.sentences;
    return sentences.map((item, key) => {
      if (item[type]) {
        return item[type];
      }
    });
  }

  render() {
    return (
            <div id={this.props.id} style={this.btnStyle()}>

              <div className="gtx-language">
                <select className="gtx-lang-selector">
                  <option value="af">Afrikaans</option>
                  <option value="zu">Zulu</option>
                </select>
              </div>

              <div className="gtx-source-block">
                <div className="gtx-audio-button">
                  <div className="gtx-button-img"></div>
                </div>
                <div className="gtx-body">{this.displayResult("orig")}</div>
                <br />
              </div>

              <div className="gtx-language gtx-target-language">CHINESE (SIMPLIFIED)</div>

              <div className="gtx-target-block">
                <div className="gtx-audio-button">
                  <div className="gtx-button-img"></div>
                </div>
                <div className="gtx-body">{this.displayResult("trans")}</div>
              </div>

              <div>
                <a className="gtx-link gtx-link-left" target="_blank" href="extension://xxx/options.html">EXTENSION OPTIONS</a>
                <a className="gtx-link gtx-link-right" target="_blank" href="https://translate.google.com/?" >MORE »</a>
              </div>

            </div>
    );
  }
}

module.exports = TranslateResult;
