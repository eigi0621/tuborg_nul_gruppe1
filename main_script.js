const urlParams = new URLSearchParams(window.location.search);
const kategori = urlParams.get("kategori");
let endpoint = "https://spreadsheets.google.com/feeds/list/1pA_1-0vsMhF4a11N38gCRR7T7gee3YCI09RojMyq1QY/od6/public/values?alt=json";
let toej = [];
let filter = kategori;
let point = 0;
let spg = 1;
let spg2 = 2;

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");

  //start cursor script
  init_pointer({});

  //opret tomt array til tøjet, derefter hent JSON
  let toej = []
  hentJSON();

  document.querySelector(".start_quiz").addEventListener("click", startQuestion);
  document.querySelector("#til_forside").addEventListener("click", () => {
    removeQuestions();
    document.querySelector(".splash_transition").classList.remove("splash_transition_animation_in");
    document.querySelector(".splash_transition").classList.add("splash_transition_animation_out");
    document.querySelector(".meter_section").classList.remove("splash_transition_animation_in");
    document.querySelector(".meter_section").classList.add("splash_transition_animation_out");
    document.querySelector(".question_wrap").classList.remove("splash_transition_animation_in");
    document.querySelector(".question_wrap").classList.add("splash_transition_animation_out");
  });

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
    klon.querySelector(".spg_nr").textContent = `spørgsmål ${element.gsx$spgnr.$t} ud af 8`;
    klon.querySelector(".img_container").style.backgroundImage = `url(img/${element.gsx$spgnr.$t}.jpg)`;

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
  point = 0;
  spg = 1;
  spg2 = 2;

  let this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);
  let this_spg2 = document.querySelector(`.img_section:nth-child(${spg2})`);


  document.querySelector(".question_wrap").classList.remove("splash_transition_animation_out");
  document.querySelector(".question_wrap").classList.add("splash_transition_animation_in");

  document.querySelectorAll(".spg_section").forEach((spgml) => {
    spgml.querySelector(`.inner_overflow`).classList.remove("question_in");
    spgml.querySelector(`.inner_question_wrap`).classList.remove("question_in2");
    spgml.querySelector(`.move_quiz`).classList.remove("question_in3a");
    spgml.querySelector(`.spg_nr`).classList.remove("question_in4");

    spgml.querySelector(`.inner_overflow`).classList.add("question_away");
    spgml.querySelector(`.inner_question_wrap`).classList.add("question_away2");
    spgml.querySelector(`.move_quiz`).classList.add("question_away3a");
    spgml.querySelector(`.spg_nr`).classList.add("question_away4");

    spgml.classList.remove("on_choice");
  })
  document.querySelectorAll(".img_section").forEach((imgsc) => {
    imgsc.querySelector(`.inner_overflow2`).classList.remove("question_in");
    imgsc.querySelector(`.inner_question_wrap2`).classList.remove("question_in2");
    imgsc.querySelector(`.move_quiz2`).classList.remove("question_in3b");

    imgsc.querySelector(`.inner_overflow2`).classList.add("question_away");
    imgsc.querySelector(`.inner_question_wrap2`).classList.add("question_away2");
    imgsc.querySelector(`.move_quiz2`).classList.add("question_away3b");
  })

  document.querySelector(`.inner_overflow3`).classList.remove("question_in");
  document.querySelector(`.inner_question_wrap3`).classList.remove("question_in2");
  document.querySelector(`.move_quiz3`).classList.remove("question_in3c");

  document.querySelector(`.inner_overflow3`).classList.add("question_away");
  document.querySelector(`.inner_question_wrap3`).classList.add("question_away2");
  document.querySelector(`.move_quiz3`).classList.add("question_away3c");

  setTimeout(function () {
    document.querySelector(".meter_section").style.visibility = "hidden";
    document.querySelectorAll(".spg_section").forEach((spgl) => {
      spgl.style.visibility = "hidden";
    })
    document.querySelectorAll(".move_quiz2").forEach((quiz) => {
      quiz.style.visibility = "hidden";
    })
  }, 1000)
}

