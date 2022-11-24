class color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class ColorAnimation {
    constructor(cell) {
        this.cell = cell;
        this.color = hoverColor;
        this.percent = 0;
    }

    update(params) {
        this.color = lerp(this.color, defaultColor, this.percent);
        this.percent += 0.02;
        this.cell.style.backgroundColor = colorToStr(this.color);
    }

    isDone() {
        return this.percent >= 1;
    }
}

let x = 65;
let y = 65;
let hoverColor = new color(255, 0, 0)
let defaultColor = new color(120, 238, 238);

let animations = [];

const button = document.querySelector('button');
button.onclick = () => {
    let str = prompt("please enter a size", `${x} ${y}`).split(' ');
    x = parse(str[0]);
    y = parse(str[1]);
    createCells();
}

const gridContainer = document.querySelector('.grid-holder');
gridContainer.style.backgroundColor = 'rgb(0, 0, 0)';

createCells();

for (let i = 1; i <= 10; i++) {
    console.log(colorToStr(lerp(hoverColor, defaultColor, 1 / 10 * i)))
}

function updateAnimations() {
    for(let i = animations.length - 1; i >= 0; i--) {
        animations[i].update();
        if(animations[i].isDone()) {
            animations.splice(i, 1);
        }
    }
}

function parse(str) {
    let num = parseInt(str);
    if (num > 100) num = 100;
    return num;
}

function clearCells() {
    while (gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function createCells() {
    gridContainer.style['grid-template-columns'] = setAutos(x);
    gridContainer.style['grid-template-rows'] = setAutos(y);
    clearCells();
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = colorToStr(defaultColor);
            cell.addEventListener('mouseenter', () => {
                cell.style.backgroundColor = 'red';
                //check if thing has animation
                animations.push(new ColorAnimation(cell));
                updateAnimations();
            });
            cell.addEventListener('mouseleave', () => {
                cell.style.backgroundColor = colorToStr(defaultColor);
            });
            gridContainer.append(cell);
        }
    }
}

function setAutos(len) {
    let output = "";
    for (let i = 0; i < len; i++) {
        output += "auto ";
    }
    return output.trimEnd();
}



//https://www.cuemath.com/linear-interpolation-formula/
function lerp(from, to, percent) {
    let r = lerpSingle(from.r, to.r, percent);
    let g = lerpSingle(from.g, to.g, percent);
    let b = lerpSingle(from.b, to.b, percent);
    function lerpSingle(a, b, percent) {
        return a + percent * (b - a)
    }
    return new color(r, g, b);
}

function convert(colorString) {
    let output = [];
    let split = colorString.split('(')[1].split(')')[0].split(',');
    split.forEach(element => {
        output.push(element.trim());
    });

    return new color(output[0], output[1], output[2]);
}

function colorToStr(clr) {
    return `rgb(${clr.r}, ${clr.g}, ${clr.b})`;
}


