// Set up 8x8 grid
let grid = document.querySelector(".grid");

// ****************** //
//     Functions      //
// ****************** //
function clearGrid() {
    while (grid.firstChild)
        grid.removeChild(grid.firstChild);
}

function setupInputButton() {
    let button = document.querySelector("button");
    button.addEventListener("click", (e) => {
        let userInput = document.querySelector("#numSquaresPerSide");    
        let numSquaresPerSide = userInput.value;
        if (numSquaresPerSide > 100)
            alert(`${numSquaresPerSide} is too large. Please enter a number between 1-100.`);
        else if (numSquaresPerSide < 1)
            alert(`${numSquaresPerSide} is too small. Please enter a number between 1-100.`);
        else if (isNaN(numSquaresPerSide))
            alert(`${numSquaresPerSide} is not a number. Please enter a number between 1-100.`);
        else {
            clearGrid();
            addSquares(numSquaresPerSide);
        }
    });
}

function addSquares(numSquaresPerSide) {
    // setup square style
    let gridSideLength = grid.offsetWidth;
    let squareLength = gridSideLength / numSquaresPerSide;
    const gridSquareStyle = {
        width: `${squareLength}px`,
        height: `${squareLength}px`,
    };

    // add the squares to the grid
    let numSquares = numSquaresPerSide * numSquaresPerSide;
    for (let i = 0; i < numSquares; i++) {
        const gridSquare = document.createElement("div");
        for (let style in gridSquareStyle)
            gridSquare.style[style] = gridSquareStyle[style];

        let mouseOverFunction = function () {
            if (!this.style.backgroundColor) {
                this.style.backgroundColor = getRandomRGB();
                this.style.opacity = 0.1;
            }
            else {
                this.style.opacity = Number(this.style.opacity) + 0.1;
            }
            
        };
        gridSquare.onmouseover = mouseOverFunction;
        // Note: the below also works
        // gridSquare.addEventListener("mouseover", (e) => {
        //     e.target.style.backgroundColor = "gray";
        // });

        grid.appendChild(gridSquare);
    }
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function getRandomRGB() {
    const r = getRandomIntInclusive(0, 255);
    const g = getRandomIntInclusive(0, 255);
    const b = getRandomIntInclusive(0, 255);
    const rgb = `rgb(${r},${g},${b})`
    return rgb;
}

// ****************** //
//       Main         //
// ****************** //
let initialSquaresPerSide = 8;
setupInputButton();
addSquares(initialSquaresPerSide);