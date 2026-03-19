let maxRange = 100;
let randomNumber = Math.floor(Math.random() * maxRange) + 1;
let attempts = 0;

const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const bestScoreText = document.getElementById("bestScore");

let bestScore = localStorage.getItem("bestScore");
if(bestScore){
    bestScoreText.innerText = bestScore;
}

// Guess logic
document.getElementById("guessBtn").onclick = function(){

let guess = Number(document.getElementById("guessInput").value);
if(!guess) return;

attempts++;
attemptsText.innerText = attempts;

let diff = Math.abs(randomNumber - guess);

// 🎯 Level based hints
if(guess === randomNumber){
    message.innerText = "🎉 Correct!";

    if(!bestScore || attempts < bestScore){
        localStorage.setItem("bestScore", attempts);
        bestScoreText.innerText = attempts;
    }
}
else{
    if(maxRange == 50){ 
        // Easy → strong hints
        if(diff <= 5) message.innerText = "🔥 Very close!";
        else if(guess > randomNumber) message.innerText = "Too high";
        else message.innerText = "Too low";
    }
    else if(maxRange == 100){
        // Medium → normal hints
        if(diff <= 3) message.innerText = "Close!";
        else if(guess > randomNumber) message.innerText = "Too high";
        else message.innerText = "Too low";
    }
    else{
        // Hard → minimal hints
        if(guess > randomNumber) message.innerText = "High";
        else message.innerText = "Low";
    }
}

};

// Restart
document.getElementById("restartBtn").onclick = function(){
attempts = 0;
attemptsText.innerText = 0;
message.innerText = "";

randomNumber = Math.floor(Math.random() * maxRange) + 1;
};

// Level change
document.getElementById("level").onchange = function(){
maxRange = this.value;

document.getElementById("rangeText").innerText = 
`Guess a number between 1 and ${maxRange}`;

randomNumber = Math.floor(Math.random() * maxRange) + 1;
};

// Theme toggle with icon change
document.getElementById("themeBtn").onclick = function(){
document.body.classList.toggle("light");

this.innerText = document.body.classList.contains("light") ? "☀️" : "🌙";
};