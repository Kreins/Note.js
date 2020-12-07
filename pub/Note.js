"use strict";

let notes = [];
let defaultOptions = {
  duration: 3000,
};

let _generateID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};

function Note(content) {
  this._id = _generateID();
  this.content = content;
  this.position = "";
  this.texts = [];
  this.buttons = [];
  this.forms = [];
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

Note.prototype.makePoll = function (title, buttonText) {
  const newNote = new Note($("<div class='default-note-wrapper'></div>"));
  newNote.addText(title);
  newNote.addButtons(buttonText);
  newNote.content.hide();
  notes.push(newNote);
  return newNote;
};

/* -------- initialize empty note ---------*/
Note.prototype.createNote = function (content) {
  const newNote = new Note(
    $("<div class='default-note-wrapper'></div>").append(content)
  );
  notes.push(newNote);
  return newNote;
};

/* ============= text features ============= */
Note.prototype.addText = function (text) {
  const textNode = $("<div class='text-wrapper'></div>").append(
    document.createTextNode(text)
  );
  // update content and texts array
  this.content.append(textNode);
  this.texts.push(textNode);
  return this;
};

Note.prototype.replaceText = function (index, newText) {
  const textNode = this.texts[index];
  const newNode = $("<div class='text-wrapper'></div>").append(
    document.createTextNode(newText)
  );
  // update content and texts array
  textNode.replaceWith(newNode);
  this.texts[index] = newNode;
  return this;
};

Note.prototype.removeText = function (index) {
  //index is the nth added text node
  const textNode = this.texts[index];
  textNode.remove();
  this.texts.splice(index, 1);
  return this;
};

/* ============ button features ============== */
const _handleClick = function (button) {
  console.log(button.innerText);
  const content = $(button).parent().parent();
  content.fadeOut(function () {
    if (!content.parent() === document.body) {
      content.parent().remove();
    }
    content.remove();
  });
  return button.innerText;
};

const _makeButton = function (buttonText) {
  const newButton = $("<button class='default-button'></button>")
    .wrap("<div class='button-wrapper'></div>")
    .append(document.createTextNode(buttonText));
  newButton.attr("onClick", "_handleClick(this);");
  return newButton.parent();
};

Note.prototype.addButtons = function (buttonText) {
  for (let i = 0; i < buttonText.length; i++) {
    const newButton = _makeButton(buttonText[i]);
    // update content and buttons array
    this.content.append(newButton);
    this.buttons.push(newButton);
  }
  return this;
};

Note.prototype.replaceButton = function (index, newText) {
  const buttonNode = this.buttons[index];
  const newButtonNode = _makeButton([newText]);

  buttonNode.replaceWith(newButtonNode);
  this.buttons[index] = newButtonNode;

  return this;
};

Note.prototype.removeButtons = function (buttonText) {
  // if there's multiple buttons with the same text,
  // remove the first one
  buttonText.forEach((text) => {
    const targets = this.buttons.filter((button) => button.text() === text);
    // update content and buttons array
    targets[0].remove();
    this.buttons.splice(this.buttons.indexOf(targets[0]), 1);
  });
  return this;
};

/* =========== display note features ============ */
const _setGlobalPosition = function (note, position) {
  switch (position) {
    case "top-left":
      note.content.addClass("top-left");
      note.position = "top-left";
      break;
    case "top-right":
      note.content.addClass("top-right");
      note.position = "top-right";
      break;
    case "top-center":
      note.content.addClass("top-center");
      note.position = "top-center";
      break;
    case "bot-left":
      note.content.addClass("bot-left");
      note.position = "bot-left";
      break;
    case "bot-right":
      note.content.addClass("bot-right");
      note.position = "bot-right";
      break;
    case "bot-center":
      note.content.addClass("bot-center");
      note.position = "bot-center";
      break;
    case "mid-left":
      note.content.addClass("mid-left");
      note.position = "mid-left";
      break;
    case "mid-right":
      note.content.addClass("mid-right");
      note.position = "mid-right";
      break;
  }
};

const _setAttachedPosition = function (note, target, position) {
  note.content.addClass("attached");

  const targetWidth = target.outerWidth();
  const targetHeight = target.outerHeight();
  const contentWidth = note.content.outerWidth();
  const contentHeight = note.content.outerHeight();

  switch (position) {
    case "top-center":
      note.content
        .css("left", (targetWidth - contentWidth) / 2)
        .css("top", -contentHeight - 10); // 10px between target and content
      note.position = "elem-top-center";
      break;
    case "bot-center":
      note.content
        .css("top", targetHeight + 10)
        .css("left", (targetWidth - contentWidth) / 2); // 10px between target and content
      note.position = "elem-bot-center";
      break;
    case "mid-left":
      note.content
        .css("top", (targetHeight - contentHeight) / 2)
        .css("left", -contentWidth - 10); // 10px between target and content
      note.position = "elem-mid-left";
      break;
    case "mid-right":
      note.content
        .css("top", (targetHeight - contentHeight) / 2)
        .css("left", targetWidth + 10); // 10px between target and content
      note.position = "elem-mid-right";
      break;
  }
};
Note.prototype.display = function (
  position = "mid-left",
  target = "body",
  options = defaultOptions
) {
  let note = this;
  let content = this.content;
  // find and clone content, so that we can display multiple copies of the
  // same note at the same time
  if (notes.some((element) => element._id === note._id)) {
    //TODO: push to notes?
    note = new Note(content.clone());
    content = note.content;
  } else {
    alert("this note does not exist or is not valid");
  }

  content.hide();

  /* set positions and add to DOM */
  if (target === "body") {
    // attach to body
    _setGlobalPosition(note, position);
    $("body").append(content);
  } else {
    // attach to target element
    /* TODO: if target element has a border, then its padding should be taken into account when placing the note*/
    // const padding_top = parseInt(target.css("padding-top"));
    // const padding_bottom = parseInt(target.css("padding-bottom"));
    // const border_top = parseInt(target.css("border-top-width"));
    // const border_bottom = parseInt(target.css("border-bottom-width"));
    const targetWrapper = $("<div class='target-wrapper'></div>")
      .css("width", target.outerWidth() + 1)
      .css("height", target.outerHeight() + 1);
    target.before(targetWrapper);
    target.prev().append(content);
    _setAttachedPosition(note, target, position);
  }

  // fade in and fade out
  content.fadeIn(function () {
    // zero duration => doesn't fade out
    if (options["duration"] !== 0) {
      content.delay(options.duration).fadeOut(function () {
        // avoid contaminating users' HTML
        if (!content.parent() === document.body) {
          content.parent().remove();
        }
        content.remove();
      });
    }
  });
};
