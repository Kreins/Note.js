"use strict";

const noteGen = new Note();
const toast = noteGen.makeToast("hello");
const target = $("#target");

$(".topCenter").click(() => toast.display("top-center", "body"));
$(".topRight").click(() => toast.display("top-right"));
$(".midRight").click(() => toast.display("mid-right"));
$(".botRight").click(() => toast.display("bot-right"));
$(".botCenter").click(() => toast.display("bot-center"));
$(".botLeft").click(() => toast.display("bot-left"));
$(".midLeft").click(() => toast.display("mid-left"));
$(".topLeft").click(() => toast.display("top-left"));

// toast.display("top-center", target, { duration: 0 });
$(".elem-topCenter").click(() =>
  toast.display("top-center", target, { duration: 0 })
);
$(".elem-midRight").click(() => toast.display("mid-right", target));
$(".elem-botCenter").click(() => toast.display("bot-center", target));
$(".elem-midLeft").click(() => toast.display("mid-left", target));

const note1 = noteGen.createNote().addText("What is your favorite color?");
$(".addText").click(() => note1.display("bot-center"));

const note2 = noteGen
  .createNote()
  .addText("What is your favorite color?")
  .addButtons(["red", "blue", "green"]);
$(".addButtons").click(() =>
  note2.display("bot-center", "body", { duration: 0 })
);

let result = note2.waitForResponse();
result.then((res) => console.log(res));

const note3 = noteGen
  .createNote()
  .addText("What is your favorite color?")
  .addButtons(["red", "blue", "green"])
  .removeButtons(["red", "blue"]);
$(".removeButtons").click(() => note3.display("bot-center"), "body", {
  duration: 0,
});

const note4 = noteGen
  .createNote()
  .addText("What is your favorite color?")
  .addButtons(["red", "blue", "green"])
  .removeButtons(["red", "blue"])
  .removeText(0);
$(".removeText").click(() => note4.display("bot-center"), "body", {
  duration: 0,
});

// const note5 = noteGen
//   .createNote()
//   .addText("Test Test Test")
//   .addButtons(["yes", "no"]);
// note5.display("top-center", "body", { duration: 0 });