function startQuestion() {
  document.querySelector(".question_wrap").classList.remove("splash_transition_animation_out");
  document.querySelector(".question_wrap").classList.add("splash_transition_animation_in");
  document.querySelector(".splash_transition").classList.remove("splash_transition_animation_out");
  document.querySelector(".splash_transition").classList.add("splash_transition_animation_in");
  let this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);
  let this_spg2 = document.querySelector(`.img_section:nth-child(${spg2})`);

  this_spg.style.visibility = "visible";
  this_spg2.querySelector(".move_quiz2").style.visibility = "visible";
  this_spg.querySelectorAll(`.svarmulighed_wrap`).forEach((svar) => {
    svar.querySelector("p").classList.remove("on_choice2");
    svar.querySelector(".tick_box div").classList.remove("on_choice3");
    svar.querySelector(".tick_box").classList.remove("on_choice4");
  })

  setTimeout(function () {
    this_spg.querySelector(`.scale_choice`).classList.remove("on_choice");

    this_spg.querySelector(`.inner_overflow`).classList.remove("question_away");
    this_spg.querySelector(`.inner_question_wrap`).classList.remove("question_away2");
    this_spg.querySelector(`.move_quiz`).classList.remove("question_away3a");
    this_spg.querySelector(`.spg_nr`).classList.remove("question_away4");

    this_spg.querySelector(`.inner_overflow`).classList.add("question_in");
    this_spg.querySelector(`.inner_question_wrap`).classList.add("question_in2");
    this_spg.querySelector(`.move_quiz`).classList.add("question_in3a");
    this_spg.querySelector(`.spg_nr`).classList.add("question_in4");


    this_spg2.querySelector(`.inner_overflow2`).classList.remove("question_away");
    this_spg2.querySelector(`.inner_question_wrap2`).classList.remove("question_away2");
    this_spg2.querySelector(`.move_quiz2`).classList.remove("question_away3b");

    this_spg2.querySelector(`.inner_overflow2`).classList.add("question_in");
    this_spg2.querySelector(`.inner_question_wrap2`).classList.add("question_in2");
    this_spg2.querySelector(`.move_quiz2`).classList.add("question_in3b");

    document.querySelector(".meter_section").classList.remove("splash_transition_animation_out");
    document.querySelector(".meter_section").classList.add("splash_transition_animation_in");
  }, 1000)
}

function nextQuestion() {
  console.log(point);

  if (spg > 0 && spg < 15) {

    console.log(spg + "spg nr.")

    let this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);
    let this_spg2 = document.querySelector(`.img_section:nth-child(${spg2})`);
    this_spg.classList.add("on_choice");

    this_spg2.querySelector(`.inner_overflow2`).classList.remove("question_in");
    this_spg2.querySelector(`.inner_question_wrap2`).classList.remove("question_in2");
    this_spg2.querySelector(`.move_quiz2`).classList.remove("question_in3b");

    this_spg2.querySelector(`.inner_overflow2`).classList.add("question_away");
    this_spg2.querySelector(`.inner_question_wrap2`).classList.add("question_away2");
    this_spg2.querySelector(`.move_quiz2`).classList.add("question_away3b");

    setTimeout(function () {
      this_spg.querySelector(`.inner_overflow`).classList.remove("question_in");
      this_spg.querySelector(`.inner_question_wrap`).classList.remove("question_in2");
      this_spg.querySelector(`.move_quiz`).classList.remove("question_in3a");
      this_spg.querySelector(`.spg_nr`).classList.remove("question_in4");

      this_spg.querySelector(`.inner_overflow`).classList.add("question_away");
      this_spg.querySelector(`.inner_question_wrap`).classList.add("question_away2");
      this_spg.querySelector(`.move_quiz`).classList.add("question_away3a");
      this_spg.querySelector(`.spg_nr`).classList.add("question_away4");


      spg++;
      spg++;
      spg2++;
      spg2++;
      this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);
      this_spg2 = document.querySelector(`.img_section:nth-child(${spg2})`);
      this_spg.style.visibility = "visible";
      this_spg2.querySelector(".move_quiz2").style.visibility = "visible";

      setTimeout(function () {
        this_spg.querySelectorAll(`.svarmulighed_wrap`).forEach((svar) => {
          svar.querySelector("p").classList.remove("on_choice2");
          svar.querySelector(".tick_box div").classList.remove("on_choice3");
          svar.querySelector(".tick_box").classList.remove("on_choice4");
        })

        this_spg.querySelector(`.scale_choice`).classList.remove("on_choice");

        this_spg.querySelector(`.inner_overflow`).classList.remove("question_away");
        this_spg.querySelector(`.inner_question_wrap`).classList.remove("question_away2");
        this_spg.querySelector(`.move_quiz`).classList.remove("question_away3a");
        this_spg.querySelector(`.spg_nr`).classList.remove("question_away4");

        this_spg.querySelector(`.inner_overflow`).classList.add("question_in");
        this_spg.querySelector(`.inner_question_wrap`).classList.add("question_in2");
        this_spg.querySelector(`.move_quiz`).classList.add("question_in3a");
        this_spg.querySelector(`.spg_nr`).classList.add("question_in4");


        this_spg2.querySelector(`.inner_overflow2`).classList.remove("question_away");
        this_spg2.querySelector(`.inner_question_wrap2`).classList.remove("question_away2");
        this_spg2.querySelector(`.move_quiz2`).classList.remove("question_away3b");

        this_spg2.querySelector(`.inner_overflow2`).classList.add("question_in");
        this_spg2.querySelector(`.inner_question_wrap2`).classList.add("question_in2");
        this_spg2.querySelector(`.move_quiz2`).classList.add("question_in3b");
      }, 1000)
    }, 300)
  } else {
    meterAnimation();
  }
}


