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

function Note(note) {
  this.note = note;
  this.position = "";
}

Note.prototype.display = function (position = "mid-left", element = "") {
  const note = this.note;
  if (element === "") {
    switch (position) {
      case "top-left":
        note.addClass("top-left");
        this.position = "top-left";
        break;
      case "top-right":
        note.addClass("top-right");
        this.position = "top-right";
        break;
      case "top-center":
        note.addClass("top-center");
        this.position = "top-center";
        break;
      case "bot-left":
        note.addClass("bot-left");
        this.position = "bot-left";
        break;
      case "bot-right":
        note.addClass("bot-right");
        this.position = "bot-right";
        break;
      case "bot-center":
        note.addClass("bot-center");
        this.position = "bot-center";
        break;
      case "mid-left":
        note.addClass("mid-left");
        this.position = "mid-left";
        break;
      case "mid-right":
        note.addClass("mid-right");
        this.position = "mid-right";
        break;
    }
    $("body").append(note);
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
    element.after(note);
    note.addClass("attached");

    const noteWidth = note.outerWidth();
    const noteHeight = note.outerHeight();

    switch (position) {
      case "top-left":
        // TODO
        break;
      case "top-right":
        // TODO
        break;
      case "top-center":
        note
          .css("left", (elementWidth - noteWidth) / 2)
          .css("top", -noteHeight - 10); // 10px between target and note
        this.position = "elem-top-center";
        break;
      case "bot-left":
        // TODO
        break;
      case "bot-right":
        // TODO
        break;
      case "bot-center":
        note
          .css("top", elementHeight + 10)
          .css("left", (elementWidth - noteWidth) / 2); // 10px between target and note
        this.position = "elem-bot-center";
        break;
      case "mid-left":
        note
          .css("top", (elementHeight - noteHeight) / 2)
          .css("left", -noteWidth - 10); // 10px between target and note
        this.position = "elem-mid-left";
        break;
      case "mid-right":
        note
          .css("top", (elementHeight - noteHeight) / 2)
          .css("left", elementWidth + 10); // 10px between target and note
        this.position = "elem-mid-right";
        break;
    }
  }
  // fade in and fade out
  note.fadeIn(function () {
    note.delay(3000).fadeOut(function () {
      if (element === "") {
        note.removeClass(note.position);
        this.position = "";
      } else {
        note.removeClass("attached");
        this.position = "";
      }
    });
  });
};
