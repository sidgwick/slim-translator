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
  selection_range: null,
  text: null,

  run: function (event) {
    this.event = event;
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

    this.initTranslateRootArea();
    let selection = document.getSelection();
    this.text = selection.toString();
    this.selection_range = selection.getRangeAt(0);
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

    if (pos.x <= x && x <= (pos.x + pos.width)
        && pos.y <= y && y <= (pos.y + pos.height)
    ) {
      // 点击到了按钮上
      // 一下代码用于保持选择的字符高亮
      window.getSelection().addRange(this.selection_range);
      return true;
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
    // 默认位置是鼠标点击位置
    let x = this.event.pageX - 10;
    let y = this.event.pageY + 15;

    // 选定了文字, 以文字位置为准
    if (this.text) {
      let rect = this.selection_range.getClientRects();
      let lr = rect[rect.length - 1];

      let x1 = (lr.x + lr.x + lr.width) / 2 - 10;
      let y1 = (lr.y + lr.height + 5);

      // 文字选择和鼠标事件差太多, 还是要以鼠标事件为准比较合理
      // 主要考虑水平方向上上的错误
      if (Math.abs(y - y1) <= 50) {
        x = x1;
        y = y1;
      }
    }

    let btn = document.getElementById(this.button_ele_id);
    if (btn) {
      // 显示翻译结果, 位置就在原来按钮位置即可
      x = btn.style.left;
      y = btn.style.top;
    }

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
  //console.log(event);
  translator.run(event);
});

