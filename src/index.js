import { createNewProject , getActiveProject } from "./Project";

function ProjectEventListener () {
    const projectform = document.querySelector(".project-form");
    projectform.addEventListener("submit", (createNewProject));
    const navbar = document.querySelector(".navbar");
    navbar.addEventListener("click", (getActiveProject));
}

ProjectEventListener();

