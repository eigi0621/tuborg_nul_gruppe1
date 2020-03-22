const urlParams = new URLSearchParams(window.location.search);
const kategori = urlParams.get("kategori");
let endpoint = "https://spreadsheets.google.com/feeds/list/1pA_1-0vsMhF4a11N38gCRR7T7gee3YCI09RojMyq1QY/od6/public/values?alt=json";
let toej = [];
let filter = kategori;
let point = 0;
let spg = 1;

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");

  //start cursor script
  init_pointer({});

  //opret tomt array til tøjet, derefter hent JSON
  let toej = []
  hentJSON();

  document.querySelector(".start_quiz").addEventListener("click", startQuestion);

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
    klon.querySelector(".spg_nr").textContent = `spørgsmål ${element.gsx$spgnr.$t} ud af 10`;

    klon.querySelector(".svarmulighed1").addEventListener("click", () => {
      point += 1;
    })
    klon.querySelector(".svarmulighed2").addEventListener("click", () => {
      point += 2;
    })
    klon.querySelector(".svarmulighed3").addEventListener("click", () => {
      point += 3;
    })
    klon.querySelector(".svarmulighed4").addEventListener("click", () => {
      point += 4;
    })
    klon.querySelector(".svarmulighed5").addEventListener("click", () => {
      point += 5;
    })

    klon.querySelectorAll(".svarmulighed_wrap").forEach((svarmulighed) => {
      svarmulighed.addEventListener("click", () => {
        svarmulighed.querySelector("p").classList.add("on_choice2");
        svarmulighed.querySelector(".tick_box div").classList.add("on_choice3");
        svarmulighed.querySelector(".tick_box").classList.add("on_choice4");
        nextQuestion();
      });
    })

    dataFill.appendChild(klon); //indsæt klonen i databeholderen med appendChild

    removeQuestions();
  });
}

function removeQuestions() {
  document.querySelectorAll(".spg_section").forEach((spgml) => {
    spgml.querySelector(`.inner_overflow`).classList.remove("question_in");
    spgml.querySelector(`.inner_question_wrap`).classList.remove("question_in2");
    spgml.querySelector(`.move_quiz`).classList.remove("question_in3");
    spgml.querySelector(`.spg_nr`).classList.remove("question_in4");

    spgml.querySelector(`.inner_overflow`).classList.add("question_away");
    spgml.querySelector(`.inner_question_wrap`).classList.add("question_away2");
    spgml.querySelector(`.move_quiz`).classList.add("question_away3");
    spgml.querySelector(`.spg_nr`).classList.add("question_away4");
  })
}

function startQuestion() {
  document.querySelector(".splash_transition").classList.add("splash_transition_animation");
  let this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);

  this_spg.style.visibility = "visible";
  this_spg.querySelectorAll(`.svarmulighed_wrap`).forEach((svar) => {
    svar.querySelector("p").classList.remove("on_choice2");
    svar.querySelector(".tick_box div").classList.remove("on_choice3");
    svar.querySelector(".tick_box").classList.remove("on_choice4");
  })

  setTimeout(function () {
    this_spg.querySelector(`.scale_choice`).classList.remove("on_choice");

    this_spg.querySelector(`.inner_overflow`).classList.remove("question_away");
    this_spg.querySelector(`.inner_question_wrap`).classList.remove("question_away2");
    this_spg.querySelector(`.move_quiz`).classList.remove("question_away3");
    this_spg.querySelector(`.spg_nr`).classList.remove("question_away4");

    this_spg.querySelector(`.inner_overflow`).classList.add("question_in");
    this_spg.querySelector(`.inner_question_wrap`).classList.add("question_in2");
    this_spg.querySelector(`.move_quiz`).classList.add("question_in3");
    this_spg.querySelector(`.spg_nr`).classList.add("question_in4");
  }, 1000)
}

function nextQuestion() {
  console.log(point);

  if (spg > 0 && spg < 11) {
    console.log(spg);

    let this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);
    this_spg.classList.add("on_choice");


    setTimeout(function () {
      this_spg.querySelector(`.inner_overflow`).classList.remove("question_in");
      this_spg.querySelector(`.inner_question_wrap`).classList.remove("question_in2");
      this_spg.querySelector(`.move_quiz`).classList.remove("question_in3");
      this_spg.querySelector(`.spg_nr`).classList.remove("question_in4");

      this_spg.querySelector(`.inner_overflow`).classList.add("question_away");
      this_spg.querySelector(`.inner_question_wrap`).classList.add("question_away2");
      this_spg.querySelector(`.move_quiz`).classList.add("question_away3");
      this_spg.querySelector(`.spg_nr`).classList.add("question_away4");

      spg++;
      this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);
      this_spg.style.visibility = "visible";
      console.log(spg);

      setTimeout(function () {
        this_spg.querySelectorAll(`.svarmulighed_wrap`).forEach((svar) => {
          svar.querySelector("p").classList.remove("on_choice2");
          svar.querySelector(".tick_box div").classList.remove("on_choice3");
          svar.querySelector(".tick_box").classList.remove("on_choice4");
        })

        this_spg.querySelector(`.scale_choice`).classList.remove("on_choice");

        this_spg.querySelector(`.inner_overflow`).classList.remove("question_away");
        this_spg.querySelector(`.inner_question_wrap`).classList.remove("question_away2");
        this_spg.querySelector(`.move_quiz`).classList.remove("question_away3");
        this_spg.querySelector(`.spg_nr`).classList.remove("question_away4");

        this_spg.querySelector(`.inner_overflow`).classList.add("question_in");
        this_spg.querySelector(`.inner_question_wrap`).classList.add("question_in2");
        this_spg.querySelector(`.move_quiz`).classList.add("question_in3");
        this_spg.querySelector(`.spg_nr`).classList.add("question_in4");
      }, 1000)
    }, 300)
  }
}

function previousQuestion() {

}
