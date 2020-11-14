"use strict";

function NoteGen() {
  this.notes = [];
}

NoteGen.prototype.makeToast = function (text) {
  const newNote = new Note(
    $("<div><div/>")
      .addClass("default-toast")
      .append(document.createTextNode(text))
      .hide()
  );
  this.notes.push(newNote);
  return newNote;
};

function Note(note) {
  this.note = note;
}

Note.prototype.display = function (position = "mid-left", element = "") {
  const note = this.note;
  if (element === "") {
    switch (position) {
      case "top-left":
        note.addClass("top-left");
        break;
      case "top-right":
        note.addClass("top-right");
        break;
      case "top-center":
        note.addClass("top-center");
        break;
      case "bot-left":
        note.addClass("bot-left");
        break;
      case "bot-right":
        note.addClass("bot-right");
        break;
      case "bot-center":
        note.addClass("bot-center");
        break;
      case "mid-left":
        note.addClass("mid-left");
    }
  } else {
    //attach to target element
  }
  $("body").append(note);
  note.fadeIn();
  //   setTimeout(function () {
  //     note.fadeOut();
  //   }, 3000);
};
