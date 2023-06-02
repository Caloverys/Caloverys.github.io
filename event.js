
class Block{
  constructor(option){
      this.width = option.width;
    this.length = option.length;
    this.num = option.num;
    this.structure = option.structure;
    this.sequence = option.sequence;
    this.init_x = Math.floor((Math.random() * (col_num-this.width+1)));
    this.init_y = 0;
    this.rotate_index = 0;

  }
  display(id, level){

    let div= document.createElement("div");
    div.id = `shape_${this.sequence}`;
    div.className = 'shape_container';
    const shape_container = document.querySelector(`#${id}`);

  shape_container.appendChild(div);
  let border_size = parseFloat(window.getComputedStyle(document.body).getPropertyValue("--rect_border_size"));
  let rect_sideLength =parseFloat(window.getComputedStyle(document.body).getPropertyValue("--rect_sideLength"));
    
    /* return the starting position needed for the shape to be centered relative to the shape container*/ 

    function init_pos(width,length,level){
      let container_width = parseFloat(window.getComputedStyle(shape_container).getPropertyValue("width"));
      let container_height = parseFloat(window.getComputedStyle(shape_container).getPropertyValue("height"));
      if(level === -1){
         return {
    x: (container_width - width * (rect_sideLength + border_size)) / 2,
    y: (container_height  - length * (rect_sideLength + border_size)) / 2
  }
      }
      return {
    x: (container_width - width * (rect_sideLength + border_size)) / 2,
    y: (container_height * level / 4 + (container_height / 4 - length * (rect_sideLength + border_size)) / 2)
  }
    }
  for(let i =0; i< this.length; i++){
    for(let j = 0; j< this.width;j++){
      //zero is false and one is true
      if(this.structure[i][j]){
         let rect = document.createElement('div');
    rect.className = 'rect center black_border';
    rect.innerHTML = `<div class='small_rect'></div>`
    /*
      by setting up the child element be position absolute and the parent element be position relative, the child element is position absolute relative to the parent container now. 
    */
     rect.style.position = 'absolute';
      div.appendChild(rect);
      rect.style.left = j * (rect_sideLength + border_size ) + init_pos(this.width, this.length,level).x+"px";
      rect.style.top = i * (rect_sideLength + border_size) + init_pos(this.width, this.length,level).y + "px";
  }

    }
  }




}
simulate(class_name, is_preview){
  /* clear all the previous selected rects */
  if(class_name ==='selected'){
    document.querySelectorAll('.selected').forEach(ele=>{
      if(!ele.classList.contains("locked"))
        ele.classList.remove('selected')
    });
  };
  if(this.init_y <0){
    window.clearInterval(interval);
    apply_animation();
    has_started = false;
  //  document.querySelectorAll(".selected").forEach(ele=>ele.classList.remove("selected","locked"))
    return;
  }
    for(let i =0; i< this.structure.length;i++){
    for(let j =0; j< this.structure[0].length;j++){
      if(this.structure[i][j]){

        let current_rect =  rects_list[this.init_y + i][this.init_x + j];

       if(current_rect.classList.contains("rects_preview") && !is_preview)
          current_rect.classList.remove("rects_preview");
       
        current_rect.classList.add(class_name);

       
      }
    }
  }
}
row_check(){
  rects_list.forEach((arr,index) =>{
    if(arr.some(ele => !ele.classList.contains("locked")) === false){
      arr.forEach(ele=> ele.classList.remove("locked", "selected"));
      for(let i = index-1; i>0;i--){
        for(let j=0; j< arr.length;j++){
          if(rects_list[i][j].classList.contains("locked")){
            rects_list[i][j].classList.remove("locked","selected")
            rects_list[i+1][j].classList.add('locked',"selected");
          }
        }
      }
    }

  });
}
update(){
  if(check(this.init_x ,this.init_y + 1, this.structure)){
    this.init_y +=1;
    this.simulate("selected");
  }
  else{
     if(this.init_y <0){
          window.clearInterval(interval);
          apply_animation();
          return;
        };
    this.simulate('locked');
    this.row_check();
    this.resetAll();

  }

}
to_left(){
  if(check(this.init_x-1 ,this.init_y, this.structure)){
    this.init_x -=1;
    this.simulate("selected");
    this.to_bottom(false);
  }
}

to_right(){
    if(check(this.init_x+1 ,this.init_y, this.structure)){
    this.init_x +=1;
    this.simulate("selected");
    this.to_bottom(false);
  }

}
to_bottom(go_bottom){
  const orig_y = this.init_y;
  document.querySelectorAll('.rects_preview').forEach(ele=>ele.classList.remove("rects_preview"));
  for(let i =this.init_y; i<=row_num;i++){
          
    if(!check(this.init_x,i,this.structure)){
      this.init_y = i - 1;
      if(!go_bottom){
        this.simulate("rects_preview",true);
        this.init_y = orig_y;

      }
      else{
       if(this.init_y <0){
          window.clearInterval(interval);
          apply_animation();
          return;

        }

         this.simulate("selected");
         this.simulate('locked');
         this.row_check();
         this.resetAll();
      }
      return;

    }
  }
}
to_rotate(){
  if(this.rotate_index < 0) return;
  let new_structure = [];
  for(let i=0; i<this.structure[0].length;i++){
    let subarray = [];
    for(let j=0;j< this.structure.length;j++){

      subarray.push(this.structure[j][i]);
    }
    new_structure.push(subarray)
  }
  this.structure = new_structure;

  new_structure = [];
    if(this.rotate_index > 0){

    for(let i =1; i <= this.structure.length;i++){
    new_structure[this.structure.length - i] = this.structure[i-1]
    }
    this.structure = new_structure;
    this.rotate_index = 0;
  }
  else this.rotate_index = 1;
     this.to_bottom(false);
  this.simulate("selected");

}
resetAll(){

  if(!has_started) return
   this.rotate_index = -1;
   window.clearInterval(interval);

   block_list.shift();
   block_list.push(new Block(block_shape[Math.floor(Math.random() * 6)]) );
   document.querySelectorAll(".shape_container").forEach(ele=>ele.remove());
   for(let i=0; i< block_list.length;i++){
     if(i===0) block_list[i].display("current_shape_preview",-1);
    else block_list[i].display("shape_preview",i-1);


   } 
  block_list[0].simulate("selected")
  block_list[0].to_bottom(false);



  /* why can't be removed?





  */
  //if(!interval)
  interval = setInterval(()=>block_list[0].update(),200)

}

}

