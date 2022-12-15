import * as clr from './ColorUtil.js';

const toolKit = document.querySelector('.tool-kit');
const toolkitColors = document.querySelector('.tool-kit-colors');
let displayWidth = 100;
let displayHeight = 100;
let toolBoxWidth = 3;
let toolBoxButtonSize = 30;
let defaultColor = new clr.Color(120, 238, 238);
let drawColor;

const gridContainer = document.querySelector('.grid-holder');
gridContainer.style.backgroundColor = 'rgb(0, 0, 0)';

createCells();

createToolKit();

let mouseDown = false;
document.body.onmousedown = function(evt) {
    console.log("mouse down");
    mouseDown = true;}
document.body.onmouseup = (evt) => mouseDown = false;

function createCells() {
    gridContainer.style['grid-template-columns'] = setAutos(displayWidth);
    gridContainer.style['grid-template-rows'] = setAutos(displayHeight);
    clearCells();
    for (let i = 0; i < displayHeight; i++) {
        for (let j = 0; j < displayWidth; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = clr.colorToStr(defaultColor);
            cell.addEventListener('mouseenter', () => {
                console.log("button doown " + mouseDown + " draw color " + clr.colorToStr(drawColor));
                if(mouseDown && drawColor != null){
                    cell.style.backgroundColor = clr.colorToStr(drawColor);
                }
            });
            // cell.addEventListener('mouseleave', () => {
            //     cell.style.backgroundColor = clr.colorToStr(defaultColor);
            // });
            gridContainer.append(cell);
        }
    }
}

function clearCells() {
    while (gridContainer.lastChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
}

function setAutos(len) {
    let output = "";
    for (let i = 0; i < len; i++) {
        output += "auto ";
    }
    return output.trimEnd();
}

function createToolKit() {
    toolKit.width = toolBoxWidth * toolBoxButtonSize;
    createColorButtons();
}

function createColorButtons() {
    const colors = [clr.red, clr.orange, clr.yellow, clr.green, clr.blue, clr.purple, clr.pink, clr.white, clr.black, clr.grey]
    toolkitColors.height = Math.ceil(colors.length / toolBoxWidth) * toolBoxButtonSize; 
    for(const c of colors) {
        let color = document.createElement('button');
        color.style.width = toolBoxButtonSize.toString() + "px";
        color.style.height = toolBoxButtonSize.toString() + "px";
        color.className = "tool color"
        color.style.background = clr.colorToStr(c);
        color.onclick = () => {
            console.log("clicked " + clr.colorToStr(c));
            drawColor = c;
        }
        toolkitColors.append(color);
    }
}



