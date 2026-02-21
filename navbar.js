class MyNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar">
            <div class="logo">>./loadIssaShaabanPortfolio()</div> <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="cv.html">CV</a></li>
                <li><a href="projects.html">Projects</a></li>
            </ul>
        </nav>
        `;
    }
}
customElements.define('main-navbar', MyNavbar);

function switchProject(event, projectId) {
    const views = document.querySelectorAll('.project-view');
    views.forEach(view => view.classList.remove('active'));

    const tabs = document.querySelectorAll('.tab-link');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(projectId).classList.add('active');
    event.currentTarget.classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectToOpen = params.get('project');

    if (projectToOpen) {
        const targetBtn = document.querySelector(`button[onclick*="'${projectToOpen}'"]`);

        if (targetBtn) {
            targetBtn.click();
        }
    }
});