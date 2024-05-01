const questions = [
    {
        question: "Optimizing a webpage for faster loading time can involve",
        answers: [
            {text: "Using large images without compression", correct: "False"},
            {text: "Reducing the number of HTTP requests", correct: "True"},
            {text: "Including unnecessary animations", correct: "False"},
            {text: "Increasing the font size", correct: "False"}
        ]
    },
    {
        question: "Which of the following is NOT directly involved in displaying content on a webpage?",
        answers: [
            {text: "HTML", correct: "False"},
            {text: "CSS", correct: "False"},
            {text: "JavaScript", correct: "False"},
            {text: "Python", correct: "True"}
        ]
    },
    {
        question: "When describing a web development project you worked on, it's MOST important to",
        answers: [
            {text: "Briefly explain the project goals.", correct: "False"},
            {text: "Explain how you overcame challenges and the outcome", correct: "True"},
            {text: "Focus on the technologies used.", correct: "False"},
            {text: " List all the challenges you faced, even minor ones.", correct: "False"}
        ]
    },

    {
        question: "A Single Page Application (SPA) is beneficial because it",
        answers: [
            {text: "Requires less server communication.", correct: "True"},
            {text: "Needs to be completely reloaded for each page view.", correct: "False"},
            {text: "Involves complex coding compared to traditional webpages.", correct: "False"},
            {text: "Is not very user-friendly.", correct: "False"}
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "True"; // Changed to "True"
    if(isCorrect) {
        score++; // Increment score if the answer is correct
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "True"){ // Changed to "True"
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
    }
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }  
});
startQuiz();

