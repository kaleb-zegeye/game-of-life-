const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 800;
canvas.height = 800;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildGrid() {
    const box = new Array(COLS).fill(null);
    for (let i = 0; i < box.length; i++) {
        box[i] = new Array(ROWS).fill(null);
    }
    for (let col = 0; col < box.length; col++) {
        for (let row = 0; row < box[col].length; row++) {
          box[col][row] = Math.floor(Math.random() *2);


        }}

    return box;
}


canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / resolution);
    const row = Math.floor(y / resolution);

    if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
        grid[col][row] = 1;
        drawRect(1, col * resolution, row * resolution, resolution, resolution);
    }
});

/**requestAnimationFrame(update);
let grid = buildGrid();
function update() {
  grid = nextGen(grid);
  render(grid);
  requestAnimationFrame(update);
}
**/

let grid = buildGrid();
render(grid);

let animationId;
let isRunning = false;

function startLife() {
    if (isRunning) return; // Prevent starting multiple animations
    isRunning = true;
    
    function update() {
        grid = nextGen(grid);
        render(grid);
        animationId = requestAnimationFrame(update);
    }

    animationId = requestAnimationFrame(update);
}

function stopLife() {
    isRunning = false;
    cancelAnimationFrame(animationId);
}

document.getElementById('start').addEventListener('click', startLife);
document.getElementById('stop').addEventListener('click', stopLife);



function nextGen(grid) {
  const nextGen = grid.map(arr => [...arr]);
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x_cell = col + i;
          const y_cell = row + j;

          if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }

      // rules
      if (cell === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}


function drawRect(theCell , xp, yp, W , H) {

    ctx.beginPath();
    ctx.rect(xp, yp, W, H);
    ctx.fillStyle = theCell ? 'black' : 'white';
    ctx.fill();
    ctx.stroke();
}
function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      

      drawRect(cell , col*resolution ,row* resolution ,resolution, resolution);
    }
  }
}