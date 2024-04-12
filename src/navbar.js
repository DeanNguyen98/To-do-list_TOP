import { projectlist, activeId, saveToLocalStorage } from "./Project";
import { renderTasks } from "./Task";
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
            }, 200)
        }
    });
       
}



export {renderAlltask};