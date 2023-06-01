
class Block{
  constructor(option){
    this.width = option.width;
    this.length = option.length;
    this.num = option.num;
    this.structure = option.structure;
    this.sequence = option.sequence;
    this.init_x = Math.floor((Math.random() * (col_num-this.width+1)));
    this.init_y = 0;

  }
  display(level){

    let div= document.createElement("div");
    div.id = `shape_${this.sequence}`;
    div.className = 'shape_container';

  shape_container.appendChild(div);
  let border_size = parseFloat(window.getComputedStyle(document.body).getPropertyValue("--rect_border_size"));
  let rect_sideLength =parseFloat(window.getComputedStyle(document.body).getPropertyValue("--rect_sideLength"));
    
    /* return the starting position needed for the shape to be centered relative to the shape container*/ 

    function init_pos(width,length,level){
      let container_width = parseFloat(window.getComputedStyle(shape_container).getPropertyValue("width"));
      let container_height = parseFloat(window.getComputedStyle(shape_container).getPropertyValue("height"));

      return {
    x: (container_width - width * (rect_sideLength + border_size)) / 2,
    y: (container_height * level / 5 + (container_height / 5 - length * (rect_sideLength + border_size)) / 2)
  }
    }
  for(let i =0; i< this.length; i++){
    for(let j = 0; j< this.width;j++){
      //zero is false and one is true
      if(this.structure[i][j]){
          // console.log('sjs')
         let rect = document.createElement('div');
    rect.className = 'rect center';
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

this.simulate("selected");


}
simulate(class_name){
  /* clear all the previous selected rects */
  if(class_name ==='selected'){
    document.querySelectorAll('.selected').forEach(ele=>ele.classList.remove('selected'));
  }
    for(let i =0; i< this.structure.length;i++){
    for(let j =0; j< this.structure[0].length;j++){
      if(this.structure[i][j]){
        rects_list[this.init_y + i][this.init_x + j].classList.add(class_name)
      }
    }
  }
}
update(){
  if(check(this.init_x ,this.init_y + 1, this.structure)){
    this.init_y +=1;
    this.simulate("selected");
  }
  else{
    this.simulate("locked");
    window.clearInterval(interval);

  }



}
left_move(){
  if(check(this.init_x-1 ,this.init_y, this.structure)){
    this.init_x -=1;
    this.simulate("selected");
  }
}
right_move(){
    if(check(this.init_x+1 ,this.init_y, this.structure)){
    this.init_x +=1;
    this.simulate("selected");
  }

}

}

function check(init_x, init_y, structure){

  if(init_x < 0 || init_x + structure[0].length > col_num || init_y + structure.length > row_num ) return false;
  for(let i =0; i<  structure.length;i++){
    for(let j =0; j< structure[0].length;j++){
      if(structure[i][j] && rects_list[init_y + i][init_x + j].classList.contains("locked"))
        return false
    }
  }
  return true;

}

