let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true; // Will keep track of player`s turn

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;   // Reset the turn to O
    enableBoxes(); // Enable all boxes
    msgContainer.classList.add("hide"); // Hide the message container
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    })
}

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, Winner is ${winner}!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerHTML = "It`s a Draw!! Try Again!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkDraw = () => {
    let draw = true; // Assume it's a draw until proven otherwise
    boxes.forEach((box) => {
        if (box.innerHTML === "") {
            draw = false; // If any box is empty, it's not a draw
        }
    })

    if (draw) {
        showDraw();
    }
}

const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" &&
            pos1Val === pos2Val &&
            pos2Val === pos3Val) {
            showWinner(pos1Val);
            return true; // Winner found to prevent checkDraw() from being called
        }
    }
    return false; // No winner found, so that checkDraw() can be called
}

boxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
        box.style.cursor = "pointer";
    })
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "blue";
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;

        let victory = checkWinner();
        if (!victory) {
            checkDraw();  // Check for a draw only if no winner is found
        }

    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

