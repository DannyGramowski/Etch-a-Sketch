import * as clr from './ColorUtil.js';
import * as display from './DisplayUtil.js';

const toolKit = document.querySelector('.tool-kit');
const toolkitColors = document.querySelector('.tool-kit-colors');
let displayWidth = 150;
let displayHeight = 150;
let toolBoxWidth = 3;
let toolBoxButtonSize = 30;
let defaultColor = new clr.Color(120, 238, 238);
let drawColor;
let cells = [];
let brushSize = 2;//subtract 0.1 to get rid of ugly one pixel outer rim

const gridContainer = document.querySelector('.grid-holder');
gridContainer.style.backgroundColor = 'rgb(0, 0, 0)';

createCells();
 
createToolKit();


let mouseDown = false;
document.body.onmousedown = (evt) => mouseDown = true;
document.body.onmouseup = (evt) => mouseDown = false;




function createCells() {
    gridContainer.style['grid-template-columns'] = setAutos(displayWidth);
    gridContainer.style['grid-template-rows'] = setAutos(displayHeight);
    
    clearCells();
    for (let i = 0; i < displayHeight; i++) {
        let arr = [];
        for (let j = 0; j < displayWidth; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = clr.colorToStr(defaultColor);
            cell.addEventListener('mouseenter', () => {
                draw(cell, i, j);
            });
            // cell.addEventListener('mouseleave', () => {
            //     cell.style.backgroundColor = clr.colorToStr(defaultColor);
            // });
            gridContainer.append(cell);
            arr.push(cell);
        }
        cells.push(arr);
    }
}

function clearCells() {
    cells = [];
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
    toolKit.style.width = toolBoxWidth * toolBoxButtonSize + "px";
    createColorButtons();
    document.querySelector(".eraser").onclick = () => drawColor = defaultColor;
}

function createColorButtons() {
    const colors = [clr.red, clr.orange, clr.yellow, clr.green, clr.blue, clr.purple, clr.pink, clr.white, clr.black, clr.grey]
    toolkitColors.style.height = Math.ceil(colors.length / toolBoxWidth) * toolBoxButtonSize + "px"; 
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

function draw(cell, x, y) {
    console.log("draw " + x + " " + y);
    if(mouseDown && drawColor != null){
        brush(y, x, brushSize - 0.1, (cell) => {cells[cell.y][cell.x].style.background = clr.colorToStr(drawColor)});
        //cell.style.backgroundColor = clr.colorToStr(drawColor);
    }
}

function brush(centerX, centerY, radius, func) {
    //let affectedCells = [];
    brushRecursion(new display.Coordinate(centerX, centerY), new display.Coordinate(centerX, centerY), radius, func, new Set());

    // for(let y = -radius; y < radius; y++) {
    //     let xRange = Math.floor(Math.sqrt(radius*radius - y*y));
    //     for(let x = -xRange; x <= xRange; x++) {
    //         if(0 <= x < displayWidth && 0 <= y < displayHeight) {
    //             func(cells[centerY + y][centerX + x]);
    //         }
    //     }
    // }
}

function brushRecursion(centerCoord, currCoord, radius, func, set) {
    if(currCoord.distance(centerCoord) > radius || set.has(currCoord.hash())) return;

    console.log("set " + currCoord.x + " " + currCoord.y + " to red");
    func(currCoord);
    set.add(currCoord.hash());
    if(currCoord.x != displayWidth - 1)brushRecursion(centerCoord, new display.Coordinate(currCoord.x + 1, currCoord.y), radius, func, set);
    if(currCoord.x != 0)brushRecursion(centerCoord, new display.Coordinate(currCoord.x - 1, currCoord.y), radius, func, set);
    if(currCoord.y != displayWidth - 1)brushRecursion(centerCoord, new display.Coordinate(currCoord.x, currCoord.y + 1), radius, func, set);
    if(currCoord.y != 0)brushRecursion(centerCoord, new display.Coordinate(currCoord.x, currCoord.y - 1), radius, func, set);
}



