const inProgrss = 'In progress';
const toDo = 'TO DO';
const completed = 'Completed';

const task = {
    list: {
        'Learn JS': inProgrss,
        'Homework': toDo,
        'Buy groceries': completed
    },
    addTask(taskName) {
        this.list[taskName] = toDo;
    },
    deleteTask(taskName) {
        delete this.list[taskName];
    },
    changeStatus(taskName, status) {
        if (taskName in this.list) {
            this.list[taskName] = status;
        }
    },
    showTasks() {
        console.log('In progress:')
        for(const task in this.list) {
            if (this.list[task] === inProgrss) {
                console.log(' - ' + task);
            }
        }
        console.log('To do:')
        for(const task in this.list) {
            if (this.list[task] === toDo) {
                console.log(' - ' + task);
            }
        }
        console.log('Completed:')
        for(const task in this.list) {
            if (this.list[task] === completed) {
                console.log(' - ' + task);
            }
        }
    }
};

task.addTask('Have a meal');
task.changeStatus('Have a meal', completed)

task.showTasks();