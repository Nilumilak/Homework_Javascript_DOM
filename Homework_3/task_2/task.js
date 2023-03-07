function createTaskElement(taskNumber, taskText, storage) {
    let taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    taskDiv.dataset.taskNumber = taskNumber

    let taskTitle = document.createElement('div')
    taskTitle.classList.add('task__title')
    taskTitle.textContent = taskText

    taskDiv.appendChild(taskTitle)

    let taskRemove = document.createElement('a')
    taskRemove.classList.add('task__remove')
    taskRemove.innerHTML = '&times;'
    taskDiv.appendChild(taskRemove)

    taskRemove.addEventListener('click', (ev) => {
        storage.removeItem(ev.target.parentElement.dataset.taskNumber)
        ev.target.parentElement.remove()
    })

    return taskDiv
}

function getTasksFromStorage(storage, taskBox) {
    for (keyItem of Object.keys(storage).sort((a, b) => { return a - b })) {
        let taskDiv = createTaskElement(keyItem, storage[keyItem], storage)
        taskBox.appendChild(taskDiv)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task__input')
    const taskForm = document.getElementById('tasks__form')
    const tasks = document.getElementById('tasks')
    const storage = window.localStorage
    let taskNumber = storage.length > 0 ? Object.keys(storage).sort((a, b) => { return a - b })[storage.length - 1] : 0

    getTasksFromStorage(storage, tasks)

    taskForm.addEventListener('submit', (ev) => {
        ev.preventDefault()

        if (taskInput.value) {
            let taskDiv = createTaskElement(taskNumber++, taskInput.value, storage)

            tasks.appendChild(taskDiv)

            storage.setItem(taskNumber, taskInput.value)
            taskInput.value = ''
        }
    })

}, false)