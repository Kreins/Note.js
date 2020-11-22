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
