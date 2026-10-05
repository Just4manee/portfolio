const characters = [
  { name: "Bangchan", img: "assets/chan photocard.jpeg" },
  { name: "Han", img: "assets/hannie photocard.jpg" },
  { name: "Leeknow", img: "assets/lino photocard.jpg" },
  { name: "Felix", img: "assets/lix photocard.jpeg" },
  { name: "Changbin", img: "assets/bin photocard.jpg" },
  { name: "Seungmin", img: "assets/sm photocard.jpg" },
  { name: "Hyunjin", img: "assets/jin photocard.jpeg" },
  { name: "I.N", img: "assets/in photocard.jpeg" }
];

// Fisher-Yates Shuffle Algorithm
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Before: const state = { round: characters.slice(), ... };
// After:
const state = { round: shuffle(characters.slice()), index: 0, roundNumber: 1, champion: null, nextRound: [] };


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
const setButton = on => votes.forEach(b => b.disabled = !on); 
const clearStyle = () => ui.cards.forEach(c => c.classList.remove("win", "dim"));
const highlightWin = win => ui.cards.forEach((c, i) => {
  c.classList.toggle("win", i === win);
  c.classList.toggle("dim", i !== win); 
});

ui.replay = el("button", "button-17 hidden", "Replay");
ui.replay.style.marginTop = "2.5rem";
ui.game.after(ui.replay);

function getPair() {
  const i = state.index * 2;
  return [state.round[i], state.round[i + 1]];
}

function showPair() {
  const [a, b] = getPair();
  ui.c1Img.src = a.img; ui.c1Name.textContent = a.name;
  ui.c2Img.src = b.img; ui.c2Name.textContent = b.name;
  setButton(true); 
  clearStyle(); 
  setStatus(state.round.length === 2 ? "Final Round" : `Round ${state.roundNumber}`); // Fixed: 2 items left means final round
}

function replay() {
  Object.assign(state, {
    round: shuffle(characters.slice()),
    index: 0,
    roundNumber: 1,
    champion: null,
    nextRound: []
  });

  document.querySelectorAll(".reason-line").forEach(n => n.remove());

  votes.forEach(b => {
    b.classList.remove("hidden");
    b.disabled = false;
  });

  ui.replay.classList.add("hidden");

  clearStyle();
  showPair();
}

function announceChampion() {                                    
  setStatus(`${state.champion.name} is the Champion! 🎉`);
  votes.forEach(b => b.classList.add("hidden"));    
  const reason = prompt(`Why did you choose ${state.champion.name}?`);   
  if (reason && reason.trim()) {                                         
    const p = el("p", "subtitle reason-line", `Reason: ${reason.trim()}`);
    p.style.marginTop = "0.5rem"; ui.status.after(p);
  }
  ui.replay.classList.remove("hidden");                                                         
}

function vote(side) { 
  setButton(false);
  highlightWin(side);
  
  const [a, b] = getPair();
  const winner = side === 0 ? a : b;
  state.nextRound.push(winner);
  
  setTimeout(() => {
    state.index++;
    if (state.index * 2 < state.round.length) {
      showPair();
    } else {
      goNextRound();
    }
  }, 1000);
}

function goNextRound() {
  if (state.nextRound.length === 1) {
      state.champion = state.nextRound[0]; 
      announceChampion(); 
      return;
  }
  state.round = state.nextRound.slice();
  state.nextRound = [];
  state.index = 0;
  state.roundNumber++; // Increments round tracker properly now
  showPair();
}

// Event Listeners
ui.vote1.addEventListener("click", () => vote(0)); 
ui.vote2.addEventListener("click", () => vote(1)); 
ui.replay.addEventListener("click", replay);

// Start the game
showPair();
