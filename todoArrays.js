const IN_PROGRESS = 'In progress';
const TO_DO = 'TO DO';
const COMPLETED = 'Completed';


const taskArray = [
    {name: 'Learn JS', status: IN_PROGRESS},
    {name: 'Buy groceries', status: TO_DO}
];


function addTask(taskName, taskStatus) {
    taskArray.push(
        {name: taskName, status: taskStatus}
    );
}

function deleteTask(taskName) {
    const index = taskArray.findIndex(elem => elem.name === taskName);
    taskArray.splice(index, 1);
}

function changeStatus(taskName, taskStatus) {
    const index = taskArray.findIndex(elem => elem.name === taskName);
    taskArray[index].status = taskStatus;
}

function showTasks() {
    console.log('In progress:')
    for(let task of taskArray) {
        if(task.status === IN_PROGRESS) {
            console.log(` - ${task.name}`);
        }
    }
    console.log('TO DO:')
    for(let task of taskArray) {
        if(task.status === TO_DO) {
            console.log(` - ${task.name}`);
        }
    }
    console.log('Completed:')
    for(let task of taskArray) {
        if(task.status === COMPLETED) {
            console.log(` - ${task.name}`);
        }
    }
}

addTask('Go for a walk', TO_DO);

changeStatus('Go for a walk', COMPLETED);

showTasks();