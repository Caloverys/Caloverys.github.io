for (let j = 0; j < row_num; j++) {
  let tr = document.createElement('tr');
  const sub_list = [];
  for (let i = 0; i < col_num; i++) {
    let th = document.createElement('th');

    th.className = "parent rect";
    th.innerHTML = `<div class='small_rect opacity_animation'></div>`
    tr.appendChild(th);
    sub_list.push(th);
  }
  rects_list.push(sub_list);
  table.appendChild(tr);
}

function apply_animation() {
table.querySelectorAll('th').forEach(th=>{
  th.querySelector("div").classList.remove("opacity_animation", "opacity_animation_reverse");
  th.classList.remove("border_opacity_animation", "border_opacity_animation_reverse")
})
  table.querySelectorAll("th").forEach((th, num) => {
    th.querySelector("div").classList.add("opacity_animation");
    th.classList.add("border_opacity_animation");
    th.style.animationDelay = `${Math.floor(num/col_num)/20}s`;
    th.addEventListener("animationend", function() {
      th.style.borderColor = "rgba(0,0,0,1)";
      if (num === row_num * col_num - 1) {
        Array.from(table.querySelectorAll("th")).reverse().forEach((th, num) => {
          th.classList.add("border_opacity_animation_reverse");
          th.style.animationDelay = `${Math.floor(num/col_num)/20}s`;
          th.addEventListener("animationend", event => {
            th.style.borderColor = "rgba(0,0,0,0.15)"
          })

        })
      }
    })

    th.querySelector("div").style.animationDelay = `${Math.floor(num/col_num)/20}s`;
    th.querySelector("div").addEventListener("animationend", event => {

      event.target.style.opacity = 1;

      if (num === row_num * col_num - 1) {
        Array.from(table.querySelectorAll("th")).reverse().forEach((th, num) => {
          th.querySelector("div").classList.add("opacity_animation_reverse");
          th.querySelector("div").style.animationDelay = `${Math.floor(num/col_num)/20}s`;
          th.querySelector("div").addEventListener("animationend", event => th.querySelector("div").style.opacity = 0.15);


        })
      }

    })
  })

}
