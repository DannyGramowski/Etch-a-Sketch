export class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

export class ColorAnimation {
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

export let red = new Color(255, 0, 0);
export let orange = new Color(255, 187, 0);
export let yellow = new Color(255, 255, 0);
export let green = new Color(0, 255, 0);
export let blue = new Color(0, 0, 255);
export let purple = new Color(140, 0, 255);
export let pink = new Color(255, 0, 255);
export let white = new Color(255, 255, 255);
export let black = new Color(0, 0, 0);
export let grey = new Color(130, 130, 130);



//https://www.cuemath.com/linear-interpolation-formula/
export function lerp(from, to, percent) {
    let r = lerpSingle(from.r, to.r, percent);
    let g = lerpSingle(from.g, to.g, percent);
    let b = lerpSingle(from.b, to.b, percent);
    function lerpSingle(a, b, percent) {
        return a + percent * (b - a)
    }
    return new color(r, g, b);
}

export function convert(colorString) {
    let output = [];
    let split = colorString.split('(')[1].split(')')[0].split(',');
    split.forEach(element => {
        output.push(element.trim());
    });

    return new color(output[0], output[1], output[2]);
}

export function colorToStr(clr) {
    if(clr == null) return "null";
    return `rgb(${clr.r}, ${clr.g}, ${clr.b})`;
}