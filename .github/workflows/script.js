console.log("script.js is loaded successfully!");

//Creatign a wrapper element to process all clicks on the page.
var wrapper = document.querySelector(".wrapper");
//start Button
var startBtn = null;
// variable for putting initial message with Start button and then the multiple choice questions dynamically
var initCard = document.querySelector("#init-card");
//Timer display
var timer = document.querySelector("#timerDisp");
//variable to to display result of each question as correct or wrong
var result = document.querySelector("#result");
//variable to store user entered initials
var initials = null;
//Variable to keep track of timer.  Each round get 75 seconds
var timeLeft = 75;
//Variable to keep track of number of questions
var numQues = 0;
//Variable to keep track of the score
var score = 0;
//Array to store (initials, score) pair in Local storage
var scoreList = [];

//array to store all the questions, theirs choices of answers and correct answer
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

//Timer function  - it is executed when Start button is pressed
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

//Function to run the quiz
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


// Function to save users score and initial - this is called when Timer is done or all the questions are done and timer is set to zero.
function saveResults() {
    clearInterval(interval);
    initCard.innerHTML = `
        <h3>Quiz Over!</h3>
        <p>Your score: ${score}</p>
        <input type="text" id="userInitials" placeholder="Enter initials">
        <button class="btn" id="submitScore">Submit</button>
    `;
}

//Get the list of Initials and score from Local Storage to display high scores from previous runs
//if link = true, we need to create a display string for alert popup when View High Score lin is clicked
//If link = false, we need to createa string to display high score on the card in the apge.
function getScoreListString(link) {
    //get stored initial/score pair from local storage
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        var y = i+1;
        if(!link)
         values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
        values +=  y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";

    }

    return values;
}

//Function to calculate if the user selected correct response
function getResults(btnValue) {
    var correct = questionList[numQues].ans;
    if (btnValue === correct) {
        result.textContent = "Correct!";
        score += 10;
    } else {
        result.textContent = "Wrong!";
        timeLeft -= 10;
    }

//Function to show results list in the card on the page
function showResults() {
    var storedList = JSON.parse(localStorage.getItem("scoreList")) || [];
    var values = storedList.map((entry, i) => `${i + 1}. ${entry.initials} - ${entry.score}`).join("<br>");
    initCard.innerHTML = `<h3>High Scores</h3><p>${values}</p><button class="btn" id="goBack">Go Back</button><button class="btn" id="clearScores">Clear High Scores</button>`;
}

//main Event listener for warpper element - it will parse all the clicks for links and various buttons on the page
wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();

    if (element.innerHTML === "View High Scores") {  //View High Scores
        console.log("View high score clicked");

        //YOUR CODE

        alert(newValues);

    } else if (element.innerHTML === "Start") { //Start Button
        console.log("Start button clicked");

        //start the timer when start button is clicked
        startTimer();

    } else if (element.innerHTML === "Submit") { //Submit Button

        console.log("Submit clicked");

        //userScore object to store scores in local storage
        var userScore = {
            initials: initials.value.trim(),
            score: score
        };

        //add the latest userScore to the ScoreList
        scoreList[scoreList.length] = userScore;

        //weite scoreList to local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));

        //show all the scores stored in local storage so far
        showResults();

    } else if (element.innerHTML === "Go Back") { //Go back

        console.log("Go Back clicked");

        //This will go back to the beginning and sets all the variables to their initial value before reloading the page

        //YOUR CODE

       location.reload();

    } else if (element.innerHTML === "Clear high Scores") {  //Clear High Score Button
 
        console.log("Clear High Score clicked");

       //empty out the scoreList
        scoreList.splice(0, scoreList.length);
        //store in local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        //clear out the display on page
        initCard.innerHTML = "<b>High Scores:</b><br><span></span>\n <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";

    } else if (element.innerHTML !== "Start") {       //Any of the Answer Button 

        console.log("One of the answer button clicked");

        //Return if all questions are done
if (numQues >= questionList.length) {
    saveResults();
    return;
}

// Check if answer is correct or wrong
answer = getResults(element.innerHTML);

// Answer is correct
if (answer) {
    result.textContent = "Correct!";
} else { // Answer is wrong
    result.textContent = "Wrong!";
}

// Move to next question
numQues++;
setTimeout(runQuiz, 1000);


    } else {
        console.log("Ignore redundant clicks.");
    }
})


//Main fucntion
//It setups up the start message
//Also initialize the scoreList for the session with any initial/scores pairs stored in local storage from previous sessions
function init() {
    initCard.innerHTML = "Click Start button to start the timed quiz. Remember a wrong answer will detect time from the timer.<br><button id=\"start\" class\=\"btn\">Start</button>";
    startBtn = document.querySelector("#start");

    //get stored scores
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedList !== null) {
        scoreList = storedList;
    }
}

//Call init
init();
