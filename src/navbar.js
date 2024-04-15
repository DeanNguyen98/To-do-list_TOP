import { projectlist, activeId, saveToLocalStorage } from "./Project";
import { renderTasks } from "./Task";
import { format } from "date-fns";
function renderAlltask () {
    let Alltasks = [];
    projectlist.forEach(project => {
        Alltasks = Alltasks.concat(project.tasks);
    })
    renderTasks(Alltasks);
    const taskDelBtn = document.querySelector(".task-del");
    //Add logic to delete task in All-task tab
    taskDelBtn.addEventListener("click", function() {
        if (activeId === "All") {
            const Allcompletedtasks = Alltasks.filter(task => task.complete);
            Allcompletedtasks.forEach(task => {
                const taskElem = document.getElementById(`${task.id} container`);
                taskElem.classList.add("slide")
            })
            setTimeout(() => {
                Alltasks = Alltasks.filter(task => !task.complete);
                projectlist.forEach(project => {
                    project.tasks = project.tasks.filter(task => !task.complete);
                })
                renderTasks(Alltasks);
                saveToLocalStorage();
            }, 280)
        }
    });
}

function renderTodayTask() {
    let todayTasks = [];
    let todayDate = format(new Date, "dd/MM/yyyy")
    projectlist.forEach(project => {
        project.tasks.forEach(task => {
            if (task.date === todayDate) {
                todayTasks.push(task);
            }
        })
    })
    renderTasks(todayTasks);
    const taskDelBtn = document.querySelector(".task-del");
    //Add logic to delete task in Today tab
    taskDelBtn.addEventListener("click", function() {
        if (activeId === "Today") {
            const Todaycompletedtasks = todayTasks.filter(task => task.complete);
            Todaycompletedtasks.forEach(task => {
                const taskElem = document.getElementById(`${task.id} container`);
                taskElem.classList.add("slide")
            })
            setTimeout(() => {
                todayTasks = todayTasks.filter(task => !task.complete);
                projectlist.forEach(project => {
                    project.tasks = project.tasks.filter(task => !task.complete);
                })
                renderTasks(todayTasks);
                saveToLocalStorage();
            }, 280)
        }
    });
}

function showNavBar () {
    const menubtn = document.querySelector(".menu-btn");
    menubtn.addEventListener("click", () => {
        const navbar = document.querySelector(".navbar");
        if (navbar.classList.contains(".show")) {
            navbar.classList.remove("show");
        } else {
            navbar.classList.toggle("show");
        }
    })
}



export {renderTodayTask, renderAlltask, showNavBar};