const PRIORITY_HIGH = 'HIGH';
const PRIORITY_LOW = 'LOW';

const addHighTaskForm = document.getElementById('addHighTask');
const addLowTaskForm = document.getElementById('addLowTask');

const highWrapper = document.querySelector('.cardbox-high-wrapper');
const lowWrapper = document.querySelector('.cardbox-low-wrapper')

const deleteTaskButton = document.querySelector('.cardbox-card__btn');


const taskArray = [
    {text: 'Выучить JavaScript', prioriy: PRIORITY_HIGH},
    {text: 'Сделать лабораторные по электротехнике и начертить графики', prioriy: PRIORITY_HIGH},
    {text: 'Сходить в магазин', prioriy: PRIORITY_LOW},
];

function addTask(taskText, taskPriority) {
    taskArray.push(
        {text: taskText, prioriy: taskPriority}
    );
}

function deleteTask(taskText) {
    const index = taskArray.findIndex(elem => elem.text === taskText);
    taskArray.splice(index, 1);
}


function createCard(userInput) {
    const card = document.createElement('div');
    card.setAttribute('class', 'cardbox-card');

    const cardInput = document.createElement('input');
    cardInput.setAttribute('type', 'checkbox');
    cardInput.setAttribute('class', 'cardbox-card__checkbox');

    const cardText = document.createElement('p');
    cardText.setAttribute('class', 'cardbox-card__text');
    cardText.textContent = userInput;

    const cardButton = document.createElement('button');
    cardButton.setAttribute('class', 'cardbox-card__btn');
    cardButton.addEventListener('click', () => {
        const cardBlock = cardButton.parentElement;

        deleteTask(userInput);
        cardBlock.remove();
    })

    const cardDeleteImage = document.createElement('img');
    cardDeleteImage.setAttribute('src', 'images/close-icon.svg');

    cardButton.appendChild(cardDeleteImage);

    card.appendChild(cardInput);
    card.appendChild(cardText);
    card.appendChild(cardButton);

    return card;
}

// function renderTasks() {

// }

addHighTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const userInput = addHighTaskForm.elements['userInput'].value;
    addHighTaskForm.elements['userInput'].value = '';

    const card = createCard(userInput);

    addTask(userInput, PRIORITY_HIGH);
    highWrapper.appendChild(card);

    console.log(taskArray);
});

addLowTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const userInput = addLowTaskForm.elements['userInput'].value;
    addLowTaskForm.elements['userInput'].value = '';

    const card = createCard(userInput);

    addTask(userInput, PRIORITY_LOW);
    lowWrapper.appendChild(card);
});

document.addEventListener("DOMContentLoaded", () => {
    for(task of taskArray){
        if (task.prioriy === PRIORITY_HIGH) {
            const card = createCard(task.text);
    
            highWrapper.appendChild(card);
        } 
        else if (task.prioriy === PRIORITY_LOW) {
            const card = createCard(task.text);
    
            lowWrapper.appendChild(card);
        } 
    }
});
