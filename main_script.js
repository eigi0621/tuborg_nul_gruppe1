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


  //thisBar1();
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

testYourself();
let randomRunning = false;
console.log(randomRunning);

function testYourself() {
  document.querySelectorAll(".slidecontainer").forEach((slcon) => {
    slcon.addEventListener("mouseover", () => {
      randomRunning = false;
    })
  })

  var slider1a = document.querySelector("#slider1a");
  var slider1b = document.querySelector("#slider1b");
  var vaerdi1a = document.querySelector("#vaerdi1a");
  var vaerdi1b = document.querySelector("#vaerdi1b");
  var slider2a = document.querySelector("#slider2a");
  var slider2b = document.querySelector("#slider2b");
  var vaerdi2a = document.querySelector("#vaerdi2a");
  var vaerdi2b = document.querySelector("#vaerdi2b");
  var slider3a = document.querySelector("#slider3a");
  var slider3b = document.querySelector("#slider3b");
  var vaerdi3a = document.querySelector("#vaerdi3a");
  var vaerdi3b = document.querySelector("#vaerdi3b");

  slider1a.oninput = function () {
    document.querySelectorAll("#barchart1 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart1 .bars line:nth-child(2)").style.transform = `translateY(${this.value / 10}px)`;
    document.querySelector("#barchart1 .bars line:nth-child(1)").style.transform = `translateY(${100 - this.value / 10}px)`;
    document.querySelector("#barchart1 .bars line:nth-child(1)").style.stroke = "#093A82";
    document.querySelector("#barchart1 .bars line:nth-child(2)").style.stroke = "#3c6196";
    vaerdi1a.textContent = `${Math.round(this.value / 10)}%`
    vaerdi1b.textContent = `${100 - Math.round(this.value / 10)}%`
    slider1b.value = `${1000 - this.value}`;
  }
  slider1b.oninput = function () {
    document.querySelectorAll("#barchart1 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart1 .bars line:nth-child(1)").style.transform = `translateY(${this.value / 10}px)`;
    document.querySelector("#barchart1 .bars line:nth-child(2)").style.transform = `translateY(${100 - this.value / 10}px)`;
    document.querySelector("#barchart1 .bars line:nth-child(1)").style.stroke = "#093A82";
    document.querySelector("#barchart1 .bars line:nth-child(2)").style.stroke = "#3c6196";
    vaerdi1b.textContent = `${Math.round(this.value / 10)}%`
    vaerdi1a.textContent = `${100 - Math.round(this.value / 10)}%`
    slider1a.value = `${1000 - this.value}`;
  }
  slider2a.oninput = function () {
    document.querySelectorAll("#barchart2 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart2 .bars line:nth-child(2)").style.transform = `translateY(${this.value / 10 + 52.1}px)`;
    document.querySelector("#barchart2 .bars line:nth-child(1)").style.transform = `translateY(${47.9 - (this.value / 10) + 52.1}px)`;
    document.querySelector("#barchart2 .bars line:nth-child(1)").style.stroke = "#093A82";
    document.querySelector("#barchart2 .bars line:nth-child(2)").style.stroke = "#3c6196";
    vaerdi2a.textContent = `${Math.round(this.value / 10)}%`
    vaerdi2b.textContent = `${Math.round(47.9 - (this.value / 10))}%`
    slider2b.value = `${479 - this.value}`;
  }
  slider2b.oninput = function () {
    document.querySelectorAll("#barchart2 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart2 .bars line:nth-child(1)").style.transform = `translateY(${this.value / 10 + 52.1}px)`;
    document.querySelector("#barchart2 .bars line:nth-child(2)").style.transform = `translateY(${47.9 - (this.value / 10) + 52.1}px)`;
    document.querySelector("#barchart2 .bars line:nth-child(1)").style.stroke = "#093A82";
    document.querySelector("#barchart2 .bars line:nth-child(2)").style.stroke = "#3c6196";
    vaerdi2b.textContent = `${Math.round(this.value / 10)}%`
    vaerdi2a.textContent = `${Math.round(47.9 - (this.value / 10))}%`
    slider2a.value = `${479 - this.value}`;
  }
  slider3a.oninput = function () {
    document.querySelectorAll("#barchart3 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart3 .bars line:nth-child(2)").style.transform = `translateY(${this.value / 10 + 7.9}px)`;
    document.querySelector("#barchart3 .bars line:nth-child(1)").style.transform = `translateY(${92.3 - (this.value / 10) + 7.7}px)`;
    document.querySelector("#barchart3 .bars line:nth-child(1)").style.stroke = "#093A82";
    document.querySelector("#barchart3 .bars line:nth-child(2)").style.stroke = "#3c6196";
    vaerdi3a.textContent = `${Math.round(this.value / 10)}%`
    vaerdi3b.textContent = `${Math.round(92.3 - (this.value / 10))}%`
    slider3b.value = `${923 - this.value}`;
  }
  slider3b.oninput = function () {
    document.querySelectorAll("#barchart3 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart3 .bars line:nth-child(1)").style.transform = `translateY(${this.value / 10 + 7.9}px)`;
    document.querySelector("#barchart3 .bars line:nth-child(2)").style.transform = `translateY(${92.3 - (this.value / 10) + 7.7}px)`;
    document.querySelector("#barchart3 .bars line:nth-child(1)").style.stroke = "#093A82";
    document.querySelector("#barchart3 .bars line:nth-child(2)").style.stroke = "#3c6196";
    vaerdi3b.textContent = `${Math.round(this.value / 10)}%`
    vaerdi3a.textContent = `${Math.round(92.3 - (this.value / 10))}%`
    slider3a.value = `${923 - this.value}`;
  }







  document.querySelector("#test1").addEventListener("click", () => {
    const valuesChart1 = [30.6, 69.4];
    document.querySelectorAll("#barchart1 .bars line").forEach((bar, i) => {
      bar.style.transition = "1s cubic-bezier(0.76, 0, 0.24, 1)";
      bar.style.transform = `translateY(${valuesChart1[i]}px)`;
    })
    document.querySelector("#barchart1 .bars line:nth-child(1)").style.stroke = "#FAC177";
    document.querySelector("#barchart1 .bars line:nth-child(2)").style.stroke = "#ffe2bb";

    let bar1Loop = true;

    setInterval(function () {
      if (bar1Loop == true) {
        let bar1a = document.querySelector("#barchart1 .bars line:nth-child(2)");
        let comp1a = window.getComputedStyle(bar1a).getPropertyValue("transform");

        var values1a = comp1a.split('(')[1];
        values1a = values1a.split(')')[0];
        values1a = values1a.split(', ');
        var bar1aVal = values1a[5];
        vaerdi1a.textContent = `${Math.round(bar1aVal)}%`;
        slider1a.value = `${(bar1aVal * 10)}`;

        let bar1b = document.querySelector("#barchart1 .bars line:nth-child(1)");
        let comp1b = window.getComputedStyle(bar1b).getPropertyValue("transform");

        var values1b = comp1b.split('(')[1];
        values1b = values1b.split(')')[0];
        values1b = values1b.split(', ');
        var bar1bVal = values1b[5];
        vaerdi1b.textContent = `${Math.round(bar1bVal)}%`;
        slider1b.value = `${(bar1bVal * 10)}`;
      }
    }, 20)

    setTimeout(function () {
      bar1Loop = false;
    }, 1000)
  });
  document.querySelector("#test2").addEventListener("click", () => {
    const valuesChart2 = [41.1, 6.8];
    document.querySelectorAll("#barchart2 .bars line").forEach((bar, i) => {
      bar.style.transition = "1s cubic-bezier(0.76, 0, 0.24, 1)";
      bar.style.transform = `translateY(${100 - valuesChart2[i]}px)`;
    })
    document.querySelector("#barchart2 .bars line:nth-child(1)").style.stroke = "#FAC177";
    document.querySelector("#barchart2 .bars line:nth-child(2)").style.stroke = "#ffe2bb";

    let bar2Loop = true;

    setInterval(function () {
      if (bar2Loop == true) {
        let bar2a = document.querySelector("#barchart2 .bars line:nth-child(2)");
        let comp2a = window.getComputedStyle(bar2a).getPropertyValue("transform");

        var values2a = comp2a.split('(')[1];
        values2a = values2a.split(')')[0];
        values2a = values2a.split(', ');
        var bar2aVal = values2a[5];
        vaerdi2a.textContent = `${Math.round(bar2aVal - 52.1)}%`;
        slider2a.value = `${(bar2aVal * 10) - 521}`;

        let bar2b = document.querySelector("#barchart2 .bars line:nth-child(1)");
        let comp2b = window.getComputedStyle(bar2b).getPropertyValue("transform");

        var values2b = comp2b.split('(')[1];
        values2b = values2b.split(')')[0];
        values2b = values2b.split(', ');
        var bar2bVal = values2b[5];
        vaerdi2b.textContent = `${Math.round(bar2bVal - 52.1)}%`;
        slider2b.value = `${(bar2bVal * 10) - 521}`;
      }
    }, 20)

    setTimeout(function () {
      bar2Loop = false;
    }, 1000)
  });
  document.querySelector("#test3").addEventListener("click", () => {
    const valuesChart3 = [50.9, 41.4];
    document.querySelectorAll("#barchart3 .bars line").forEach((bar, i) => {
      bar.style.transition = "1s cubic-bezier(0.76, 0, 0.24, 1)";
      bar.style.transform = `translateY(${100 - valuesChart3[i]}px)`;
    })
    document.querySelector("#barchart3 .bars line:nth-child(1)").style.stroke = "#FAC177";
    document.querySelector("#barchart3 .bars line:nth-child(2)").style.stroke = "#ffe2bb";

    let bar3Loop = true;

    setInterval(function () {
      if (bar3Loop == true) {
        let bar3a = document.querySelector("#barchart3 .bars line:nth-child(2)");
        let comp3a = window.getComputedStyle(bar3a).getPropertyValue("transform");

        var values3a = comp3a.split('(')[1];
        values3a = values3a.split(')')[0];
        values3a = values3a.split(', ');
        var bar3aVal = values3a[5];
        vaerdi3a.textContent = `${Math.round(bar3aVal - 7.7)}%`;
        slider3a.value = `${(bar3aVal * 10) - 77}`;

        let bar3b = document.querySelector("#barchart3 .bars line:nth-child(1)");
        let comp3b = window.getComputedStyle(bar3b).getPropertyValue("transform");

        var values3b = comp3b.split('(')[1];
        values3b = values3b.split(')')[0];
        values3b = values3b.split(', ');
        var bar3bVal = values3b[5];
        vaerdi3b.textContent = `${Math.round(bar3bVal - 7.7)}%`;
        slider3b.value = `${(bar3bVal * 10) - 77}`;
      }
    }, 20)

    setTimeout(function () {
      bar3Loop = false;
    }, 1000)
  });
}


