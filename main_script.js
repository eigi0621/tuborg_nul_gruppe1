const urlParams = new URLSearchParams(window.location.search);
const kategori = urlParams.get("kategori");
let endpoint = "https://spreadsheets.google.com/feeds/list/1pA_1-0vsMhF4a11N38gCRR7T7gee3YCI09RojMyq1QY/od6/public/values?alt=json";
let toej = [];
let filter = kategori;

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");

  //start cursor script
  init_pointer({});

  //opret tomt array til tøjet, derefter hent JSON
  let toej = []
  hentJSON();
}

//hent JSON, når den er loadet - derefter kald visToej
async function hentJSON() {
  console.log("hent json");

  const response = await fetch(endpoint);
  toej = await response.json();
  visToej();
}

//viser toej-elementerne
function visToej() {
  console.log("visToej");
  let dataFill = document.querySelector("#data_fill");
  let template = document.querySelector("#template");

  //fjern content i dataFill-containeren
  dataFill.textContent = "";

  //for hvert toej-element
  toej.feed.entry.forEach(element => {
    //vis tøj element, hvis tøjets kategori og den valgte kategori er ens ELLER kategorien er 'alle'

    let klon = template.cloneNode(true).content; //opret klon
    klon.querySelector("h2").textContent = `${element.gsx$spg.$t}`;
    klon.querySelector(".svarmulighed1 p").textContent = `${element.gsx$valg1.$t}`;
    klon.querySelector(".svarmulighed2 p").textContent = `${element.gsx$valg2.$t}`;
    klon.querySelector(".svarmulighed3 p").textContent = `${element.gsx$valg3.$t}`;
    klon.querySelector(".svarmulighed4 p").textContent = `${element.gsx$valg4.$t}`;
    klon.querySelector(".svarmulighed5 p").textContent = `${element.gsx$valg5.$t}`;
    klon.querySelector(".spg_nr").textContent = `${element.gsx$spgnr.$t} 10`;

    dataFill.appendChild(klon); //indsæt klonen i databeholderen med appendChild

    document.querySelector(".inner_question_wrap").addEventListener("click", nextQuestion);
  });
}



function nextQuestion() {
  console.log("nextQuestion");

  document.querySelector(".inner_overflow").classList.remove("question_in");
  document.querySelector(".inner_question_wrap").classList.remove("question_in2");
  document.querySelector(".spg_nr_wrap").classList.remove("question_in3");
  document.querySelector(".spg_nr").classList.remove("question_in4");

  document.querySelector(".inner_overflow").classList.add("question_away");
  document.querySelector(".inner_question_wrap").classList.add("question_away2");
  document.querySelector(".spg_nr_wrap").classList.add("question_away3");
  document.querySelector(".spg_nr").classList.add("question_away4");

  setTimeout(function () {
    document.querySelector(".inner_overflow").classList.remove("question_away");
    document.querySelector(".inner_question_wrap").classList.remove("question_away2");
    document.querySelector(".spg_nr_wrap").classList.remove("question_away3");
    document.querySelector(".spg_nr").classList.remove("question_away4");

    document.querySelector(".inner_overflow").classList.add("question_in");
    document.querySelector(".inner_question_wrap").classList.add("question_in2");
    document.querySelector(".spg_nr_wrap").classList.add("question_in3");
    document.querySelector(".spg_nr").classList.add("question_in4");
  }, 1000)
}

function previousQuestion() {

}
