let interval,timeout,current_block;
let has_stopped = false;
let has_started = false;
const current_shape_list = [];
 const shape_container = document.querySelector("#shape_preview");
const rects_list = [] ;
function retrieve_dimension(name) {
  let div = document.createElement('div');
let interval;

const current_shape_list = [];
 const shape_container = document.querySelector("#shape_preview");
let rects_list = [] ;
function retrieve_dimension(name) {
  let div = document.createElement('div');
  div.id = name;
  document.body.appendChild(div);
  let dim = div.getBoundingClientRect();
  div.remove();
  return {
    height: dim.height,
    width: dim.width
  };
}
const block_shape=[
  {
    sequence: 1, 
    // nums of rect on the x axis
    width:3,
    // num of rects on the y axis
    length:2,
    //the num of rects
    num:4,
    structure:[
      [0,1,0],
      [1,1,1]
      ],
  }, 
  {
    sequence: 2, 
    width:3,
    length:2,
    num:4,
    structure:[
      [1,0,0],
      [1,1,1]
      ]
  }, 
  {
    sequence: 3, 
    width:2,
    length:2,
    num:4,
    structure:[
      [1,1],
      [1,1]
      ]
  }, 
  {
    sequence: 4, 
    width:3,
    length:2,
    num:4,
    structure:[
      [0,0,1],
      [1,1,1]
      ]
  },
  {
    sequence: 5, 
    width:3,
    length:2,
    num:4,
    structure:[
      [1,1,0],
      [0,1,1]
      ]
  },
  {
    sequence: 6, 
    width:4,
    length:1,
    num:4,
    structure:[
      [1,1,1,1]
      ]
  }
];

const table = document.querySelector('#main_table');
let row_num = 24;
let col_num = 12;
let preview_num = 5;
const  block_list = [];


//const table = document.querySelector('#main_table');





  div.id = name;
  document.body.appendChild(div);
  let dim = div.getBoundingClientRect();
  div.remove();
  return {
    height: dim.height,
    width: dim.width
  };
}
const block_shape=[
  {
    sequence: 1, 
    // nums of rect on the x axis
    width:3,
    // num of rects on the y axis
    length:2,
    //the num of rects
    num:4,
    structure:[
      [0,1,0],
      [1,1,1]
      ],
  }, 
  {
    sequence: 2, 
    width:3,
    length:2,
    num:4,
    structure:[
      [1,0,0],
      [1,1,1]
      ]
  }, 
  {
    sequence: 3, 
    width:2,
    length:2,
    num:4,
    structure:[
      [1,1],
      [1,1]
      ]
  }, 
  {
    sequence: 4, 
    width:3,
    length:2,
    num:4,
    structure:[
      [0,0,1],
      [1,1,1]
      ]
  },
  {
    sequence: 5, 
    width:3,
    length:2,
    num:4,
    structure:[
      [1,1,0],
      [0,1,1]
      ]
  },
  {
    sequence: 6, 
    width:4,
    length:1,
    num:4,
    structure:[
      [1,1,1,1]
      ]
  }
];

const table = document.querySelector('#main_table');
let row_num = 24;
let col_num = 12;
let preview_num = 5;
let drop_speed = 200000;
let block_list = [];



//const table = document.querySelector('#main_table');



function classList_remove(name){
  if(!Array.isArray(name)){
    document.querySelectorAll(`.${name}`).forEach(ele=>ele.classList.remove(name));
    return;
  }
  name.forEach(i=>{
    document.querySelectorAll(`.${i}`).forEach(ele=>ele.classList.remove(i));

  })
}

function display_block(){
  for(let i=0; i< block_list.length;i++){
     if(i===0) block_list[i].display("current_shape_preview",-1);
    else block_list[i].display("shape_preview",i-1);
   } 

}

function exceed_bottom(init_y, structure){
return init_y + structure.length > row_num;
}


function check(init_x, init_y, structure){


  if(init_x < 0 || init_y < 0 || init_x + structure[0].length > col_num || exceed_bottom(init_y,structure)){
    debugger
return false;
  } 
  for(let i =0; i<structure.length;i++){
    for(let j =0; j< structure[0].length;j++){
      if(structure[i][j] === 1 && rects_list[init_y + i][init_x + j].classList.contains("locked"))
        return false
    }
  }
  return true;

}



function shaking_effect(){

  document.querySelector("#section_2").classList.add("down_effect");
  setTimeout(()=> document.querySelector("#section_2").classList.remove("down_effect"),75)
}


function check_first_row(element){
  if(rects_list[0].some(ele=>ele.classList.contains("locked"))){
   has_started = false;
     window.clearInterval(interval);
   element.simulate("red_theme");
   localStorage.clear();

    apply_animation(true);

     return false;
  }
  return true;


}
