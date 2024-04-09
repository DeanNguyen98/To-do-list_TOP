import { projectlist, activeId, saveToLocalStorage } from "./Project";
class Task {
    constructor(name, priority, date) {
        this.name =name;
        this.id = Date.now().toString();
        this.priority = priority;
        this.date = date;
        this.complete = false;
    }
}

const dialog = document.querySelector(".add-task-modal");

function openTaskModal() {
    const OpenModalBtn = document.getElementById("new-task");
    OpenModalBtn.addEventListener("click", () => {
        dialog.showModal();
    })
}

function addNewTask() {
    const taskname = document.querySelector(".task-name");
    const taskdate = document.querySelector(".task-date");
    const taskpriority = document.querySelector(".task-priority");
    const newTask = new Task(taskname.value,taskdate.value, taskpriority.value);
    const activeproject = projectlist.find(project => project.id === activeId);
    if (activeproject) {
        activeproject.tasks.push(newTask); 
    } else {
        alert("Please select a project to add your task");
    }
    console.log(activeproject);
    saveToLocalStorage();
}

function closeTaskModal() {
    const closeModalBtn = document.querySelector(".close-btn");
    closeModalBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    })
}

export {openTaskModal, closeTaskModal, addNewTask};