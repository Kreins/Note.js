"use strict";

let styles = {
  base: {
    width: "200px",
    "font-weight": "bold",
    padding: "8px 15px 8px 14px",
    "text-shadow": "0 1px 0 rgba(255, 255, 255, 0.5)",
    "background-color": "#fcf8e3",
    border: "1px solid #fbeed5",
    "border-radius": "4px",
    "white-space": "nowrap",
    "padding-left": "25px",
    "background-repeat": "no-repeat",
    "background-position": "3px 7px",
  },
};

function Note() {
  this.notes = [];
}

Note.prototype.makeToast = function (text) {
  let $toast = $("<div><div/>")
    .addClass("")
    .append(document.createTextNode(text))
    .css(styles["base"])
    .hide();
  $("body").append($toast);
  $toast.fadeIn();
  setTimeout(function () {
    $toast.fadeOut();
  }, 3000);
};