window.onscroll = function () {
  if (window.matchMedia("(min-width: 1060px)").matches) {
    if (randomRunning == false) {
      console.log("on scroll");
      randomRunning = true;
      window.requestAnimationFrame(function () {
        randomDataPos1();
        randomDataPos2();
        randomDataPos3();
      })
    }
  }
}


function randomDataPos1() {
  var slider1a = document.querySelector("#slider1a");
  var slider1b = document.querySelector("#slider1b");
  var vaerdi1a = document.querySelector("#vaerdi1a");
  var vaerdi1b = document.querySelector("#vaerdi1b");


  if (randomRunning == true) {
    let bar1a_rdm = document.querySelector("#barchart1 .bars line:nth-child(2)");
    let bar1b_rdm = document.querySelector("#barchart1 .bars line:nth-child(1)");
    let random1 = Math.round(Math.random() * 100);
    let random1del = Math.round(Math.random() * 1000 + 1000);

    document.querySelectorAll("#barchart1 .bars line").forEach((bar) => {
      bar.style.transition = `${random1del / 1000}s cubic-bezier(0.76, 0, 0.24, 1)`;
    })

    bar1a_rdm.style.transform = `translateY(${random1}px)`;
    bar1b_rdm.style.transform = `translateY(${100 - random1}px)`;
    bar1a_rdm.style.stroke = "#3c6196";
    bar1b_rdm.style.stroke = "#093A82";


    let comp1a_rdm = window.getComputedStyle(bar1a_rdm).getPropertyValue("transform");
    let comp1b_rdm = window.getComputedStyle(bar1b_rdm).getPropertyValue("transform");

    setInterval(function () {
      if (randomRunning == true) {
        bar1a_rdm = document.querySelector("#barchart1 .bars line:nth-child(2)");
        bar1b_rdm = document.querySelector("#barchart1 .bars line:nth-child(1)");
        comp1a_rdm = window.getComputedStyle(bar1a_rdm).getPropertyValue("transform");
        comp1b_rdm = window.getComputedStyle(bar1b_rdm).getPropertyValue("transform");

        var values1a_rdm = comp1a_rdm.split('(')[1];
        values1a_rdm = values1a_rdm.split(')')[0];
        values1a_rdm = values1a_rdm.split(', ');
        var bar1a_rdmVal = values1a_rdm[5];
        vaerdi1a.textContent = `${Math.round(bar1a_rdmVal)}%`;
        slider1a.value = `${bar1a_rdmVal * 10}`;

        var values1b_rdm = comp1b_rdm.split('(')[1];
        values1b_rdm = values1b_rdm.split(')')[0];
        values1b_rdm = values1b_rdm.split(', ');
        var bar1b_rdmVal = values1b_rdm[5];
        vaerdi1b.textContent = `${Math.round(bar1b_rdmVal)}%`;
        slider1b.value = `${(bar1b_rdmVal * 10)}`;
      }
    }, 20)

    setTimeout(function () {
      randomDataPos1();
    }, random1del)
  }
}

