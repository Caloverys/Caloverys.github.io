 
class Block{
  constructor(option){
    this.width = option.width;
    this.length = option.length;
    this.num = option.num;
    this.structure = option.structure;
    this.sequence = option.sequence;

  }
  drop(){

  }
  display(init_pos_X, init_pos_Y, level){

    let div= document.createElement("div");
    div.id = `shape_${this.sequence}`;
    div.className = 'shape_container';
const shape_container = document.querySelector('#shape_preview');

  shape_container.appendChild(div);
  let border_size = parseFloat(window.getComputedStyle(document.body).getPropertyValue("--rect_border_size"));
  let rect_sideLength =parseFloat(window.getComputedStyle(document.body).getPropertyValue("--rect_sideLength"));
    function init_pos(width,length,level){
      let container_width = parseFloat(shape_container.getBoundingClientRect().width);
      let container_height = parseFloat(shape_container.getBoundingClientRect().height);

console.log(container_height, length, rect_sideLength)
      return {
        //console.log()
    x: (container_width - width * rect_sideLength) / 2,
    y: (container_height * level / 5 + (container_height / 5 - length * rect_sideLength) / 2)
  }
    }
console.log(this.length, this.width)
  for(let i =0; i< this.length; i++){
    for(let j = 0; j< this.width;j++){
      //zero is false and one is true
    //  console.log(this.structure[i][j])
      if(this.structure[i][j]){
          // console.log('sjs')
         let rect = document.createElement('div');
    rect.className = 'rect center';
    rect.innerHTML = `<div class='small_rect'></div>`
    /*
      by setting up the child element be position absolute and the parent element be position relative, the child element is position absolute relative to the parent container now. 
    */
     rect.style.position = 'absolute';
     console.log(this.width, this.length,level+1)
      div.appendChild(rect);
      rect.style.left = j * (rect_sideLength + border_size ) + init_pos(this.width, this.length,level+1).x+"px";
      rect.style.top = i * (rect_sideLength + border_size) + init_pos(this.width, this.length,level+1).y + "px"
      console.log(i * (rect_sideLength + border_size) + init_pos(this.width, this.length,level+1).y )
  }

    }
  }


}



  

}

