import { createNewProject , getActiveProject, renderProject,projectlist,activeId } from "./Project";
import { closeTaskModal, openTaskModal, addNewTask, removeCompletedTask } from "./Task";
import { showNavBar } from "./navbar";
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
    const taskDelBtn = document.querySelector(".task-del");
    taskDelBtn.addEventListener("click", function() {
        if (activeId !== "All" && activeId !== "Today") {
            removeCompletedTask();
        }
    });
}

showNavBar();
ProjectEventListener();
TaskEventListener();
openTaskModal();
closeTaskModal();

