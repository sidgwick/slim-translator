/**
 * A slim translator browser extension use google translate api
 */

const gt = require('./google-translate-api');

var translator = {
  tooltip_ele_id: "__slim_translate_button",
  result_ele_id: "__slim_translate_result_area",
  event: null,
  text: null,

  // 标记是不是已经
  // 1. 获取到了选定内容
  // 2. 展示 tooltip 或者翻译内容
  // 如果满足以上条件, 程序不应该再响应 mouseup 动作
  show_translate_btn: false,
  show_translate_result: false,

  run: function (event) {
    let selection = document.getSelection();

    this.event = event;
    this.text = selection.toString();
    if (!this.text) {
      this.remove_tooltip();
      this.remove_result();
      this.show_translate_btn = false;
      this.show_translate_result = false;
      return;
    }

    if (this.show_translate_btn || this.show_translate_result) {
      return;
    }

    this.display_tooltip();
  },

  tooltip_position: function () {
    let x = this.event.clientX + 10;
    let y = this.event.clientY + 5;

    return {x, y};
  },

  remove_tooltip: function () {
    document.getElementById(this.tooltip_ele_id).remove();
  },

  display_tooltip: function () {
    this.show_translate_btn = true;
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
      this.display_translate_result(res);
    }).catch(err => {
      console.log("google is dead");
      console.error(err);
    });
  },

  remove_result: function () {
    this.show_translate_result = false;
    document.getElementById(this.result_ele_id).remove();
  },

  display_translate_result: function (res) {
    this.remove_tooltip();
    this.show_translate_result = true;
    let pos = this.tooltip_position();

    // create an empty element node
    let display_div = document.createElement("div");
    display_div.id = this.result_ele_id;
    display_div.style.top = pos.y + "px";
    display_div.style.left = pos.x + "px";
    // TODO: display more contents
    display_div.innerText = function (res) {
      let text = [];
      res.forEach((item) => {
        if (item.trans) {
          text.push(item.trans);
        }
      });
      result = text.join("\n");
      console.log(result);
      return result;
    }(res.sentences);

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(display_div);
  },
};

window.addEventListener("mouseup", (event) => {
  translator.run(event);
});

