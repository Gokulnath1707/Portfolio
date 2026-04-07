const projectListContainer = document.getElementById('projectList');
const projectCount = document.getElementById('projectCount');

function createProjectLinks(links) {
  const githubLink = links.github
    ? `<a href="${links.github}" target="_blank" rel="noopener noreferrer" class="btn-primary project-action">GitHub Repo</a>`
    : `<span class="project-action disabled">Add GitHub Repo Link</span>`;

  const liveLink = links.live
    ? `<a href="${links.live}" target="_blank" rel="noopener noreferrer" class="btn-primary project-action project-action-secondary">Live Demo</a>`
    : `<span class="project-action disabled">Add Live Project Link</span>`;

  return `${githubLink}${liveLink}`;
}

if (projectListContainer && Array.isArray(window.projectsData)) {
  projectListContainer.innerHTML = window.projectsData
    .map(
      (project) => `
        <article id="${project.id}" class="project-detail-card reveal">
          <button class="project-detail-toggle" type="button" aria-expanded="false" aria-controls="${project.id}-details">
            <div class="project-detail-media">
              <img src="${project.image}" alt="${project.title}">
              <span class="project-badge ${project.badge.className}">${project.badge.label}</span>
            </div>
            <div class="project-detail-content">
              <p class="project-detail-kicker">Detailed Project</p>
              <div class="project-detail-heading">
                <h2>${project.title}</h2>
                <span class="project-expand-indicator">View Details</span>
              </div>
              <p class="project-detail-summary">${project.summary}</p>
            </div>
          </button>
          <div id="${project.id}-details" class="project-detail-panel" hidden>
            <div class="project-detail-panel-inner">
              <div class="project-tags">
                ${project.tech.map((item) => `<span class="tag">${item}</span>`).join('')}
              </div>
              <div class="project-detail-grid">
                <div class="project-detail-block">
                  <h3>Overview</h3>
                  <p>${project.overview}</p>
                </div>
                <div class="project-detail-block">
                  <h3>Outcome</h3>
                  <p>${project.outcome}</p>
                </div>
              </div>
              <div class="project-detail-block">
                <h3>Key Highlights</h3>
                <ul class="project-feature-list">
                  ${project.features.map((feature) => `<li>${feature}</li>`).join('')}
                </ul>
              </div>
              <div class="project-actions">
                ${createProjectLinks(project.links)}
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  if (projectCount) {
    projectCount.textContent = `${window.projectsData.length} projects listed`;
  }

  projectListContainer.querySelectorAll('.project-detail-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const panelId = toggle.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      if (!panel) return;

      toggle.setAttribute('aria-expanded', String(!isExpanded));
      toggle.closest('.project-detail-card')?.classList.toggle('expanded', !isExpanded);
      panel.hidden = isExpanded;
    });
  });

  if (window.location.hash) {
    const targetCard = document.querySelector(window.location.hash);
    const targetToggle = targetCard?.querySelector('.project-detail-toggle');
    const targetPanelId = targetToggle?.getAttribute('aria-controls');
    const targetPanel = targetPanelId ? document.getElementById(targetPanelId) : null;

    if (targetCard && targetToggle && targetPanel) {
      targetToggle.setAttribute('aria-expanded', 'true');
      targetCard.classList.add('expanded');
      targetPanel.hidden = false;

      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }
}
