"use strict";

const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game-screen");
const text = document.getElementById("dialogue-text");
const speaker = document.getElementById("speaker");
const choices = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const story = {
  opening: { speaker: "ラヴィア", text: "あ、まだ残ってたんだ。……ねえ、今日は一緒に帰らない？", next: "invitation" },
  invitation: { speaker: "ラヴィア", text: "駅前に新しいクレープ屋さんができたんだって。きみと行けたら、うれしいな。", choices: [
    { text: "もちろん！ ラヴィアと行きたい。", next: "happy" },
    { text: "ふたりで？ ちょっと緊張するな。", next: "shy" }
  ] },
  happy: { speaker: "ラヴィア", text: "ほんと？ ……えへへ。そんなふうに言ってもらえると、誘ってよかった。", expression: "^ ‿ ^", next: "promise" },
  shy: { speaker: "ラヴィア", text: "……実は、わたしも。きみを誘うだけで、こんなにドキドキするなんて。", expression: "• ⌣ •", next: "promise" },
  promise: { speaker: "ラヴィア", text: "じゃあ、行こっか。……明日も、こうして一緒に帰れたらいいな。", choices: [
    { text: "明日も、その先も一緒に帰ろう。", next: "sweetEnd" },
    { text: "まずは今日を、思いっきり楽しもう！", next: "gentleEnd" }
  ] },
  sweetEnd: { speaker: "ラヴィア", text: "約束だよ？ ……きみとの明日が、今から楽しみ。♡", expression: "^ ‿ ^", next: "sweetEpilogue" },
  gentleEnd: { speaker: "ラヴィア", text: "うん！ 今日は、ふたりのクレープ記念日だね。……なんて。えへへ。", expression: "^ ‿ ^", next: "gentleEpilogue" },
  sweetEpilogue: { speaker: "ENDING 01 / 明日も、きみと", text: "夕焼けの帰り道。少しだけ近づいたふたりの距離。このドキドキは、きっと恋のはじまり。", end: true },
  gentleEpilogue: { speaker: "ENDING 02 / 甘い寄り道", text: "並んで歩く、いつもとは違う帰り道。甘い香りと笑顔に包まれて、ふたりの物語は続いていく。", end: true }
};

let step = 0;
function showScene(id) {
  const scene = story[id];
  step += 1;
  speaker.textContent = scene.speaker;
  text.textContent = scene.text;
  document.getElementById("progress").textContent = scene.end ? "FIN ♡" : `SCENE ${String(step).padStart(2, "0")}`;
  choices.replaceChildren();
  nextButton.hidden = !scene.next;
  restartButton.hidden = !scene.end;
  nextButton.onclick = scene.next ? () => showScene(scene.next) : null;
  for (const choice of scene.choices || []) {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.addEventListener("click", () => showScene(choice.next));
    choices.append(button);
  }
  const target = choices.firstElementChild || (scene.end ? restartButton : nextButton);
  target.focus({ preventScroll: true });
}

function startGame() {
  step = 0;
  titleScreen.hidden = true;
  gameScreen.hidden = false;
  showScene("opening");
}
document.getElementById("start-button").addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
document.getElementById("title-button").addEventListener("click", () => {
  gameScreen.hidden = true;
  titleScreen.hidden = false;
  document.getElementById("start-button").focus({ preventScroll: true });
});
