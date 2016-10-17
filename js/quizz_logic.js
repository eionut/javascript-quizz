// Questions array
var quizzQuestions = [{img: "img/geti.jpg", question: "Cum îi numeau grecii pe daci?", choices: ["daci", "traci", "geți", "buri", "carpi"], correctAnswer: 2},
					  {img: "img/daco-romani.jpg", question: "În războaiele daco-romane din anii 101-102, romanii au fost conduși de către:", choices: ["Burebista", "Traian", "Decebal", "Lisimah", "Alexandru cel Mare"], correctAnswer: 1},
					  {img: "img/glad-gelu-menumorut.jpg", question: "Ungurii, în drumul lor spre Câmpia Panoniei, i-au găsit în Transilvania pe:", choices: ["slavi", "gepizi", "români", "goți"], correctAnswer: 2},
					  {img: "img/tara-romaneasca.jpg", question: "Cine este considerat fondatorul Țării Românești?", choices: ["Harap Alb", "Negru Vodă", "Neagu Djuvara", "Lucian Boia"], correctAnswer: 1},
					  {img: "img/alexandru-cel-bun.jpg", question: "Cine este bunicul lui Ștefan cel Mare?", choices: ["Mircea cel Bătrân", "Iancu de Hunedoara", "Alexandru cel Bun", "Bogdan I"], correctAnswer: 2},
					  {img: "img/stefan_cel_mare.jpg", question: "În ce perioadă a domnit Ștefan cel Mare?", choices: ["1347 - 1356", "1457 - 1504", "1404 - 1433"], correctAnswer: 1},
					  {img: "img/neagoe-basarab.jpg", question: "Învățăturile lui Neagoe Basarab îi erau adresate lui:", choices: ["Sava", "Teodosie", "Teofil"], correctAnswer: 1},
					  {img: "img/vlad_tepes.jpg", question: "În noaptea zilei de 17 iunie 1462, Vlad Țepeș s-a luptat cu:", choices: ["Baiazid", "Soliman Pașa", "Suleiman Magnificul", "Mahomed al II-lea"], correctAnswer: 3},
					  {img: "img/mihai_viteazu.jpg", question: "În ce an a avut loc unirea înfăptuită de Mihai Viteazul?", choices: ["1918", "1456", "1688", "1600", "1859"], correctAnswer: 3},
					  {img: "img/constantin-brancoveanu.jpg", question: "Constantin Brâncoveanu a construit mănăstirea:", choices: ["Putna", "Hurezi", "Cozia", "Antim", "Curtea de Argeș"], correctAnswer: 1}],
	featPhoto = document.getElementById("feat-photo"), // Store location for feat-photo element
	currentQuestion = document.getElementById("cQ"), // Store location for current question indicator element 
	questionsNumber = document.getElementById("qN"), // Store location for questions number indicator element
	questionElement = document.getElementById("question"), // Store location for question container element
	answers = document.getElementById("answers"), // Store location for answers container
	errorContainer = document.getElementById("errorContainer"), // Store location of error container 
	submitButton = document.getElementById("send"), // Store location for submit button
	questionNo = 0, // Set initial question to 0;
	correctAnswers = 0; // Set correct answers to 0

// write questions number
questionsNumber.textContent = quizzQuestions.length;

// add answers
function insertAnswers(qNo) {
	var html = "";

	for (var i = 0; i < quizzQuestions[qNo].choices.length; i++) { // iterate throw answers array and build radio inputs
		html += "<div class='answer-container'><label for='answer" + i + "'><input type='radio' id='answer" + i + "' name='answer' value='" + quizzQuestions[qNo].choices[i] + "'>" + quizzQuestions[qNo].choices[i] + "</label></div>";
	}
	return html;
}

// populate quizz
function populateQuizz() {
	console.log(questionNo);
	
	var url = "url(" + quizzQuestions[questionNo].img + ")"; // store the url for feat-photo
	featPhoto.style.backgroundImage = url; // set the url for feat-photo

	currentQuestion.textContent = questionNo + 1; // upgrade question number indicator

	questionElement.textContent = quizzQuestions[questionNo].question; // insert current question

	answers.innerHTML = insertAnswers(questionNo); // insert answers

	questionNo += 1; // upgrade question number
}

// get user answers
function getUserAnswer() {
	console.log("user answer");

	// answer inputs
	var answers = quizz.answer; // store the answers array
	console.log(answers);
	var userAnswer = quizz.answer.value; // store the value of the selected answer
	var userAnswerId = "";
	console.log(userAnswer);

	for (var i = 0; i < answers.length; i ++) { // identify the id of the selected answer
		if (userAnswer == answers[i].value) {
			userAnswerId = answers[i].id.slice(-1); // store only the number from the id
			console.log(userAnswerId + " answer id");
		}
	}

	if (userAnswerId == quizzQuestions[questionNo-1].correctAnswer) { // check if the selected answer was the correct one
		correctAnswers++;
		console.log(correctAnswers + " raspuns corect");
	}
}

// generate success or failure messages
function generateMessage(cq) {
	if (cq < quizzQuestions.length / 2) {
		if (cq == 0) {
			return '<p class="error">Îmi pare rău!<br>Nu ai răspuns corect la nicio întrebare.</p>';
		} else if (cq == 1) {
			return '<p class="error">Îmi pare rău!<br>Ai răspuns corect doar la o întrebare.</p>';
		} else {
			return '<p class="error">Îmi pare rău!<br>Ai răspuns corect doar la ' + cq + ' întrebări.</p>';
		}
	} else {
		if (cq == quizzQuestions.length) {
			return '<p class="success">Felicitări!<br>Ai răspuns corect la toate cele ' + cq + ' întrebări.</p>';
		} else {
			return '<p class="success">Felicitări!<br>Ai răspuns corect la ' + cq + ' întrebări.</p>';
		}
	}
}

// Populate quizz when the player enters the page
populateQuizz();

// Add an event listener on the button
submitButton.addEventListener('click', function(e) {
	e.preventDefault();

	errorContainer.textContent = ""; // delete error message
	console.log (quizz.answer.value);
	
	if (quizz.answer.value == "") { // check if the user submited an answer before clicking the button
		errorContainer.textContent = "Selectează un răspuns!";
	} else {
		if (questionNo == quizzQuestions.length) { // check if last question
			getUserAnswer();
			document.getElementById("quizzContent").innerHTML = '<div class="message-container">' + generateMessage(correctAnswers) + '</div>';
		} else {
			getUserAnswer();
			populateQuizz();
		}
	}
});

