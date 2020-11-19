"use strict";

function NoteGen() {
  this.notes = [];
}

NoteGen.makeNote = function (note) {
  const newNote = new Note(note);
  this.notes.push(newNote);
  return newNote;
};

// pre-made templates
NoteGen.prototype.makeToast = function (text) {
  const newNote = new Note(
    $("<div>")
      .addClass("default-toast")
      .append(document.createTextNode(text))
      .hide()
  );
  this.notes.push(newNote);
  return newNote;
};

function Note(content) {
  this.content = content;
  this.position = "";
}

Note.prototype.display = function (position = "mid-left", element = "") {
  const content = this.content;
  if (element === "") {
    switch (position) {
      case "top-left":
        content.addClass("top-left");
        this.position = "top-left";
        break;
      case "top-right":
        content.addClass("top-right");
        this.position = "top-right";
        break;
      case "top-center":
        content.addClass("top-center");
        this.position = "top-center";
        break;
      case "bot-left":
        content.addClass("bot-left");
        this.position = "bot-left";
        break;
      case "bot-right":
        content.addClass("bot-right");
        this.position = "bot-right";
        break;
      case "bot-center":
        content.addClass("bot-center");
        this.position = "bot-center";
        break;
      case "mid-left":
        content.addClass("mid-left");
        this.position = "mid-left";
        break;
      case "mid-right":
        content.addClass("mid-right");
        this.position = "mid-right";
        break;
    }
    $("body").append(content);
  } else {
    /* attach to target element */

    // first wrap target into a div and append
    // the note as its child
    const elementWidth = element.outerWidth();
    const elementHeight = element.outerHeight();

    /* TODO: if target element has a border, then its padding should be taken into account when placing the note*/
    // const padding_top = parseInt(element.css("padding-top"));
    // const padding_bottom = parseInt(element.css("padding-bottom"));
    // const border_top = parseInt(element.css("border-top-width"));
    // const border_bottom = parseInt(element.css("border-bottom-width"));
    element
      .wrap("<div class='wrapper'></div>")
      .parent()
      .css("width", elementWidth)
      .css("height", elementHeight);
    element.after(content);

    content.addClass("attached");

    const contentWidth = content.outerWidth();
    const contentHeight = content.outerHeight();

    switch (position) {
      case "top-left":
        // TODO
        break;
      case "top-right":
        // TODO
        break;
      case "top-center":
        content
          .css("left", (elementWidth - contentWidth) / 2)
          .css("top", -contentHeight - 10); // 10px between target and content
        this.position = "elem-top-center";
        break;
      case "bot-left":
        // TODO
        break;
      case "bot-right":
        // TODO
        break;
      case "bot-center":
        content
          .css("top", elementHeight + 10)
          .css("left", (elementWidth - contentWidth) / 2); // 10px between target and content
        this.position = "elem-bot-center";
        break;
      case "mid-left":
        content
          .css("top", (elementHeight - contentHeight) / 2)
          .css("left", -contentWidth - 10); // 10px between target and content
        this.position = "elem-mid-left";
        break;
      case "mid-right":
        content
          .css("top", (elementHeight - contentHeight) / 2)
          .css("left", elementWidth + 10); // 10px between target and content
        this.position = "elem-mid-right";
        break;
    }
  }
  // fade in and fade out
  content.fadeIn(function () {
    content.delay(3000).fadeOut(function () {
      if (element === "") {
        content.removeClass(position);
      } else {
        element.unwrap();
        content.removeClass("attached");
        content.css("top", "").css("left", "");
      }
    });
  });
};
