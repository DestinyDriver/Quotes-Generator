let qt = "Quote";
let at = "Author";

const loader = document.querySelector(".loader");
const hero = document.querySelector(".hero");

function startloading() {
  loader.hidden = false; // Show loader
  hero.style.display = "none"; // Hide hero section
}

function stoploading() {
  setTimeout(() => {
    loader.hidden = true; // Hide loader
    hero.style.display = "flex"; // Show hero section
  }, 500); // 1000ms = 1 second delay
}

async function getquote() {
  const api = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    startloading();
    const response = await fetch(api);
    const quotes = await response.json();

    const randomIndex = Math.floor(Math.random() * quotes.length);
    qt = quotes[randomIndex]["text"]; // Change "q" to "text"
    at = quotes[randomIndex]["author"]; // Change "a" to "author"

    const quotetxt = document.querySelector(".quote-text");
    quotetxt.innerHTML = qt;
    const authtxt = document.querySelector(".quote-author");

    authtxt.innerHTML = at;

    stoploading();

    if (qt.length > 120) {
      quotetxt.style.fontSize = "2rem";
      authtxt.style.fontSize = "1rem";
      document.querySelector(".hero").style.height = "60vh";
    } else {
      quotetxt.style.fontSize = "2.7rem";
      authtxt.style.fontSize = "1.7rem";
      document.querySelector(".hero").style.height = "50vh";
    }
  } catch (error) {
    console.log("API is not fetched.Or error in try block");

    startloading();
  }
}

function tweet() {
  const url = `https://twitter.com/intent/tweet?text=${qt}   ~${at}  `;
  window.open(url, "_blank");
}

getquote();
