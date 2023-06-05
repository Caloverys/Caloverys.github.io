for (let j = 0; j < row_num; j++) {
  let tr = document.createElement('tr');
  const sub_list = [];
  for (let i = 0; i < col_num; i++) {
    let th = document.createElement('th');

    th.className = "parent rect";
    th.innerHTML = `<div class='small_rect'></div>`
    tr.appendChild(th);
    sub_list.push(th);
  }
  rects_list.push(sub_list);
  table.appendChild(tr);
}

function apply_animation() {
  console.clear()

  //debugger
    console.log(table.querySelectorAll('th'))
table.querySelectorAll('th').forEach(th=>{
 // th.querySelector("div").style.animationDelay = "0s"
  //th.querySelector("div").style.animationDelay = '0s'
  th.querySelector("div").classList.remove("opacity_animation", "opacity_animation_reverse","low_opacity");
  th.classList.remove("border_opacity_animation", "border_opacity_animation_reverse","low_border_color","high_border_color")
  th.classList.remove("high_border_color")
})
    console.log(table.querySelectorAll('th'))
  table.querySelectorAll("th").forEach((th, num) => {
   // //console.log(num, row_num * col_num-1)
   // console.log(th,num)

    th.querySelector("div").classList.add("opacity_animation");
    th.classList.add("border_opacity_animation");
    console.log(num,th)
    th.style.animationDelay = `${Math.floor(num/col_num)/20 + 0.05}s`;
   // th.classList.add("high_border_color");
    console.log(num,th)
   
    th.addEventListener("animationend", function() {
    th.classList.remove("low_border_color")
    th.classList.add("high_border_color");

      //console.log("oh yees", num, th, table.querySelectorAll("th"))
      if (num === row_num * col_num - 1) {
        //debugger
        Array.from(table.querySelectorAll("th")).reverse().forEach((th, num) => {
          th.classList.add("border_opacity_animation_reverse");
          th.style.animationDelay = `${Math.floor(num/col_num)/20 +0.05}s`;
          th.addEventListener("animationend", event => {
            th.classList.remove("high_border_color")
            th.classList.add('low_border_color')
          })

        })
      }
    })
    //if(has_started) 
    //debugger
    if (num === row_num * col_num - 1){
      console.log("yes")
      console.log(table.querySelectorAll("th"))
    }
    th.querySelector("div").style.animationDelay = `${Math.floor(num/col_num)/20 + 0.05}s`;
    th.querySelector("div").addEventListener("animationend", event => {

      event.target.classList.add("default_opacity")

      if (num === row_num * col_num - 1) {
         console.log('whu')
        Array.from(table.querySelectorAll("th")).reverse().forEach((th, num) => {
          th.querySelector("div").classList.add("opacity_animation_reverse");
          th.querySelector("div").style.animationDelay = `${Math.floor(num/col_num)/20+0.05}s`;
          th.querySelector("div").addEventListener("animationend", event =>{
            event.target.classList.remove("default_opacity")

            th.querySelector("div").classList.add("low_opacity");
            if(num ===  Array.from(table.querySelectorAll("th")).length -1){
              document.querySelectorAll(".border_opacity_animation").forEach(ele=>{
                ele.classList.remove('border_opacity_animation', "border_opacity_animation_reverse");
                ele.querySelector('div').classList.remove("opacity_animation", "opacity_animation_reverse")
              })
            }
          })

        })
      }
    

    })
  })

}
