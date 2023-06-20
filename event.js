window.onload= function(){
let saved_shape_preview = JSON.parse(localStorage.getItem("saved_shaped_preview"));
let locked_rects = JSON.parse(localStorage.getItem("locked_rects"));
let current_block = JSON.parse(localStorage.getItem("current_block"));

if(saved_shape_preview){
  //create duplicate of the array 
  block_list = saved_shape_preview.map((i,num)=>{
    let block = new Block(block_shape[i]);
    if(num === 0) block.display("current_shape_preview",-1)
    else block.display("shape_preview",num-1);

  return block;
  });



locked_rects.forEach(ele=>{
  document.querySelector(`#${ele}`).classList.add("selected","locked");
});
block_list[0] = new Block(block_shape[current_block.sequence - 1], current_block.init_x, current_block.init_y, current_block.rotate_index,current_block.structure);
    has_started = true;
  block_list[0].simulate("selected");
 block_list[0].to_bottom(false);
   interval = setInterval(()=>block_list[0].update(),drop_speed)
  return;

}

for(let i =0; i<preview_num;i++){
  let block = new Block(block_shape[Math.floor(Math.random() * 6)]);
  block_list.push(block);
  if(i===0) block.display("current_shape_preview",-1);
    else block.display("shape_preview",i-1);


}
 apply_animation();


}


document.querySelector("button").addEventListener("click", function(){
  if(has_started) return;
        has_started = true;
  block_list[0].simulate("selected");
 block_list[0].to_bottom(false);
  interval = setInterval(()=>block_list[0].update(),drop_speed);

})

document.querySelectorAll("button")[1].addEventListener("click",function(){
  localStorage.clear();
    classList_remove("locked");
  location.reload();
})


window.addEventListener("beforeunload",function(){
  if(document.querySelectorAll(".locked").length && block_list && has_started){
  localStorage.setItem("saved_shaped_preview", JSON.stringify(block_list.map(i=>i.sequence - 1)));
  let array = [];
  [...document.querySelectorAll(".locked")].forEach(ele=>{
    array.push(ele.id.toString())
  })
    localStorage.setItem("locked_rects", JSON.stringify(array));
     localStorage.setItem("current_block", JSON.stringify(block_list[0]));
   }
   
});

document.addEventListener("keydown", event => {
if(has_started){
  if(!has_stopped){
  if (event.key == " " || event.keyCode == 32) {
    block_list[0].to_bottom(true);
  }
  else if(event.key.toLowerCase() == "a"  || event.keyCode == 97 || event.key == "ArrowLeft" || event.keyCode == 37) {
    block_list[0].to_left();
  }
  else if(event.key.toLowerCase() == "d" || event.keyCode == 100 || event.key == "ArrowRight" || event.keyCode == 39){
    block_list[0].to_right();
  }
  //preventing page refreshing shortcut rotate the page
  else if(!(event.metaKey || event.ctrlKey) && (event.key.toLowerCase() == "r" || event.keyCode == 82)){
    block_list[0].to_rotate();
  }
  else if(event.key.toLowerCase() == "s" || event.keyCode == 83 || event.key == "ArrowDown" || event.keyCode == 40){
    window.clearInterval(interval)
    drop_speed =40;

    interval = setInterval(()=>block_list[0].update(),drop_speed);
  }

  }
  if(event.key.toLowerCase() == "p" || event.keyCode == 80  ){
      if(!has_stopped){
        window.clearInterval(interval);
        has_stopped = true;
       
    } else{
       interval = setInterval(()=>block_list[0].update(),drop_speed);
      has_stopped = false;
    }
}
}

});
document.addEventListener("keyup", event =>{
  if(event.key.toLowerCase() == "s" || event.keyCode == 83 || event.key == "ArrowDown" || event.keyCode == 40){
    window.clearInterval(interval);
    drop_speed = 200;
    interval = setInterval(()=>block_list[0].update(),drop_speed);
  }

});

document.querySelector("#rotate_button").addEventListener("click", ()=>{
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'r'}));
});
document.querySelector("#drop_button").addEventListener("click", ()=>{
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': ' '}));
});
document.querySelector("#pause_button").addEventListener("click", ()=>{
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p'}));
});
document.querySelector("#left_button").addEventListener("click", ()=>{
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}));
});
document.querySelector("#right_button").addEventListener("click", ()=>{
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'd'}));
});
document.querySelector("#down_button").addEventListener("mousedown", ()=>{
  document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
});
document.querySelector("#down_button").addEventListener("mouseup", ()=>{
  document.dispatchEvent(new KeyboardEvent('keyup', {'key': 's'}));
});









