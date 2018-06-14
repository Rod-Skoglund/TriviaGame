// *************************************************
// Class - Coding Bootcamp MW 
// Assignment #5 - Trivia Game
// Author: Rod Skoglund
// File: game.js
// *************************************************

// Declare Variables
var whichQuestion = 0;
var answerChoices = ["A", "B", "C", "D"];
var gameStates = ["Start", "Quest", "Answer", "End"];
var timeLimitMax = 10;
var timeLimit = timeLimitMax;
var answerPauseTime = (4 * 1000); // number of seconds, in miliseconds to display the nswer results
var questionIntervalId;
var currentGameState = gameStates[0];

//Constructor function to allow the instation of specific objects of the same class.
//By convention, constructor functions begin with a capitol letter.
function QuestionClass(question, answerA, answerB, answerC, answerD, correctAnswer, theImg) {
    this.theQuestion = question;
    this.answers = [answerA, answerB, answerC, answerD];
    this.theAnswer = correctAnswer;
    this.answerImg = theImg;
  }

var question0 = new QuestionClass("What was the first full length CGI movie?", "A Bug\'s Life", "Monsters Inc.", "Toy Story", "The Lion King", "Toy Story", "https://media0.giphy.com/media/Wsk723nT8tXpe/200w.webp");
var question1 = new QuestionClass("Which of these is NOT a name of one of the Spice Girls?", "Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice", "Fred Spice", "https://media3.giphy.com/media/H1OSue2baILkc/200w.webp");
var question2 = new QuestionClass("Which NBA team won the most titles in the 90s?", "New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls", "Chicago Bulls", "https://media3.giphy.com/media/3oEjHHMtBYjU3MP5yE/200w.webp");
var question3 = new QuestionClass('Which group released the hit song, "Smells LikeTeen Spirit"?', "Nirvana", "Backstreet Boys", "The Offspring", "No Doubt", "Nirvana", "https://media0.giphy.com/media/fzwERxHEXXfDW/200w.webp");
var question4 = new QuestionClass('Which popular Disney movie featured the song, "Circle of Life"?', "Aladdin", "Hercules", "Mulan", "The Lion King", "The Lion King", "https://media1.giphy.com/media/DwWkCakaRNJIs/200w.webp");
var question5 = new QuestionClass('Finish this line from the Fresh Prince of Bel-Air theme song: "I whistled for a cab and when it came near, the license plate said..."?', "Dice", "Mirror", "Fresh", "Cab", "Fresh", "https://media1.giphy.com/media/l0IsHKNIOuBPJ4aCk/200w.webp");
var question6 = new QuestionClass("What was Doug\'s best friend\'s name", "Skeeter", "Mark", "Zach", "Cody", "Skeeter", "https://media3.giphy.com/media/26Ff07UuNLfydHNbq/200w.webp");
var question7 = new QuestionClass("What was the name of the principal at Bayside High in Saved By The Bell?", "Mr. Zhou", "Mr. Driggers", "Mr. Belding", "Mr. Page", "Mr. Belding", "https://media3.giphy.com/media/Jl5YsrpS6BaDK/200w.webp");


var listOfQuestions = [question0, question1, question2, question3, question4, question5, question6, question7];
var correctCount = 0;
var incorrectCount = 0;
var unansweredCount = 0;

