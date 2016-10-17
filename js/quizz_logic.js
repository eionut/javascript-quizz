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
					  {img: "img/constantin-brancoveanu.jpg", question: "Constantin Brâncoveanu a construit mănăstirea:", choices: ["Putna", "Hurezi", "Cozia", "Antim", "Curtea de Argeș"], correctAnswer: 1}];
// Store location for feat-photo element
var featPhoto = document.getElementById("feat-photo");
// Store location for current question indicator element 
var currentQuestion = document.getElementById("cQ");
// Store location for questions number indicator element
var questionsNumber = document.getElementById("qN");
// Store location for question container element
var questionElement = document.getElementById("question");
// Store location for answers container
var answers = document.getElementById("answers");
// Store location for submit button
var submitButton = document.getElementById("send");
// Set initial question to 0;
var questionNo = 0;
// Set correct answers to 0
var correctAnswers = 0;

// write questions number
questionsNumber.textContent = quizzQuestions.length;

// add answers
function addAnswers(qNo) {
	var html = "";

	for (var i = 0; i < quizzQuestions[qNo].choices.length; i++) {
		html += "<div class='answer-container'><label for='answer" + i + "'><input type='radio' id='answer" + i + "' name='answer' value='" + quizzQuestions[qNo].choices[i] + "'>" + quizzQuestions[qNo].choices[i] + "</label></div>";
	}
	return html;
}

// populate quizz
function populateQuizz() {
	console.log(questionNo);
	
	var url = "url(" + quizzQuestions[questionNo].img + ")"; // store the url for feat-photo
	// set the url for feat-photo
	featPhoto.style.backgroundImage = url;

	// set current question number
	currentQuestion.textContent = questionNo + 1;

	// set the question
	questionElement.textContent = quizzQuestions[questionNo].question;

	// set the answers
	answers.innerHTML = addAnswers(questionNo);

	// increment question number
	questionNo += 1;
}

// get user answers
function getUserAnswer() {
	console.log("user answer");
	// answer inputs
	var answers = quizz.answer;
	console.log(answers);
	var userAnswer = quizz.answer.value;
	var userAnswerId = "";
	console.log(userAnswer);

	for (var i = 0; i < answers.length; i ++) {
		if (userAnswer == answers[i].value) {
			userAnswerId = answers[i].id.slice(-1);
			console.log(userAnswerId + " answer id");
		}
	}

	if (userAnswerId == quizzQuestions[questionNo-1].correctAnswer) {
		correctAnswers++;
		console.log(correctAnswers + " raspuns corect");
	}
}

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

populateQuizz();

submitButton.addEventListener('click', function(e) {
	e.preventDefault();
		
	if (questionNo == quizzQuestions.length) {
		getUserAnswer();
		document.getElementById("quizzContent").innerHTML = '<div class="message-container">' + generateMessage(correctAnswers) + '</div>';
	} else {
		getUserAnswer();
		populateQuizz();
	}
});

