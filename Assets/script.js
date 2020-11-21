//Define questions and answers in an array
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        questions: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        questions: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store",
        questions: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables",
        questions: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very userful tool used during development and debugging for printing content to the debugger is:",
        questions: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    }
];


function initQuiz() {
    //all users start at 0 second which means 0 point
    let timeleft = 0;
    //reference variables to html elements by ID
    var startquizEl = document.getElementById("startquiz");
    var timeleftEl = document.getElementById("time-left");
    var finalScoreEl = document.getElementById("final-score");
    var Questionslength = questions.length;
    var navbarEl = document.getElementById("navbarcontainer");
    var quizContainerEl = document.getElementById("startcontainer");
    var finalContainerEl = document.getElementById("resultcontainer");
    var submitButtonEl = document.getElementById("submit-initials");
    var highscoreButtonEl = document.getElementById("Viewhighscorebutton");
    var highscoreContainerEl = document.getElementById("Viewhighscorecontainer");

    //Take scores from browser local storage if not empty
    if (JSON.parse(localStorage.getItem('scores')) !== null) {
        highScores = JSON.parse(localStorage.getItem("scores"));
    }

    //define a function when user clicks start quiz button
    function startQuiz() {


        navbarEl.setAttribute("class", "container d-none");
        let rowEl = null;
        let colEl = null;
        let headerEl = null;
        let buttonEl = null;
        quizContainerEl.setAttribute("class", "container");
        let currentQuestion = 1;
        let score = 0;

        //define total time based on total number of questions
        timeleft = Questionslength * 15;
        timeleftEl.setAttribute("value", timeleft);

        //if time expires, hide questions and display final container element
        let myInterval = setInterval(function () {
            if (timeleft < 1) {
                clearInterval(myInterval);

                quizContainerEl.setAttribute("class", "container d-none");
                finalContainerEl.setAttribute("class", "container");
                return;
            }
            timeleft = timeleft - 1;
            timeleftEl.setAttribute("value", timeleft);
        }, 1000);

        //generate questions in quiz conatiner element
        let clickTimeout = false;
        function generateQuestion(questionNum) {

            quizContainerEl.innerHTML = "";
            rowEl = document.createElement("div");
            quizContainerEl.append(rowEl);

            colEl = document.createElement("div");
            rowEl.append(colEl);

            colEl = document.createElement("div");
            rowEl.append(colEl);

            colEl = document.createElement("div");
            rowEl.append(colEl);

            colEl = rowEl.children[1];
            rowEl = document.createElement("div");
            colEl.append(rowEl);

            colEl = document.createElement("div");
            rowEl.append(colEl);

            headerEl = document.createElement("h2");
            headerEl.innerHTML = questions[questionNum - 1].title;
            colEl.append(headerEl);
            colEl = quizContainerEl.children[0].children[1];

            //Display questions one by one through questions array after user clicks on the answer. If answer is wrong, deduct 10 seconds from current timer, otherwise move onto next question. 
            for (let i = 0; i < 4; i++) {
                let rowEl = document.createElement("div");
                rowEl.setAttribute("class", "row mb-1");
                colEl.append(rowEl);

                let colEl2 = document.createElement("div");
                colEl2.setAttribute("class", "col-12");
                rowEl.append(colEl2);

                buttonEl = document.createElement("button");
                buttonEl.setAttribute("class", "btn btn-primary");
                buttonEl.setAttribute("type", "button");
                buttonEl.innerHTML = questions[currentQuestion - 1].questions[i];
                colEl2.append(buttonEl);
                buttonEl.addEventListener("click", function () {

                    if (clickTimeout) {
                        return;
                    }
                    clickTimeout = true;
                    clearInterval(myInterval);
                    let colEl = quizContainerEl.children[0].children[1];
                    let rowEl = document.createElement("div");
                    rowEl.setAttribute("class", "row border-top");
                    colEl.append(rowEl);

                    colEl = document.createElement("div");
                    colEl.setAttribute("class", "col-12");
                    rowEl.append(colEl);

                    let parEl = document.createElement("p");
                    colEl.append(parEl);

                    if (this.innerHTML === questions[currentQuestion - 1].answer) {
                        parEl.innerHTML = "Correct!";
                    } else {
                        parEl.innerHTML = "Wrong";
                        timeleft = timeleft - 10;
                        if (timeleft < 0) {
                            timeleft = 0;
                        }
                        timeleftEl.setAttribute("value", timeleft);
                    }
                    currentQuestion++;

                    if (currentQuestion > questions.length) {
                        score = timeleft;
                    }
                    setTimeout(function () {

                        if (currentQuestion > questions.length) {

                            quizContainerEl.setAttribute("class", "container d-none");
                            finalContainerEl.setAttribute("class", "container");
                            finalScoreEl.setAttribute("value", score);
                        } else {
                            generateQuestion(currentQuestion);
                            clickTimeout = false;
                            myInterval = setInterval(function () {
                                if (timeleft < 1) {
                                    clearInterval(myInterval);
                                    quizContainerEl.setAttribute("class", "container d-none");
                                    finalContainerEl.setAttribute("class", "container");
                                    return;
                                }
                                timeleft = timeleft - 1;
                                timeleftEl.setAttribute("value", timeleft);
                            }, 1000);
                        }
                    }, 2000);
                });
            }


        }
        //save scores to local storage in browser 
        function saveHighScore() {
            let initialsEl = document.getElementById("initials-entry");
            let newHighScore = {
                initials: initialsEl.value,
                highScore: score
            };
            console.log(newHighScore);
            highScores.push(newHighScore);
            console.log(highScores);
            localStorage.setItem("scores", JSON.stringify(highScores));
        }
        submitButtonEl.addEventListener("click", saveHighScore);

        generateQuestion(currentQuestion);
    }

    //Add event listeners on functions
    startquizEl.addEventListener("click", startQuiz);

    highscoreButtonEl.addEventListener("click", function () {
        navbarEl.setAttribute("class", "container d-none");
        quizContainerEl.setAttribute("class", "container d-none");
        finalContainerEl.setAttribute("class", "container d-none");
        highscoreContainerEl.setAttribute("class", "container");
        let colEl = document.getElementById("highscore");

        for (i = 0; i < highScores.length; i++) {
            let rowEl = document.createElement("div");
            rowEl.setAttribute("class", "row mb-1");
            colEl.append(rowEl);

            let colEl2 = document.createElement("div");
            colEl2.setAttribute("class", "col-12 text-center");
            rowEl.append(colEl2);

            let parEl = document.createElement("div");
            parEl.innerHTML = "Initials: " + highScores[i].initials + "   Score: " + highScores[i].highScore;
            colEl2.append(parEl);
        }
    });
}

initQuiz();