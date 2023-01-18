let button = document.getElementById("js-btn-tts");
let buttonStop = document.getElementById("js-btn-stop-tts");
let questions_screen = document.getElementById("questions_screen");



button.addEventListener("click", function(){
    let header_screen = document.getElementById("header_screen");
    let text = header_screen.textContent;

    let speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
});

buttonStop.addEventListener("click", function(){
    speechSynthesis.cancel();
});

// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz(){
    this.questions = [];
    this.comment1 = "Vous avez répondu à 5 ou 6 questions entre 3 et 4. Votre niveau d'anxiété est important et vous devriez envisager des stratégies comme une meilleure hygiène de vie, l'acquisition d'une technique de relaxation, l'ajout d'exercices physiques à votre routine quotidienne.";
    this.comment2 = "Vous avez répondu à une majorité de questions par 3 ou 4. Vous avez atteint un niveau critique et vous devriez consulter votre médecin de famille.";
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }
}

// On va récupérer notre fonction Quiz pour implémenter ses données dans ses arguments 
// Partie Création des mes données de Questions :
let quiz = new Quiz();

let question1 = new Question("Nervosité ou sensation de tremblements intérieurs", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"],0,1,2,3,4);
quiz.addQuestion(question1);

let question2 = new Question("Nausées, douleurs ou maux d'estomac", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question2);

let question3 = new Question("Impression d'être effrayé(e), subitement et sans raison", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question3);

let question4 = new Question("Palpitations ou impression que votre coeur bas plus fort, plus vite", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question4);

let question5 = new Question("Difficulté importante à vous endormir", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question5);

let question6 = new Question("Difficulté à vous détendre", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question6);

let question7 = new Question("Tendance à sursauter facilement", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question7);

let question8 = new Question("Tendance à être facilement irritable, ou importuné(e)", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question8);

let question9 = new Question("Incapacité à vous libérer de pensées obsédantes", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question9);

let question10 = new Question("Tendance à vous réveiller très tôt le matin et à rester éveillé(e)", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question10);

let question11 = new Question("Tendance à vous sentir nerveux lorsque vous êtes seul(e)", ["Pas du tout", "Un peu", "Modérément", "Beaucoup", "Extrêmement"]);
quiz.addQuestion(question11);


// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers) {
    this.title = title,
    this.answers = answers,

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questions_screen = document.getElementById("questions_screen");
        let rate = document.querySelector("rate");

        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        let button = document.createElement("button");
        button.classList.add("js-btn-tts");
        button.textContent = "Lecture";

        let buttonStop = document.createElement("button");
        buttonStop.classList.add("js-btn-stop-tts");
        buttonStop.textContent = "Stop";

        button.addEventListener("click", function(){
            let text = questions_screen.textContent;
        
            let speech = new SpeechSynthesisUtterance(text);
            speech.rate = 0.7;
            speechSynthesis.speak(speech);
        });
        
        buttonStop.addEventListener("click", function(){
            speechSynthesis.cancel();
        });

        // Le append sert à afficher le html (il existe le after et le prepend si on veut afficher au-dessus ou en-dessous)
        questions_screen.prepend(buttonStop);
        questions_screen.prepend(button);
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        // Fonction pour voir à combien de question on est sur le total de questions présents
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + " sur " + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => { 
        let answerSelect = e.target;
        if(this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");

        }

        // Mise en place d'une fonction Timeout pour passer à la prochaine question, timer d'une seconde après le click sur un élément
        setTimeout(function() {
            questions_screen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
            quiz.addResult();
        }, 550);
    };
    this.isCorrectAnswer = function(answerUser) {
        if(answerUser == (this.answers=0)) {
            quiz.nbrCorrects=0;
            return true;
        }
        if(answerUser == (this.answers=1)) {
            quiz.nbrCorrects++;
            return true;
        } else if (answerUser == (this.answers=2)) {
            quiz.nbrCorrects+=2;
            return true;
        } else if (answerUser == (this.answers=3)) {
            quiz.nbrCorrects+=3;
            return true;
        } else if (answerUser == (this.answers=4)) {
            quiz.nbrCorrects+=4;
            return true;
        }
        else {
            return false;
        }
    }
};

// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    let header_screen = document.getElementById("header_screen");

    let input = document.forms["RegForm"]["Code"];
    const ACCES_KEY = "8409";

    if (input.value != ACCES_KEY) {
        window.alert("Merci de renseigner un code valide");
        input.focus();
        return false;
    } else {
        header_screen.style.display = "none";
        questions_screen.style.display = "block";
    
        quiz.displayCurrentQuestion();
    }
}

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    // Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
    let NbrQuestion = document.querySelectorAll(".nbrQuestion");

    NbrQuestion.forEach(function(NbrQuestion) {
        
        NbrQuestion.textContent = quiz.questions.length;

    });

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function() {
        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";

            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";

        }
    }