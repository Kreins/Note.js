"use strict";

const noteGen = new Note();
const toast = noteGen.makeToast("hello");
const target = $("#target");

$(".topCenter").click(() => toast.display("top-center"));
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

const note1 = noteGen.createNote().addText("Change header color?");
$(".addText").click(() => note1.display("bot-center"));

const note2 = noteGen
  .createNote()
  .addText("Change header color?")
  .addButtons(["orange", "blue", "pink"]);
$(".addButtons").click(() =>
  note2.display("bot-center", "body", { duration: 0 })
);

let result = note2.waitForResponse();
result.then((res) => {
  console.log("New color:", res);
  if (res === "blue") {
    res = "lightblue";
  }
  $(".header")
    .css("background-color", res)
    .css("transition", "background-color 1s ease");
});

const note3 = noteGen
  .createNote()
  .addText("Change header color?")
  .addButtons(["orange", "blue", "pink"])
  .removeButtons(["orange", "blue"]);
$(".removeButtons").click(() =>
  note3.display("bot-center", "body", {
    duration: 0,
  })
);

result = note3.waitForResponse();
result.then((res) => {
  $(".header")
    .css("background-color", res)
    .css("transition", "background-color 1s ease");
});

const note4 = noteGen
  .createNote()
  .addText("Change header color?")
  .addButtons(["orange", "blue", "pink"])
  .removeButtons(["orange", "blue"])
  .replaceText(0, "There is the only one option!");
$(".replaceText").click(() =>
  note4.display("bot-center", "body", {
    duration: 0,
  })
);

// const note5 = noteGen
//   .createNote()
//   .addText("Test Test Test")
//   .addButtons(["yes", "no"]);
// note5.display("top-center", "body", { duration: 0 });
