const characters = [
  { name: "Bangchan",     img: "assets/chan photocard.jpeg" },
  { name: "Han",  img: "assets/hannie photocard.jpg" },
  { name: "Leeknow",  img: "assets/lino photocard.jpg" },
  { name: "Felix",  img: "assets/lix photocard.jpeg" },
  { name: "Changbin",     img: "assets/bin photocard.jpg" },
  { name: "Seungmin",  img: "assets/sm photocard.jpg" },
  { name: "Hyunjin",  img: "assets/jin photocard.jpeg" },
  { name: "I.N",  img: "assets/in photocard.jpeg" }
  
];

const state = { round: characters.slice(), index: 0, roundNumber: 1, champion: null, nextRound: [] };

const ui = {
  game:   document.getElementById("game"),
  c1Img:  document.getElementById("char1-img"),
  c1Name: document.getElementById("char1-name"),
  c2Img:  document.getElementById("char2-img"),
  c2Name: document.getElementById("char2-name"),
  vote1:  document.getElementById("vote1"),
  vote2:  document.getElementById("vote2"),
  cards:  document.querySelectorAll(".card")
};

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;   
  if (text) n.textContent = text; 
  return n;
};

ui.status = el("p", "subtitle status-box", "round 1");
ui.game.before(ui.status); 

const votes = [ui.vote1, ui.vote2];
const setStatus = t => ui.status.textContent = t;
const setButton = on => votes.forEach(b => b.disabled = !on); // Fixed: vote -> votes
const clearStyle = () => ui.cards.forEach(c => c.classList.remove("win", "dim"));
const highlightWin = win => ui.cards.forEach((c, i) => {
  c.classList.toggle("win", i === win);
  c.classList.toggle("dim", i !== win); // Fixed: changed === to !== so the loser dims
});


function getPair() {
  const i = state.index * 2;
  return [state.round[i], state.round[i + 1]];
}

function showPair() {
  const [a, b] = getPair();
  ui.c1Img.src = a.img; ui.c1Name.textContent = a.name;
  ui.c2Img.src = b.img; ui.c2Name.textContent = b.name;
  setButton(true); // Fixed: setButtons -> setButton
  clearStyle(); // Fixed: clearstyles -> clearStyle
  setStatus(state.round.length === 7 ? "Final Round" : `Round ${state.roundNumber}`); // Fixed: single quotes -> backticks
}

function vote(side) { // Fixed: added side parameter to fix reference error
  setButton(false);
  highlightWin(side);
  
  const [a, b] = getPair();
  const winner = side === 0 ? a : b;
  state.nextRound.push(winner);
  
  setTimeout(() => {
    state.index++;
    state.roundNumber++; // Add this line here to count every match
    if (state.index * 2 < state.round.length) {
      showPair();
    } else {
      goNextRound();
    }
  }, 1000);
}

function goNextRound() {
  if (state.nextRound.length === 1) {
    state.champion = state.nextRound[0]; // Fixed: extract the object from the array
    setStatus(`Your bias is ${state.champion.name}!`);
    setButton(false);
    return;
  }
  
  state.round = state.nextRound.slice();
  state.nextRound = [];
  state.index = 0;
  // state.roundNumber++; // Remove or comment out this line
  showPair();
}
// Event Listeners
ui.vote1.addEventListener("click", () => vote(0)); // Fixed: explicitly passing side 0
ui.vote2.addEventListener("click", () => vote(1)); // Fixed: explicitly passing side 1

// Start the game
showPair();
