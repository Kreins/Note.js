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
        note.position = "top-left";
        break;
      case "top-right":
        note.addClass("top-right");
        note.position = "top-right";
        break;
      case "top-center":
        note.addClass("top-center");
        note.position = "top-center";
        break;
      case "bot-left":
        note.addClass("bot-left");
        note.position = "bot-left";
        break;
      case "bot-right":
        note.addClass("bot-right");
        note.position = "bot-right";
        break;
      case "bot-center":
        note.addClass("bot-center");
        note.position = "bot-center";
        break;
      case "mid-left":
        note.addClass("mid-left");
        note.position = "mid-left";
        break;
      case "mid-right":
        note.addClass("mid-right");
        note.position = "mid-right";
        break;
    }
    $("body").append(note);
  } else {
    /* attach to target element */

    // first wrap target into a div and append
    // the note as its child
    const padding_top = parseInt(element.css("padding-top"));
    const padding_bottom = parseInt(element.css("padding-bottom"));
    const border_top = parseInt(element.css("border-top-width"));
    const border_bottom = parseInt(element.css("border-bottom-width"));

    element
      .wrap("<div class='wrapper'></div>")
      .parent()
      .css("margin-top", padding_top + border_top)
      .css("margin-bottom", padding_bottom + border_bottom);

    element.after(note);
    note.addClass("attached");
    // note.position = "mid-right";
  }
  // fade in and fade out
  note.fadeIn(function () {
    // note.delay(3000).fadeOut(function () {
    //   note.removeClass(note.position);
    //   note.position = "";
    // });
  });
};