function exceed_bottom(init_y, structure){
return init_y + structure.length > row_num;
}
function check(init_x, init_y, structure){

  if(init_x < 0 || init_x + structure[0].length > col_num || exceed_bottom(init_y,structure)) return false;

  for(let i =0; i<structure.length;i++){
    for(let j =0; j< structure[0].length;j++){
      if(structure[i][j] === 1 && rects_list[init_y + i][init_x + j].classList.contains("locked"))
        return false
    }
  }
  return true;

}

document.addEventListener("keydown", event => {
if(has_started){
  if (event.key == " " || event.keyCode == 32) {
    block_list[0].to_bottom(true);
    shaking_effect();
  }
  else if(event.key.toLowerCase() == "a"  || event.keyCode == 97 || event.key == "ArrowLeft" || event.keyCode == 37) {
    block_list[0].to_left();
  }
  else if(event.key.toLowerCase() == "d" || event.keyCode == 100 || event.key == "ArrowRight" || event.keyCode == 39){
    block_list[0].to_right();
  }
  else if(event.key.toLowerCase() == "r" || event.keyCode == 82){
    block_list[0].to_rotate();
  }
}
})

function shaking_effect(){
  table.classList.add("shaking_effect");
  table.addEventListener("animationend",function(){
    table.classList.remove("shaking_effect")
  })
}