//define script that must be run after page is loaded
$(document).ready(function() {

    console.log("currentGameState = " + currentGameState);
    console.log("****************************");

    // Set up Start button and add it to the DOM
    startBtn = $("<button>");
    startBtn.addClass("start-button");
    startBtn.text("Start");
    $("#start-active").append(startBtn);

    // Set up answer buttons and add them to the DOM
    for (var k = 0; k < 4; k++) {
        var ansBtn = $("<button>");
        ansBtn.addClass("empty-button " + answerChoices[k]);
        ansBtn.attr("ansLetter", answerChoices[k]);
        ansBtn.text(answerChoices[k]);
        $("#answers").append(ansBtn);
    }

    // Set up Start Over button and add it to the DOM
    startoverBtn = $("<button>");
    startoverBtn.addClass("startover-button");
    startoverBtn.text("Start Over?");
    $("#startover").append(startoverBtn);

    //Define functions
    //decrement() is used to manage displayed timer and take action when timer hits 0
    function decrement() {
        timeLimit--
        // console.log("timeLimit = " + timeLimit);
        $("#clock").text(timeLimit);

        if (timeLimit === 0) {
            clearInterval(questionIntervalId);
            unansweredCount++;
            currentGameState = gameStates[2];
            $("#answer-result").text("Out of Time!");
            $("#animated-GIF").empty();
            var gifImg = $("<img>");
            gifImg.attr("src", listOfQuestions[whichQuestion].answerImg);
            $("#animated-GIF").append(gifImg);
            $("#incorrect-ans").show;
            $("#correctAns").text(listOfQuestions[whichQuestion].theAnswer);
            $("#incorrect-ans").show();
            console.log("in decrement - listOfQuestions[whichQuestion].theAnswer = " + listOfQuestions[whichQuestion].theAnswer);
            updateDisplay();
            timeLimit = timeLimitMax;
            setTimeout(nextQuestion, answerPauseTime);
        }
    }

    //runQuestionTimer() used to initiate question timer
    function runQuestionTimer() {
        clearInterval(questionIntervalId);
        questionIntervalId = setInterval(decrement, 1000);
    }

    //updateDisplay() will choose which elements to hide/show based on the current game state
    function updateDisplay() {
        console.log("currentGameState inside updateDisplay = " + currentGameState);
        console.log("****************************");
        if (currentGameState == gameStates[gameStates.indexOf("Start")]) {
            $("#start-active").show();
            $("#timer-active").hide();
            $("#question-active").hide();
            $("#ansResult-active").hide();
            $("#results-active").hide();
        } // end if Start
        else if (currentGameState == gameStates[gameStates.indexOf("Quest")]) {
            $("#start-active").hide();
            $("#timer-active").show();
            $("#question-active").show();
            $("#ansResult-active").hide();
            $("#results-active").hide();
        } // end if Quest
        else if (currentGameState == gameStates[gameStates.indexOf("Answer")]) {
            $("#start-active").hide();
            $("#timer-active").show();
            $("#question-active").hide();
            $("#ansResult-active").show();
            $("#results-active").hide();
        } // end if Answer
        else if (currentGameState == gameStates[gameStates.indexOf("End")]) {
            $("#start-active").hide();
            $("#timer-active").show();
            $("#question-active").hide();
            $("#ansResult-active").hide();
            $("#results-active").show();
        } // end if End
    }// end function

    //initialize times
    updateDisplay();
    $("#clock").text(timeLimit);

    //displayQuestion() displays the current question, resets Game State updates 
    //the display, resets the time limit and runs the question timer
    function displayQuestion() {
        $("#question").text(listOfQuestions[whichQuestion].theQuestion);
        $(".A").text(listOfQuestions[whichQuestion].answers[0]);
        $(".B").text(listOfQuestions[whichQuestion].answers[1]);
        $(".C").text(listOfQuestions[whichQuestion].answers[2]);
        $(".D").text(listOfQuestions[whichQuestion].answers[3]);
        currentGameState = gameStates[1];
        updateDisplay();
        timeLimit = timeLimitMax;
        runQuestionTimer();
    }

    //resetQuestions() puts the game back to the starting position
    function resetQuestions() {
        whichQuestion = 0;
        timeLimit = timeLimitMax;
        currentGameState = gameStates[0];
        updateDisplay();
        correctCount = 0;
        incorrectCount = 0;
        unansweredCount = 0;
        clearInterval(questionIntervalId);
        }

    startBtn.on("click", displayQuestion);

    startoverBtn.on("click", resetQuestions);
    
    $(".empty-button").on("click", function() {
        var thisAnswer = this.textContent;
        clearInterval(questionIntervalId);
        console.log("this = " + this.textContent);
        console.log("thisAnswer = " + thisAnswer);
        console.log("listOfQuestions[whichQuestion].theAnswer = " + listOfQuestions[whichQuestion].theAnswer);
        console.log("*************************");
        if (thisAnswer == listOfQuestions[whichQuestion].theAnswer) {
            correctCount++;
            currentGameState = gameStates[2];
            console.log("in if then correctCount = " + correctCount);
            $("#answer-result").text("Correct!");
            $("#animated-GIF").empty();
            var gifImg = $("<img>");
            gifImg.attr("src", listOfQuestions[whichQuestion].answerImg);
            $("#animated-GIF").append(gifImg);
            $("#incorrect-ans").hide();
            updateDisplay();
            setTimeout(nextQuestion, answerPauseTime);
        }
        else {
            incorrectCount++;
            currentGameState = gameStates[2];
            console.log("in else incorrectCount = " + incorrectCount);
            $("#answer-result").text("Nope!");
            $("#correctAns").text(listOfQuestions[whichQuestion].theAnswer);
            $("#animated-GIF").empty();
            var gifImg = $("<img>");
            gifImg.attr("src", listOfQuestions[whichQuestion].answerImg);
            $("#animated-GIF").append(gifImg);
            $("#incorrect-ans").show();
            updateDisplay();
            setTimeout(nextQuestion, answerPauseTime);
        }
    })

    function nextQuestion() {
        // clearInterval(pauseInterval);
        whichQuestion++;
        if (whichQuestion >= listOfQuestions.length) {
            currentGameState = gameStates[3];
            $("#correct-count").text(correctCount);
            $("#incorrect-count").text(incorrectCount);
            $("#unanswered-count").text(unansweredCount);
            updateDisplay();
            clearInterval(questionIntervalId);
            console.log("nextQuestion clearInterval(pauseIntervalID) executed");
        }
        else {
            timeLimit = timeLimitMax;
            $("#clock").text(timeLimit);
            clearInterval(questionIntervalId);
            currentGameState = gameStates[1];
            displayQuestion();
        }    
        updateDisplay();
    }

        //initialize times
        updateDisplay();
        $("#clock").text(timeLimit);

}); //End of document ready section
    