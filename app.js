let boxes = document.querySelectorAll(".box");
let resetbttn = document.querySelector("#reset-bttn");
let newGamebttn = document.querySelectorAll("#new-bttn");
let mssgContainer = document.querySelector(".mssg-container");
let drawcontainer = document.querySelector(".draw-container");
let mssg = document.querySelector("#mssg");
let contain = document.querySelector(".FullGame");

contain.classList.remove("hide");

let track_turnO = true;     // PlayerO and PlayerX
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
];

const resetGame = () => {

    contain.classList.remove("hide");
    track_turnO = true;
    enableBoxes();
    mssgContainer.classList.add("hide");
    drawcontainer.classList.add("hide");
    count=0;

};

boxes.forEach((box) => {
    box.addEventListener("click", (event) => {
        if(track_turnO)                
        {
            event.target.style.color = "#b0413e";                    // PlayerO turn - Red Circle
            box.innerText = "O";
            track_turnO = false;
        }

        else
        {
            event.target.style.color = "#31d810";                   // PlayerX turn - Green Cross
            box.innerText = "X";
            track_turnO = true;
        }

        count++;
        box.disabled = true;                // Disabling the button, so to make stagnant that game move

        checkWinner();
        if(count === 9)       gameIsDraw();

    });

    
// checkWinner();
// The check statement already executed 9 times before click event. As it is outsie the scope of Event Listener 
// and Event will only get executed at the time of click the one which is inside the EventListener works properly

});


const enableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
};

const showWinner = (winner) => {

    contain.classList.add("hide");
    mssg.innerText =  `Congratulations! Winner is Player${winner}`;
    drawcontainer.classList.add("hide");
    mssgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos1Val === pos2Val && pos2Val === pos3Val)
        {
            showWinner(pos1Val);
        }
    }
};

const gameIsDraw = () => {

    contain.classList.add("hide");
    mssgContainer.classList.add("hide");
    drawcontainer.classList.remove("hide");
};

 resetbttn.addEventListener("click", resetGame);

 newGamebttn.forEach((newbttn) => {
    newbttn.addEventListener("click", resetGame);
 });


 // Mouse Hover Functionalities : 

 newGamebttn.forEach((newbttn) => {
    newbttn.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "grey";

        setTimeout(() => {
            event.target.style.backgroundColor = "";
        }, 500);           //0.5s delay
    });
 });

 
resetbttn.addEventListener("mouseover", (event) => {
    event.target.style.backgroundColor = "grey";

    setTimeout(() => {
        event.target.style.backgroundColor = "";
    }, 500);           //0.5s delay
});


boxes.forEach((box) => {
    box.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "white";

        setTimeout(() => {
            event.target.style.backgroundColor = "";
        }, 400);           //0.4s delay
    });
 });
