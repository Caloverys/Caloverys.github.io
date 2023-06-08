for (let j = 0; j < row_num; j++) {
  let tr = document.createElement('tr');
  const sub_list = [];
  for (let i = 0; i < col_num; i++) {
    let th = document.createElement('th');
    th.id = `th_${i + col_num*j}`

    th.className = "parent rect";
    th.innerHTML = `<div  class='small_rect'></div>`
    tr.appendChild(th);
    sub_list.push(th);
  }
  rects_list.push(sub_list);
  table.appendChild(tr);
}

function apply_animation(is_reset) {
  if(is_reset){
table.querySelectorAll('th').forEach(th=>{
  //"low_opacity"
  th.querySelector("div").classList.remove("opacity_animation", "opacity_animation_reverse","low_opacity");
  th.classList.remove("border_opacity_animation", "border_opacity_animation_reverse", "low_border_color",)
  //"low_border_color","high_border_color"
})
}
   Array.from(table.querySelectorAll("th")).reverse().forEach((th, num) => {

    th.querySelector("div").classList.add("opacity_animation");
    th.classList.add("border_opacity_animation");
    th.style.animationDelay = `${Math.floor(num/col_num)/20 }s`;
              th.addEventListener("animationstart", event => {
            if(th.classList.contains("red_theme")){
            th.classList.remove("red_theme");
            document.querySelectorAll(".red_theme_outline").forEach(ele =>ele.classList.remove("red_theme_outline"));
          }
          })
   
    th.addEventListener("animationend", function() {
     

    th.classList.remove("low_border_color")
    th.classList.add("high_border_color");

      if (num === row_num * col_num - 1) {
         //remove all the selected rect if there is 
        table.querySelectorAll(".selected").forEach(ele=>ele.classList.remove("locked","selected"));
        Array.from(table.querySelectorAll("th")).forEach((th, num) => {

          th.classList.add("border_opacity_animation_reverse");
          th.style.animationDelay = `${Math.floor(num/col_num)/20}s`;
          th.addEventListener("animationend", event => {
            th.classList.remove("high_border_color")
            th.classList.add('low_border_color')
          })
        });

      
      }
    })
    th.querySelector("div").style.animationDelay = `${Math.floor(num/col_num)/20}s`;

th.querySelector("div").addEventListener("animationend", event => {

      event.target.classList.add("default_opacity")

      if (num === row_num * col_num - 1) {
        Array.from(table.querySelectorAll("th")).forEach((th, num) => {
          th.querySelector("div").classList.add("opacity_animation_reverse");
         th.querySelector("div").style.animationDelay = `${Math.floor(num/col_num)/20}s`;
          th.querySelector("div").addEventListener("animationend", event =>{
            event.target.classList.remove("default_opacity")

            th.querySelector("div").classList.add("low_opacity");

          })

        })


      }
    

    })
  })

}