function randomDataPos2() {
  var slider2a = document.querySelector("#slider2a");
  var slider2b = document.querySelector("#slider2b");
  var vaerdi2a = document.querySelector("#vaerdi2a");
  var vaerdi2b = document.querySelector("#vaerdi2b");


  if (randomRunning == true) {
    let bar2a_rdm = document.querySelector("#barchart2 .bars line:nth-child(2)");
    let bar2b_rdm = document.querySelector("#barchart2 .bars line:nth-child(1)");
    let random2 = Math.round(Math.random() * 47.9);
    let random2del = Math.round(Math.random() * 1000 + 1000);

    document.querySelectorAll("#barchart2 .bars line").forEach((bar) => {
      bar.style.transition = `${random2del / 1000}s cubic-bezier(0.76, 0, 0.24, 1)`;
    })

    bar2a_rdm.style.transform = `translateY(${random2 + 52.1}px)`;
    bar2b_rdm.style.transform = `translateY(${47.9 - random2 + 52.1}px)`;
    bar2a_rdm.style.stroke = "#3c6196";
    bar2b_rdm.style.stroke = "#093A82";


    let comp2a_rdm = window.getComputedStyle(bar2a_rdm).getPropertyValue("transform");
    let comp2b_rdm = window.getComputedStyle(bar2b_rdm).getPropertyValue("transform");


    setInterval(function () {
      if (randomRunning == true) {
        bar2a_rdm = document.querySelector("#barchart2 .bars line:nth-child(2)");
        bar2b_rdm = document.querySelector("#barchart2 .bars line:nth-child(1)");
        comp2a_rdm = window.getComputedStyle(bar2a_rdm).getPropertyValue("transform");
        comp2b_rdm = window.getComputedStyle(bar2b_rdm).getPropertyValue("transform");

        var values2a_rdm = comp2a_rdm.split('(')[1];
        values2a_rdm = values2a_rdm.split(')')[0];
        values2a_rdm = values2a_rdm.split(', ');
        var bar2a_rdmVal = values2a_rdm[5];
        vaerdi2a.textContent = `${Math.round(bar2a_rdmVal - 52.1)}%`;
        slider2a.value = `${(bar2a_rdmVal * 10) - 521}`;

        var values2b_rdm = comp2b_rdm.split('(')[1];
        values2b_rdm = values2b_rdm.split(')')[0];
        values2b_rdm = values2b_rdm.split(', ');
        var bar2b_rdmVal = values2b_rdm[5];
        vaerdi2b.textContent = `${Math.round(bar2b_rdmVal - 52.1)}%`;
        slider2b.value = `${(bar2b_rdmVal * 10) - 521}`;
      }
    }, 20)

    setTimeout(function () {
      randomDataPos2();
    }, random2del)
  }
}

