import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAL9a9dH5D0WzW5PwrlIX-KVj7jxGjBeEQ",
    authDomain: "web-app-development-4761c.firebaseapp.com",
    databaseURL: "https://web-app-development-4761c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web-app-development-4761c",
    storageBucket: "web-app-development-4761c.appspot.com",
    messagingSenderId: "362560056887",
    appId: "1:362560056887:web:4b460f6c08eba94269d9b2",
    measurementId: "G-RV7RMLH579"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase()

let reference = ref(database, 'QUIZ')
let questions = [];
let state = {
    currentQuestion: 0,
    score: [],
    totalQuestions: questions.length,
    heading: 'Computer Quiz'
}
let timer
onValue(reference, (snap) => {
    questions = snap.val()
    state.totalQuestions = questions.length
    nextQuestion()
    timer = start()
})



function addMultipleNodes(parent, children) {
    for (let index = 0; index < children.length; index++) {
        parent.appendChild(children[index])
    }
}

let container = document.getElementsByClassName('container')[0].firstElementChild

class question {
    constructor(q, state) {
        let questionCard = document.createElement('div') //The whole Card
        questionCard.id = "questionCard"
        let title = document.createElement('h1') //The heading
        title.innerHTML += state.heading;
        let question = document.createElement('div') //The question
        question.id = "question"
        question.innerHTML = q.question
        let answers = document.createElement('form') //Answers Holder
        answers.id = "answers"
        for (let index = 0; index < q.answers.length; index++) {
            let answer = document.createElement('label'); //single answer
            answer.onclick = () => {
                this.selectedAnswer = q.answers[index];
            }
            let input = document.createElement('input') //answer input
            input.type = 'radio'
            input.name = 'answer'
            input.value = q.answers[index]
            answer.appendChild(input)
            answer.innerHTML += q.answers[index].text //answer label
            answers.appendChild(answer) //answers div
        }
        let nextBtnHolder = document.createElement('div') //Next button holder
        nextBtnHolder.id = 'options'
        let nextBtn = document.createElement('button') //Next Button
        if (state.currentQuestion + 1 !== state.totalQuestions) {
            nextBtn.innerHTML = "Next Question"
            nextBtn.onclick = () => {
                if (this.selectedAnswer.isCorrect) {
                    state.score.push(10)
                }
                else {
                    state.score.push(0)
                }
                console.log(state.currentQuestion)
                state.currentQuestion += 1;
                nextQuestion()
            }
        }
        else {
            nextBtn.innerHTML = "End Quiz"
            nextBtn.onclick = () => {
                if (this.selectedAnswer.isCorrect) {
                    state.score.push(10)
                }
                else {
                    state.score.push(0)
                }
                console.log(state.currentQuestion)
                state.currentQuestion += 1;
                endQuiz()
            }
        }
        let prevBtn = document.createElement('button') //Prev Button
        prevBtn.innerHTML = "Prev Question"
        prevBtn.onclick = () => {
            state.score.pop()
            console.log(state.currentQuestion)
            state.currentQuestion -= 1;
            nextQuestion()
        }
        if (state.currentQuestion === 0) {
            prevBtn.disabled = true
        }
        nextBtnHolder.appendChild(prevBtn)
        nextBtnHolder.appendChild(nextBtn)
        addMultipleNodes(questionCard, [title, question, answers, nextBtnHolder])
        this.component = questionCard;
        this.selectedAnswer = ""
    }
}

class endScreen {
    constructor() {
        let questionCard = document.createElement('div') //The whole Card
        questionCard.id = "questionCard"
        let title = document.createElement('h1') //The heading
        title.innerHTML += state.heading;
        //     id="result">
        //     <h1>You received 10/50 marks</h1>
        // </div>
        let result = document.createElement('div')
        result.id = "result"
        let score = document.createElement('h1')
        let scoreNumber = state.score.reduce((a, b) => a + b)
        console.log(scoreNumber, state.totalQuestions)
        if (scoreNumber === (state.totalQuestions * 10)) {
            score.innerHTML += `Reamarkable ✨ you received ${scoreNumber}/${state.totalQuestions * 10}`
        }
        else if (scoreNumber / (state.totalQuestions * 10) >= 0.7) {
            score.innerHTML += `Not bad you could have done better.<br/>You received ${scoreNumber}/${state.totalQuestions * 10}`
        }
        else {
            score.innerHTML += `Disappointing you failed.<br/>You received ${scoreNumber}/${state.totalQuestions * 10}`
        }
        let timeHolder = document.createElement('h1')
        console.log(time)
        timeHolder.innerHTML += `You took ${time[0].innerHTML} <sub>hours</sub> and ${time[1].innerHTML} <sub>minutes</sub> ${time[2].innerHTML} <sub>seconds</sub>`
        result.appendChild(score)
        addMultipleNodes(questionCard, [title, result, timeHolder])
        this.component = questionCard
    }
}

function nextQuestion() {
    container
        .replaceChildren(
            new question(
                questions[state.currentQuestion],
                state
            ).component
        )
    console.log(state)
}

function endQuiz() {
    stop(timer)
    console.log(
        new endScreen().component
    )
    container
        .replaceChildren(
            new endScreen().component
        )
    console.log(state)
}