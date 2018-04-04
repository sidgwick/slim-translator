/**
 * A slim translator browser extension use google translate api
 */

const gt = require('./google-translate-api');

var translator = {
  tooltip_ele_id: "__slim_translate_button",
  event: null,
  text: null,

  // 标记是不是已经
  // 1. 获取到了选定内容
  // 2. 展示 tooltip 或者翻译内容
  // 如果满足以上条件, 程序不应该再响应 mouseup 动作
  in_translate: false,

  run: function (event) {
    let selection = document.getSelection();

    this.event = event;
    this.text = selection.toString();
    if (!this.text) {
      document.getElementById(this.tooltip_ele_id).remove();
      this.in_translate = false;
      return;
    }

    if (this.in_translate) {
      return;
    }

    this.display_tooltip();
  },

  tooltip_position: function () {
    let x = this.event.clientX + 10;
    let y = this.event.clientY + 5;

    return {x, y};
  },

  display_tooltip: function () {
    this.in_translate = true;
    let pos = this.tooltip_position();

    // create an empty element node
    let button = document.createElement("button");
    button.id = this.tooltip_ele_id;
    //button.textContent = "ST";
    button.style.top = pos.y + "px";
    button.style.left = pos.x + "px";

    button.addEventListener("click", () => this.translate());

    let body = document.getElementsByTagName("body")[0];
    let old_button = document.getElementById(this.tooltip_ele_id);
    if (old_button) {
      body.replaceChild(button, old_button);
    } else {
      body.appendChild(button);
    }
  },

  translate: function () {
    gt(this.text, {
      to: 'zh-CN'
    }).then(res => {
      console.log("google is alive");
      console.log(res);
    }).catch(err => {
      console.log("google is dead");
      console.error(err);
    });
  },
};

window.addEventListener("mouseup", function (event) {
  translator.run(event);
});

