 slider2a.oninput = function () {
    document.querySelectorAll("#barchart2 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart2 .bars line:nth-child(1)").style.transform = `translateY(${this.value / 10}px)`;
    document.querySelector("#barchart2 .bars line:nth-child(2)").style.transform = `translateY(${100 - this.value / 10}px)`;
    vaerdi2a.textContent = `${Math.ceil(this.value / 10)}%`
    vaerdi2b.textContent = `${100 - Math.ceil(this.value / 10)}%`
    slider2b.value = `${1000 - this.value}`;
  }
  slider2b.oninput = function () {
    document.querySelectorAll("#barchart1 .bars line").forEach((bar) => {
      bar.style.transition = "0s cubic-bezier(0.76, 0, 0.24, 1)";
    })
    document.querySelector("#barchart2 .bars line:nth-child(2)").style.transform = `translateY(${this.value / 10}px)`;
    document.querySelector("#barchart2 .bars line:nth-child(1)").style.transform = `translateY(${100 - this.value / 10}px)`;
    vaerdi2b.textContent = `${Math.ceil(this.value / 10)}%`
    vaerdi2a.textContent = `${100 - Math.ceil(this.value / 10)}%`
    slider2a.value = `${1000 - this.value}`;
  }
