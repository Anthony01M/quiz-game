const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "F. Scott Fitzgerald", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "O2", correct: false },
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "HO", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const timerContainer = document.getElementById('timer-container');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    nextButton.innerText = 'Next';
    nextButton.classList.add('hide');
    scoreContainer.classList.add('hide');
    questionElement.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
    timerContainer.classList.remove('hide');
    startTimer();
    showQuestion(questions[currentQuestionIndex]);
}

function startTimer() {
    timerElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextQuestion();
        }
    }, 1000);
}

function showNextQuestion() {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        timeLeft = 30;
        showQuestion(questions[currentQuestionIndex]);
        startTimer();
    } else {
        showScore();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    clearInterval(timer);
    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showScore() {
    clearInterval(timer);
    questionElement.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    scoreContainer.classList.remove('hide');
    scoreElement.innerText = score;
    nextButton.innerText = 'Restart';
    nextButton.classList.remove('hide');
    timerContainer.classList.add('hide');
}

nextButton.addEventListener('click', () => {
    if (nextButton.innerText === 'Restart') {
        startGame();
    } else {
        showNextQuestion();
        nextButton.classList.add('hide');
        timeLeft = 30;
        startTimer();
    }
});

startGame();

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});