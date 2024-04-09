let defaultProjectList=[];
let projectlist = localStorage.getItem("myProjectList");
    projectlist = JSON.parse(projectlist || JSON.stringify(defaultProjectList));
let activeId;

class Project {
    constructor(name,id) {
        this.name = name;
        this.id = id;
        this.tasks = [];
    }
}
function saveToLocalStorage(){
    localStorage.setItem("myProjectList", JSON.stringify(projectlist));
}

function createNewProject (e) {
    e.preventDefault();
    const projectinput = document.querySelector(".project-input");
    if (projectinput.value === "") {
        alert("Project name cannot be empty");
        return;
    }
    const newproject = new Project(projectinput.value, Date.now().toString());
    projectlist.push(newproject);
    renderProject(projectlist);
    console.log(projectlist);
    projectinput.value = null;
    saveToLocalStorage();
}

function createProjectTemplate (project) {
    const projectbutton = document.createElement("button");
    projectbutton.classList.add("button-nav", "button-project");
    projectbutton.innerText = project.name;
    projectbutton.dataset.listId = project.id;
    const projdelete = document.createElement("i");
    projdelete.classList.add("fa-solid", "fa-trash-can", "trash-btn");
    projectbutton.appendChild(projdelete);
    return projectbutton;
} 

function renderProject (list) {
    const projectcontainer = document.querySelector(".project-lists");
    projectcontainer.textContent = "";
    list.forEach(project => {
        const projectButton = createProjectTemplate(project);
        projectcontainer.appendChild(projectButton);
    //Remove project logic
    const deleteprojBtn = projectButton.querySelector(".trash-btn");
    deleteprojBtn.addEventListener("click", () => {
        const projectIndex = projectlist.indexOf(project);
        projectlist.splice(projectIndex, 1);
        projectcontainer.removeChild(projectButton);
    })
    })
}

function getActiveProject (e) {
    const projectbtn = document.querySelectorAll(".button-nav");
    projectbtn.forEach(btn => {
        btn.classList.remove("active");
    })
    if (e.target.tagName.toLowerCase() === "button") {
        e.target.classList.add("active");
        activeId = e.target.dataset.listId;
    }
    console.log(activeId);
}


export {projectlist, activeId, createNewProject, getActiveProject, saveToLocalStorage, renderProject};