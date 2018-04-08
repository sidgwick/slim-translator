/**
 * A slim translator browser extension use google translate api
 */

import React from 'react';
import ReactDOM from 'react-dom';

import gt from './google-translate-api';
import TranslateButton from './components/TranslateButton';
import TranslateResult from './components/TranslateResult';

import style from './style';

var translator = {
  root_ele_id: "__st_root",
  button_ele_id: "__st_button_area",
  result_ele_id: "__st_result_area",
  event: null,
  text: null,

  run: function (event) {
    this.event = event;
    this.initTranslateRootArea();

    if (document.getElementById(this.button_ele_id)) {
      // 走到这里表示在:
      // 1. 点击翻译按钮, 由按钮 onClick 来处理接下来的动作
      // 2. 点击翻译按钮以外的地方, 清空翻译根 DOM
      this.tryUmountTranslateButton();
      return;
    }

    if (document.getElementById(this.result_ele_id)) {
      // 走到这里判断是不是点击在了显示结果区域
      // 1. 是, 不做任何处理
      // 2. 不是, 清空翻译根 DOM
      this.tryUmountTranslateResult();
      return;
    }

    let selection = document.getSelection();
    this.text = selection.toString();
    if (!this.text) {
      return;
    }

    this.display_tooltip();
  },

  tryUmountTranslateButton: function () {
    let button = document.getElementById(this.button_ele_id);
    this.tryClearTranslateRootDom(button);
  },

  tryUmountTranslateResult: function () {
    let result = document.getElementById(this.result_ele_id);
    this.tryClearTranslateRootDom(result);
  },

  tryClearTranslateRootDom: function (content) {
    let pos = content.getBoundingClientRect();

    let x = this.event.clientX;
    let y = this.event.clientY;

    if (pos.x <= x
        && x <= (pos.x + pos.width)
        && pos.y <= y
        && y <= (pos.y + pos.height)
    ) {
      // 点击到了按钮上
      return;
    }

    // 清空翻译根 DOM
    let root = document.getElementById(this.root_ele_id);
    ReactDOM.unmountComponentAtNode(root);
  },

  initTranslateRootArea: function () {
    let trans_root = document.getElementById(this.root_ele_id);
    if (trans_root) {
      return;
    }

    let body = document.getElementsByTagName("body")[0];
    let root_div = document.createElement("div");
    root_div.id = this.root_ele_id;
    body.appendChild(root_div);
  },

  tooltip_position: function () {
    let x = this.event.clientX + 10;
    let y = this.event.clientY + 5;

    return {left: x, top: y};
  },

  display_tooltip: function () {
    let pos = this.tooltip_position();
    let root_ele = document.getElementById(this.root_ele_id);
    ReactDOM.render(<TranslateButton id={this.button_ele_id} pos={pos} onClick={() => this.translate()} />, root_ele);
  },

  display_translate_result: function (res) {
    let pos = this.tooltip_position();
    let root_ele = document.getElementById(this.root_ele_id);
    ReactDOM.render(<TranslateResult id={this.result_ele_id} pos={pos} res={res} />, root_ele);
  },

  translate: function () {
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
};

window.addEventListener("mouseup", (event) => {
  translator.run(event);
});

