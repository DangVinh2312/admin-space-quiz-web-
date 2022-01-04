let checkError = 0;
const formGroup = document.querySelector('.form-editing');
let formCorrectAnswer = formGroup.getAttribute('data-correct');
const formUpdate = document.querySelector('#form-update');
const addAnswerBox = formGroup.querySelector('.text-right');
const addAnswerBtn = addAnswerBox.querySelector('.text-right button');
const saveUpdatedQuestionBtn = document.querySelector('.save-update-ques');
saveUpdatedQuestionBtn.addEventListener('click', saveUpdatedQuestion);
let countAnswers = formGroup.querySelectorAll('.answer');
countAnswers.forEach((answer, index) => {
    const checkedAnswer = answer.querySelector('input[type = "radio"]');
    if (formCorrectAnswer == index) {
        checkedAnswer.checked = true;
    }
    deleteAnswer(answer);
})

addAnswerBtn.addEventListener('click', addNewAnswer);
function addNewAnswer() {
    addAnswer(countAnswers.length);
    countAnswers = formGroup.querySelectorAll('.answer');
    countAnswers.forEach(answer => {
        deleteAnswer(answer);
    })
}

function checkEmptyValue() {
    let empAnswer = 0;
    const formText = document.querySelector('.form-text');
    const textValue = formText.querySelector('input[type="text"]').value;
    const countAnswers = formGroup.querySelectorAll('.answer');
    countAnswers.forEach(answer => {
        const answerText = answer.querySelector('input[type="text"]').value;
        if (answerText === '') {
            ++empAnswer;
        }    
    })
    if (textValue === '' || empAnswer !== 0 || countAnswers.length < 2) {
        return true;
    } 
    return false;
}

function addAnswer(index) {
    const answerBox = document.createElement('div');
    const inputText = document.createElement('input');
    const correctAnswerBox = document.createElement('div');
    const correctAnswerInput = document.createElement('input');
    const correctAnswerLabel = document.createElement('label');
    correctAnswerLabel.textContent = `correct`;
    const button = document.createElement('button');
    button.innerHTML = `<i class="fas fa-times"></i> Remove`
    setAttributes(answerBox, { 'class': 'answer' });
    setAttributes(inputText, { 'type': 'text', 'name': 'answers', 'value': '' });
    setAttributes(correctAnswerInput, { 'type': 'radio', 'name': 'correctAnswer', 'value': index, 'id': `answer${index}` });
    setAttributes(correctAnswerLabel, { 'for': `answer${index}` });
    setAttributes(button, { 'class': 'btn btn-orange', 'type': 'button' });
    answerBox.appendChild(inputText);
    answerBox.appendChild(correctAnswerBox);
    answerBox.appendChild(button);
    correctAnswerBox.appendChild(correctAnswerInput);
    correctAnswerBox.appendChild(correctAnswerLabel);
    formGroup.insertBefore(answerBox, addAnswerBox);
}

function deleteAnswer(answer) {
    const removeAnswerBtn = answer.querySelector('button');
    removeAnswerBtn.addEventListener('click', () => {
        answer.remove();
    });
}

function saveUpdatedQuestion (e) {
    if (checkEmptyValue()) {
        e.preventDefault();
        alert("Empty Text or Answers !!!");
    } else {
        formUpdate.submit();
    }
}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}







