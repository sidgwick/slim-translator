window.addEventListener("mouseup", function () {
  var text = document.getSelection().toString();
  if (!text) {
    return;
  }

  console.log(text);
});

