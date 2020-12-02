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
$(".elem-topCenter").click(() => toast.display("top-center", target));
$(".elem-midRight").click(() => toast.display("mid-right", target));
$(".elem-botCenter").click(() => toast.display("bot-center", target));
$(".elem-midLeft").click(() => toast.display("mid-left", target));

const note1 = noteGen.createNote();
note1.addText("What is your favorite color?");
$(".addText").click(() => note1.display("bot-center"));

const note2 = noteGen.createNote();
note2.addText("What is your favorite color?");
note2.addButtons(3, ["red", "blue", "green"]);
$(".addButtons").click(() => note2.display("bot-center"));

const note3 = noteGen.createNote();
note3.addText("What is your favorite color?");
note3.addButtons(3, ["red", "blue", "green"]);
note3.removeButtons(["red", "blue"]);
$(".removeButtons").click(() => note3.display("bot-center"));

const note4 = noteGen.createNote();
note4.addText("What is your favorite color?");
note4.addButtons(3, ["red", "blue", "green"]);
note4.removeButtons(["red", "blue"]);
note4.removeText(0);
$(".removeText").click(() => note4.display("bot-center"));
