let mouseX2 = 100
let mouseY2 = 100
let ringX2 = 100
let ringY2 = 100
const init_pointer2 = (options) => {

  window.onmousemove = (mouse) => {
    mouseX2 = mouse.clientX
    mouseY2 = mouse.clientY
  }

  const trace = (a, b, n) => {
    return (1 - n) * a + n * b;
  }
  window["trace"] = trace

  const render = () => {
    ringX2 = trace(ringX2, mouseX2, 0.26)
    ringY2 = trace(ringY2, mouseY2, 0.26)


    let smooth2_x = ringX2;
    let smooth2_y = ringY2;


    document.querySelectorAll(".spg_section").forEach((dialog) => {
      dialog.style.transform = `translate(${smooth2_x / 100}px, ${smooth2_y / 100}px)`;
    })
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}
