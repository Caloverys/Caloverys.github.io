
let interval;

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
const  block_list = [];


//const table = document.querySelector('#main_table');




