import { createNewProject , getActiveProject, renderProject,projectlist } from "./Project";
import { closeTaskModal, openTaskModal, addNewTask } from "./Task";
function ProjectEventListener () {
    const projectform = document.querySelector(".project-form");
    projectform.addEventListener("submit", (createNewProject));
    const navbar = document.querySelector(".navbar");
    navbar.addEventListener("click", (getActiveProject));
    renderProject(projectlist);
}

function TaskEventListener() {
    const taskform = document.querySelector("[data-new-task-form]");
    taskform.addEventListener("submit", (addNewTask));
}
ProjectEventListener();
TaskEventListener();
openTaskModal();
closeTaskModal();

