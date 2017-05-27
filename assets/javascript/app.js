//Global Variables
//==================================================================
var questionCount = 0, correctAnswers = 0, incorrectAnswers = 0, unanswered = 0, countdown = 30;
var correct = false;
$('.results').hide();
$('#multipleChoice').hide();
//Object to Hold Questions
//==================================================================
var trivia = {
	"questions" : [
		{
			"question" : "Which Florida State quarterback was the school's first Heisman Trophy winner?",
			"answer" : "Charlie Ward",
			"multipleChoice" : [
				"Jameis Winston", "Charlie Ward", "Chris Weinke", "Christian Ponder", "Chris Rix"
			]
		},
		{
			"question" : "What was the nickname of Florida State defensive back Deion Sanders?",
			"answer" : "Primetime",
			"multipleChoice" : [
				"Money", "The Snake", "The Reaper", "Primetime", "No Fly Zone"
			]
		},
		{
			"question" : "What is the name of the Appaloosa horse that rides to start every Florida State home game?",
			"answer" : "Renegade",
			"multipleChoice" : [
				"Unconquered", "Osceola", "Jimbo", "Renegade", "Seminole"
			]
		},
		{
			"question" : "Against whom were the 1984 Florida State Seminoles playing when the War Chant was first heard?",
			"answer" : "Auburn",
			"multipleChoice" : [
				"Florida", "Miami", "Auburn", "South Carolina", "Clemson"
			]
		},
		{
			"question" : "Who is the all-time leading rusher is FSU history?",
			"answer" : "Dalvin Cook",
			"multipleChoice" : [
				"Warrick Dunn", "Devontae Freeman", "Dalvin Cook", "Greg Allen", "Travis Minor"
			]
		},
		{
			"question" : "What year did the Seminoles NOT win a National Championship?",
			"answer" : "1996",
			"multipleChoice" : [
				"1993", "1996", "1999", "2013", "All of the Above"
			]
		},
	]
}

//Function to display results at end of game
//==================================================================
	function results () {
		$("#triviaQuestion").hide();
		$(".choices").hide();
		$(".results").show();
		$("#correct").html("Correctly Answered: " + correctAnswers);
		$("#wrong").hmtl("Incorrectly Answered: " + incorrectAnswers);
		$("#unanswered").html("Unanswered: " + unanswered);

		//Testing
		console.log("Correctly Answered: " + correctAnswers);
		console.log("Incorrectly Answered: " + incorrectAnswers);
		console.log("Unanswered: " + unanswered);

	}

//Function to start game
//==================================================================
	function start () {
		// Ask first question
		askQuestion(questionCount);
		counter = setInterval(countDownToNextQuestion, 1000);
}

//Function to display questions
	function askQuestion (questionCount) {
		countdown = 30;
		$("#multipleChoice").show();
		if (questionCount < 6) {
			console.log(trivia.questions[questionCount].question);
			$("#triviaQuestion").html(trivia.questions[questionCount].question);

			//Display Multiple Choice
			$("#a").html(trivia.questions[questionCount].multipleChoice[0]);
			$("#b").html(trivia.questions[questionCount].multipleChoice[1]);
			$("#c").html(trivia.questions[questionCount].multipleChoice[2]);
			$("#d").html(trivia.questions[questionCount].multipleChoice[3]);
			$("#e").html(trivia.questions[questionCount].multipleChoice[4]);

		} else {
			clearInterval(counter);
			results();
		}
	}

// Function to check is answer is correct
//==================================================================
	function checkIfCorrect (guessed) {
		if (guessed === trivia.questions[questionCount].answer) {
			return true;
		} else {
			return false;
		}
	}

//Button listener to start game
//==================================================================
$(".startButton").on("click", function() {
	$(".startButton").hide();
	questionCount = 0, correctAnswers = 0, incorrectAnswers = 0, unanswered = 0, countdown = 30;
	start();
});


//Button listener for answers
//==================================================================
	$(".list-group-item").on("click", function() {

		if (checkIfCorrect($(this).html()) === true){
			correctAnswers++;
			console.log("# of Correct Answers: " + correctAnswers);
			questionCount++;
			askQuestion(questionCount);
		} else if (checkIfCorrect($(this).html()) === false) {
			incorrectAnswers++;
			console.log("# of Incorrect Answers: " + incorrectAnswers);
			askQuestion(questionCount);
		}
	});

//Function to time each question until the next question
//==================================================================
	function countDownToNextQuestion() {
		countdown--;
		//Show the countdown in the .timer tag
		$("#showCountDown").html("<h4>Time Remaining: " + countdown + " seconds </h4>");

		//Once Countdown hits zero
		if (countdown === 0) {

			//Stop Countdown
			clearInterval(counter);

			//Alert the user
			unanswered++;
			console.log("# of Unanswered: " + unanswered);
			console.log("Time is Up!");

			//Update Question Count
			questionCount++;

			//IF all question have been asked, display results
			if (questionCount == 6) {
				clearInterval(counter);
				results();
			} else {
				//Go to next question
				askQuestion(questionCount);

				//Update counter
				countdown = 30;

				//Countdown to zero
				counter = setInterval(countDownToNextQuestion, 1000);
			}
		}
	}












