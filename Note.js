"use strict";

let notes = [];
let notesOnDisplay = [];
let defaultOptions = {
  duration: 3000,
};
// function NoteGen() {
//   this.notes = [];
//   this.notesOnDisplay = [];
// }

// NoteGen.makeNote = function (note) {
//   const newNote = new Note(note);
//   this.notes.push(newNote);
//   return newNote;
// };

let generateID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};

function Note(content) {
  this.content = content;
  this.position = "";
  this._id = generateID();
}

/* -------- pre-made templates -------*/
Note.prototype.makeToast = function (text) {
  const newNote = new Note(
    $("<div>")
      .addClass("default-toast")
      .append(document.createTextNode(text))
      .hide()
  );
  notes.push(newNote);
  return newNote;
};
/* -----------------------------------*/

Note.prototype.makeNote = function (content) {
  const newNote = new Note(content);
  notes.push(newNote);
  return newNote;
};

Note.prototype.display = function (
  position = "mid-left",
  element = "body",
  options = defaultOptions
) {
  let note = this;
  let content = this.content;
  // find and clone content, so that we can display multiple copies of the
  // same note at the same time
  if (notes.some((target) => target._id === note._id)) {
    note = new Note(content.clone());
    content = note.content;
  } else {
    alert("this note does not exist or is not valid");
  }

  if (element === "body") {
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
    // zero duration => doesn't fade out
    if (options["duration"] !== 0) {
      content.delay(options.duration).fadeOut(function () {
        if (element !== "") element.unwrap(); // TODO: check for parent class is wrapper instead?
        notesOnDisplay = notesOnDisplay.filter(
          (target) => target._id !== note._id
        );
        // avoid contaminating users' HTML
        content.remove();
      });
    }
  });
};
