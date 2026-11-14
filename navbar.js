document.documentElement.classList.add('js');

class MainNavbar extends HTMLElement {
    connectedCallback() {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        const links = [
            ['index.html', 'Home'],
            ['cv.html', 'CV'],
            ['projects.html', 'Projects'],
        ];

        this.innerHTML = `
        <nav class="navbar" aria-label="Main navigation">
            <a class="logo" href="index.html" aria-label="Issa Shaaban, home">
                <span class="logo-full"><span>&gt;./</span>loadIssaShaabanPortfolio()</span>
                <span class="logo-short"><span>&gt;./</span>issa</span>
            </a>
            <ul class="nav-links">
                ${links.map(([href, label]) =>
                    `<li><a href="${href}"${href === current ? ' aria-current="page"' : ''}>${label}</a></li>`
                ).join('')}
            </ul>
        </nav>
        `;
    }
}
customElements.define('main-navbar', MainNavbar);

// Old links used ?project=MobileApp before the page was renamed to Wyst.
const PROJECT_ALIASES = { MobileApp: 'Wyst' };

function showProject(projectId, updateUrl) {
    const target = document.getElementById(projectId);
    if (!target || !target.classList.contains('project-view')) return;

    document.querySelectorAll('.project-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(tab => {
        const selected = tab.dataset.project === projectId;
        tab.classList.toggle('active', selected);
        tab.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
    target.classList.add('active');

    if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('project', projectId);
        history.replaceState(null, '', url);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Project tabs
    document.querySelectorAll('.tab-link').forEach(tab => {
        tab.addEventListener('click', () => showProject(tab.dataset.project, true));
    });

    const requested = new URLSearchParams(window.location.search).get('project');
    if (requested) {
        showProject(PROJECT_ALIASES[requested] || requested, false);
    }

    // Fade sections in as they scroll into view
    const revealItems = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
});