function meterAnimation() {

  let this_spg = document.querySelector(`.spg_section:nth-child(${spg})`);
  let this_spg2 = document.querySelector(`.img_section:nth-child(${spg2})`);
  this_spg.classList.add("on_choice");

  this_spg2.querySelector(`.inner_overflow2`).classList.remove("question_in");
  this_spg2.querySelector(`.inner_question_wrap2`).classList.remove("question_in2");
  this_spg2.querySelector(`.move_quiz2`).classList.remove("question_in3b");

  this_spg2.querySelector(`.inner_overflow2`).classList.add("question_away");
  this_spg2.querySelector(`.inner_question_wrap2`).classList.add("question_away2");
  this_spg2.querySelector(`.move_quiz2`).classList.add("question_away3b");

  setTimeout(function () {
    this_spg.querySelector(`.inner_overflow`).classList.remove("question_in");
    this_spg.querySelector(`.inner_question_wrap`).classList.remove("question_in2");
    this_spg.querySelector(`.move_quiz`).classList.remove("question_in3a");
    this_spg.querySelector(`.spg_nr`).classList.remove("question_in4");

    this_spg.querySelector(`.inner_overflow`).classList.add("question_away");
    this_spg.querySelector(`.inner_question_wrap`).classList.add("question_away2");
    this_spg.querySelector(`.move_quiz`).classList.add("question_away3a");
    this_spg.querySelector(`.spg_nr`).classList.add("question_away4");
  }, 300)



  setTimeout(function () {
    document.querySelector(".meter_section").style.visibility = "visible";

    document.querySelector(`.inner_overflow3`).classList.remove("question_away");
    document.querySelector(`.inner_question_wrap3`).classList.remove("question_away2");
    document.querySelector(`.move_quiz3`).classList.remove("question_away3c");

    document.querySelector(`.inner_overflow3`).classList.add("question_in");
    document.querySelector(`.inner_question_wrap3`).classList.add("question_in2");
    document.querySelector(`.move_quiz3`).classList.add("question_in3c");



    let meterWidth = 50;
    let maxPoint = 32;
    let meterPoints = meterWidth / maxPoint * (point - 8) + 1;

    if (meterPoints < 2) {
      document.querySelector(".meter_wrap h2").innerHTML = "Hey! Du tog jo bare den første mulighed på alle spørgsmålene?!"
      meterPoints = 0;
    } else if (meterPoints < 12) {
      document.querySelector(".meter_wrap h2").innerHTML = "Du skal vist øve dig lidt på at drikke Tuborg Nul!"
    } else if (meterPoints < 22) {
      document.querySelector(".meter_wrap h2").innerHTML = "Du viser gode takter, men du har ikke opnået dit fulde potentiale!"
    } else if (meterPoints < 32) {
      document.querySelector(".meter_wrap h2").innerHTML = "Slet ikke dårligt - du begynder at få smag for Tuborg Nul!"
    } else if (meterPoints < 40) {
      document.querySelector(".meter_wrap h2").innerHTML = "Du er rigtig godt på vej til at blive fuldblodig Tuborg-Nul-drikker!"
    } else if (meterPoints < 50) {
      document.querySelector(".meter_wrap h2").innerHTML = "Du er en sand Tuborg Nul kender."
    } else {
      document.querySelector(".meter_wrap h2").innerHTML = "Hey! Du tog jo bare den sidste mulighed på alle spørgsmålene?!"
      meterPoints = 0;
    }



    Scrambler({
      target: ".meter_wrap h2",
      random: [100, 4000],
      speed: 100,
      afterAll: function () {
        document.querySelector(".meter_section p").classList.remove("slide_down");
        document.querySelector(".meter_section p").classList.add("slide_up");
        document.querySelector(".meter_section p").addEventListener("click", () => {
          removeQuestions();
          document.querySelector(".splash_transition").classList.remove("splash_transition_animation_in");
          document.querySelector(".splash_transition").classList.add("splash_transition_animation_out");
          document.querySelector(".meter_section").classList.remove("splash_transition_animation_in");
          document.querySelector(".meter_section").classList.add("splash_transition_animation_out");
        });
      }
    });
    console.log(meterPoints + "points");


    document.querySelector(".meter_counter").style.transform = `translateX(10vw)`;
    setTimeout(function () {
      document.querySelector(".meter_counter").style.transform = `translateX(45vw)`;
      setTimeout(function () {
        document.querySelector(".meter_counter").style.transform = `translateX(25vw)`;
        setTimeout(function () {
          document.querySelector(".meter_counter").style.transform = `translateX(${meterPoints}vw)`;
        }, 1000)
      }, 1000)
    }, 1000)
  }, 1000)
}

function previousQuestion() {

}
