console.log("script.js is loaded successfully!");

// Creating a wrapper element to process all clicks on the page.
var wrapper = document.querySelector(".wrapper");
var initCard = document.querySelector("#init-card");
var timer = document.querySelector("#timerDisp");
var result = document.querySelector("#result");

var timeLeft = 75;
var numQues = 0;
var score = 0;
var scoreList = [];

var questionList = [
    {
        ques: "Which keyword is used to declare a variable in JavaScript?",
        btn1: "1. let",
        btn2: "2. var",
        btn3: "3. const",
        btn4: "4. all of the above",
        ans: "4. all of the above"
    },
    {
        ques: "What is the output of `console.log(typeof [])`?",
        btn1: "1. array",
        btn2: "2. object",
        btn3: "3. null",
        btn4: "4. undefined",
        ans: "2. object"
    },
    {
        ques: "Which method is used to add an item to the end of an array?",
        btn1: "1. push()",
        btn2: "2. append()",
        btn3: "3. add()",
        btn4: "4. insert()",
        ans: "1. push()"
    },
    {
        ques: "Which of the following is NOT a JavaScript data type?",
        btn1: "1. string",
        btn2: "2. boolean",
        btn3: "3. float",
        btn4: "4. undefined",
        ans: "3. float"
    },
    {
        ques: "How do you comment a single line in JavaScript?",
        btn1: "1. <!-- comment -->",
        btn2: "2. // comment",
        btn3: "3. /* comment */",
        btn4: "4. %% comment",
        ans: "2. // comment"
    }
];

// Timer function - it is executed when the Start button is pressed
function startTimer() {
    interval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(interval);
            saveResults();
        }
    }, 1000);
}

// Function to run the quiz
function runQuiz() {
    if (numQues >= questionList.length) {
        saveResults();
        return;
    }

    var q = questionList[numQues];
    initCard.innerHTML = `
        <h3>${q.ques}</h3>
        <button class="btn">${q.btn1}</button>
        <button class="btn">${q.btn2}</button>
        <button class="btn">${q.btn3}</button>
        <button class="btn">${q.btn4}</button>
    `;
}

// Function to save users' scores and initials
function saveResults() {
    clearInterval(interval);
    initCard.innerHTML = `
        <h3>Quiz Over!</h3>
        <p>Your score: ${score}</p>
        <input type="text" id="userInitials" placeholder="Enter initials">
        <button class="btn" id="submitScore">Submit</button>
    `;
}

// Function to get the score list
function getScoreListString(link) {
    var storedList = JSON.parse(localStorage.getItem("scoreList")) || [];
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        var y = i + 1;
        if (!link)
            values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
            values += y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";
    }

    return values;
}

// ✅ Fixed: `getResults()` function now has its closing `}`
function getResults(btnValue) {
    var correct = questionList[numQues].ans;
    if (btnValue === correct) {
        result.textContent = "Correct!";
        score += 10;
    } else {
        result.textContent = "Wrong!";
    }

    // Move to the next question
    numQues++;
    setTimeout(runQuiz, 1000);
}

// Function to show results list
function showResults() {
    var storedList = JSON.parse(localStorage.getItem("scoreList")) || [];
    var values = storedList.map((entry, i) => `${i + 1}. ${entry.initials} - ${entry.score}`).join("<br>");
    initCard.innerHTML = `<h3>High Scores</h3><p>${values}</p>
        <button class="btn" id="goBack">Go Back</button>
        <button class="btn" id="clearScores">Clear High Scores</button>`;
}

// Event listener for clicks
wrapper.addEventListener("click", function (event) {
    var element = event.target;
    event.preventDefault();

    if (element.innerHTML === "View High Scores") {
        showResults();
    } else if (element.innerHTML === "Start") {
        startTimer();
        runQuiz();
    } else if (element.innerHTML === "Submit") {
        var initialsInput = document.querySelector("#userInitials");
        if (initialsInput) {
            var userScore = {
                initials: initialsInput.value.trim(),
                score: score
            };
            scoreList.push(userScore);
            localStorage.setItem("scoreList", JSON.stringify(scoreList));
            showResults();
        }
    } else if (element.innerHTML === "Go Back") {
        location.reload();
    } else if (element.innerHTML === "Clear High Scores") {
        localStorage.removeItem("scoreList");
        showResults();
    } else {
        getResults(element.innerHTML);
    }
});

// Initialize the quiz
function init() {
    initCard.innerHTML = `
        <p>Click Start button to start the timed quiz. A wrong answer will not deduct time from the timer.</p>
        <button class="btn">Start</button>
    `;
    timer.textContent = "Time: " + timeLeft + "s";
}

// Call init
init();

