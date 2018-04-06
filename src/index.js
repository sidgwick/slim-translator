/**
 * A slim translator browser extension use google translate api
 */

import React from 'react';
import ReactDOM from 'react-dom';

import gt from './google-translate-api';
import TranslateButton from './components/TranslateButton';
import TranslateResult from './components/TranslateResult';

var translator = {
  root_ele_id: "__slim_translate_root",
  tooltip_ele_id: "__slim_translate_button",
  result_ele_id: "__slim_translate_result_area",
  event: null,
  text: null,

  run: function (event) {
    let selection = document.getSelection();

    this.event = event;
    this.text = selection.toString();
    if (!this.text) {
      return;
    }

    let trans_root = document.getElementById(this.root_ele_id);
    if (!trans_root) {
      let body = document.getElementsByTagName("body")[0];
      let root_div = document.createElement("div");
      root_div.id = this.root_ele_id;
      body.appendChild(root_div);
    }

    this.display_tooltip();
  },

  tooltip_position: function () {
    let x = this.event.clientX + 10;
    let y = this.event.clientY + 5;

    return {left: x, top: y};
  },

  display_tooltip: function () {
    let pos = this.tooltip_position();
    let root_ele = document.getElementById(this.root_ele_id);
    ReactDOM.render(<TranslateButton id={this.tooltip_ele_id} pos={pos} onClick={() => this.translate()} />, root_ele);
  },

  translate: function () {
    console.log("starting translate");

    gt(this.text, {
      to: 'zh-CN'
    }).then(res => {
      console.log("google is alive");
      console.log(res);
      this.display_translate_result(res);
    }).catch(err => {
      console.log("google is dead");
      console.error(err);
    });
  },

  display_translate_result: function (res) {
    let pos = this.tooltip_position();
    let root_ele = document.getElementById(this.root_ele_id);
    ReactDOM.render(<TranslateResult id={this.result_ele_id} pos={pos} res={res} />, root_ele);
  },
};

window.addEventListener("mouseup", (event) => {
  translator.run(event);
});

