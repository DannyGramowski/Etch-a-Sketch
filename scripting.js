let x = 10;
let y = 10;

const button = document.querySelector('button');
button.onclick = () => {
    let str = prompt("please enter a size", `${x} ${y}`).split(' ');
    x = parse(str[0]);
    y = parse(str[1]);
    createCells();
}

const gridContainer = document.querySelector('.grid-holder');


createCells();


function parse(str) {
    let num = parseInt(str);
    if(num > 100) num = 100;
    return num;
}

function clearCells() {
    while(gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }    
}

function createCells() {
    gridContainer.style['grid-template-columns'] = setAutos(x);
    gridContainer.style['grid-template-rows'] = setAutos(y);
    clearCells();
    for(let i = 0; i < y; i++) {
        for(let j = 0; j < x; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('mouseenter', () => {
                cell.style.backgroundColor = 'red';
            });
            cell.addEventListener('mouseleave', () => {
                cell.style.backgroundColor = 'lightcyan';
            });
            gridContainer.append(cell);
        }
    }
}

function setAutos(len) {
    let output = "";
    for(let i = 0; i < len; i++) {
        output += "auto ";
    }
    return output.trimEnd();
}

