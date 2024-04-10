import { projectlist, activeId, saveToLocalStorage } from "./Project";
class Task {
    constructor(name, date, priority, complete) {
        this.name =name;
        this.id = Date.now().toString();
        this.priority = priority;
        this.date = date;
        this.complete = complete;
    }
}

const dialog = document.querySelector(".add-task-modal");

function openTaskModal() {
    const OpenModalBtn = document.getElementById("new-task");
    OpenModalBtn.addEventListener("click", () => {
        dialog.showModal();
    })
}

function createTaskTemplate(task) {
    const taskcontainer = document.createElement("div");
    taskcontainer.classList.add("tasks-container");
    const tasksDiv = document.createElement("div");
    tasksDiv.classList.add("tasks");
    const taskcheckbox = document.createElement("input");
    taskcheckbox.type = "checkbox";
    taskcheckbox.id = `task-${task.id}`;
    taskcheckbox.checked = task.complete;
    taskcheckbox.addEventListener("change", () => {
        changeTaskcondition(taskcheckbox, task);
    })
    const tasklabel = document.createElement("label");
    tasklabel.for = `task-${task.id}`;
    tasklabel.textContent = task.name; 
    tasksDiv.appendChild(taskcheckbox);
    tasksDiv.appendChild(tasklabel);
    taskcontainer.appendChild(tasksDiv);
    //task-description DOM
    const taskdescription = document.createElement("div");
    taskdescription.classList.add("tasks-description");
    const descriptDate = document.createElement("div");
    descriptDate.classList.add("descript", "date");
    descriptDate.innerText = (task.date).toString();
    const descriptPriority = document.createElement("div");
    descriptPriority.classList.add("descript", "priority");
    switch(task.priority) {
        case 'high':
            descriptPriority.innerText = "High";
            descriptPriority.classList.add("high");
            break;
            case 'medium':
                descriptPriority.textContent = "Medium";
                descriptPriority.classList.add("medium");
                break;
            case 'low':
            descriptPriority.textContent = "Low";
            descriptPriority.classList.add("low");
            break;
    }
    //Clickable priority div to change priority
    descriptPriority.addEventListener("click", () => {
        (switchPriority(descriptPriority, task))
    });
    //
    taskdescription.appendChild(descriptDate);
    taskdescription.appendChild(descriptPriority);
    taskcontainer.appendChild(taskdescription);
    return taskcontainer;
}

//logic for clickable div to change priority
function switchPriority(content, task) {
    switch(task.priority) {
        case "high" :
            task.priority = "medium";
            content.textContent = "Medium";
            content.classList.remove("high");
            content.classList.add("medium");
            break;
            case "medium" :
                task.priority = "low";
                content.textContent = "Low";
                content.classList.remove("medium");
                content.classList.add("low");
                break;
        case "low" :
        task.priority = "high";
        content.textContent = "High";
        content.classList.remove("low");
        content.classList.add("high");
        break;
    }
    saveToLocalStorage();
}
//////

//logic to change task complete condition upon clicked
function changeTaskcondition(checkbox,task) {
    task.complete = checkbox.checked;
    saveToLocalStorage();
}
//////

function addNewTask() {
    const taskname = document.querySelector(".task-name");
    const taskdate = document.querySelector(".task-date");
    const taskpriority = document.querySelector(".task-priority");
    const newTask = new Task(taskname.value,taskdate.value, taskpriority.value, false);
    const activeproject = projectlist.find(project => project.id === activeId);
    if (activeproject) {
        activeproject.tasks.push(newTask);
        renderTasks(activeproject); 
    } else {
        alert("Please select a project to add your task");
    }
    taskname.value = null;
    taskdate.value = null;
    console.log(activeproject);
    saveToLocalStorage();
}

function renderTasks(project) {
    const taskbody = document.querySelector(".task-body");
    taskbody.innerText = "";
    project.tasks.forEach(task => {
        const Tasks = createTaskTemplate(task);
        taskbody.appendChild(Tasks);
    })
    console.log(project.tasks);
}

function removeCompletedTask() {
    const activeproject = projectlist.find(project => project.id === activeId);
    activeproject.tasks = activeproject.tasks.filter(task=> !task.complete);
    renderTasks(activeproject);
    saveToLocalStorage();
    
}

function closeTaskModal() {
    const closeModalBtn = document.querySelector(".close-btn");
    closeModalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    })
}



export {openTaskModal, closeTaskModal, addNewTask, renderTasks, removeCompletedTask};