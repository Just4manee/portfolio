const place = [
    "London",
    "Hong Kong",
    "Singapore",
    "Tokyo"
];

const description = [
    "London, the vibrant capital of England, is a bustling metropolis known for its rich history and diverse culture.",
    "Hong Kong, a bustling metropolis on the southern coast of China, is known for its striking skyline and vibrant urban life.",
    "Singapore, a vibrant city-state in Southeast Asia, is renowned for its stunning skyline and multicultural atmosphere.",
    "Tokyo, the bustling capital of Japan, is a vibrant metropolis that seamlessly blends tradition and innovation."
];

const icons = [
    "London.png",
    "Hong_Kong.png",
    "Singapore.png",
    "Tokyo.png"
];

const place_image = [
    "London_bg.png",
    "Hong_kong_bg.png",
    "Singapore_bg.png",
    "Tokyo_bg.png"
];

let destNum = 0;

const introCard = document.getElementById("intro-card")
const destCard = document.getElementById("destination-card")
const returnButton = document.getElementById("return-button")
const nextButton = document.getElementById("next-button")


introCard.style.opacity = "1";
destCard.style.opacity = "0";

function lockButton(btn)   { btn.classList.add("btn--disable"); btn.setAttribute("disabled", "true"); }
function unlockButton(btn)   { btn.classList.remove("btn--disable"); btn.removeAttribute("disabled"); }

function getRandomNumberExcluding(currentIndex, length) {
    if (length <= 1) return 0;
    let n = Math.floor(Math.random() * length);
    return n === currentIndex ? (n + 1) % length : n; 
}

function renderDestination(idx) {
    destCard.innerHTML = `
      <div id="destination-header">
        <h1>You got: ${place[idx]}</h1>
        <img id="header_img" src="assets/${icons[idx]}">
      </div>
      <div id="main-pic">
        <img id="pic" src="assets/${place_image[idx]}">
      </div>
      <p id="description-text">
        ${description[idx]}
      </p>
    `;
  }

  function fadeSwap(el, renderFn) {
    const prev = el.style.transition;
    el.style.transition = "none";
    el.style.opacity = "0";
    void el.offsetHeight;
    el.style.transition = prev || "opacity 0.5s ease-in-out";
    renderFn();
    requestAnimationFrame(() => {
        el.style.opacity = "1";
    });
  }

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'n') nextButton.click();
    if (e.key.toLowerCase() === 'r') returnButton.click();
});

nextButton.addEventListener('click', () => {
    if (nextButton.hasAttribute("disabled")) return;
    lockButton(nextButton);

    destNum = getRandomNumberExcluding(destNum, place.length);
    
    fadeSwap(destCard, () => {
        renderDestination(destNum);
    });
    
    renderDestination(destNum);

    unlockButton(nextButton);
});



introCard.addEventListener('click', () => {
    destCard.innerHTML = `
        <div id="destination-header">
            <h1>You got: ${place[destNum]}!</h1>
            <img id="header_img" src="assets/${icons[destNum]}">
        </div>
        <div id = "main-pic">
            <img id = "pic" src = "assets/${place_image[destNum]}">
        </div>
        <p id="description-text">
        ${description[destNum]}
        </p>`

    destCard.style.opacity = "1"
    destCard.style.display = "flex"
    introCard.style.display = "none"
    introCard.style.opacity = "0"

    fadeSwap(destCard, () => {
        renderDestination(destNum);
    });
})

returnButton.addEventListener('click', () => {
    destCard.style.opacity = "0"
    destCard.style.display = "none"
    introCard.style.display = "flex"
    introCard.style.opacity = "1"
})

console.log("data found");