function randomDataPos3() {
  var slider3a = document.querySelector("#slider3a");
  var slider3b = document.querySelector("#slider3b");
  var vaerdi3a = document.querySelector("#vaerdi3a");
  var vaerdi3b = document.querySelector("#vaerdi3b");


  if (randomRunning == true) {
    let bar3a_rdm = document.querySelector("#barchart3 .bars line:nth-child(2)");
    let bar3b_rdm = document.querySelector("#barchart3 .bars line:nth-child(1)");
    let random3 = Math.round(Math.random() * 92.3);
    let random3del = Math.round(Math.random() * 1000 + 1000);

    document.querySelectorAll("#barchart3 .bars line").forEach((bar) => {
      bar.style.transition = `${random3del / 1000}s cubic-bezier(0.76, 0, 0.24, 1)`;
    })

    bar3a_rdm.style.transform = `translateY(${random3 + 7.7}px)`;
    bar3b_rdm.style.transform = `translateY(${92.3 - random3 + 7.7}px)`;
    bar3a_rdm.style.stroke = "#3c6196";
    bar3b_rdm.style.stroke = "#093A82";


    let comp3a_rdm = window.getComputedStyle(bar3a_rdm).getPropertyValue("transform");
    let comp3b_rdm = window.getComputedStyle(bar3b_rdm).getPropertyValue("transform");


    setInterval(function () {
      if (randomRunning == true) {
        bar3a_rdm = document.querySelector("#barchart3 .bars line:nth-child(2)");
        bar3b_rdm = document.querySelector("#barchart3 .bars line:nth-child(1)");
        comp3a_rdm = window.getComputedStyle(bar3a_rdm).getPropertyValue("transform");
        comp3b_rdm = window.getComputedStyle(bar3b_rdm).getPropertyValue("transform");

        var values3a_rdm = comp3a_rdm.split('(')[1];
        values3a_rdm = values3a_rdm.split(')')[0];
        values3a_rdm = values3a_rdm.split(', ');
        var bar3a_rdmVal = values3a_rdm[5];
        vaerdi3a.textContent = `${Math.round(bar3a_rdmVal - 7.7)}%`;
        slider3a.value = `${(bar3a_rdmVal * 10) - 77}`;

        var values3b_rdm = comp3b_rdm.split('(')[1];
        values3b_rdm = values3b_rdm.split(')')[0];
        values3b_rdm = values3b_rdm.split(', ');
        var bar3b_rdmVal = values3b_rdm[5];
        vaerdi3b.textContent = `${Math.round(bar3b_rdmVal - 7.7)}%`;
        slider3b.value = `${(bar3b_rdmVal * 10) - 77}`;
      }
    }, 20)

    setTimeout(function () {
      randomDataPos3();
    }, random3del)
  }
}
