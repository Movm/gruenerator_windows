document.addEventListener('DOMContentLoaded', () => {
  const contentWebview = document.getElementById('content-webview');
  const homeLink = document.getElementById('home');
  const antraegeLink = document.getElementById('antraege');
  const socialMediaLink = document.getElementById('social-media');
  const pressemitteilungenLink = document.getElementById('pressemitteilungen');
  const menuLinks = [homeLink, antraegeLink, socialMediaLink, pressemitteilungenLink];

  function loadContent(hash) {
    console.log(`Loading content for hash: ${hash}`); // Debug message
    switch (hash) {
      case '#antraege':
        contentWebview.src = 'https://gruenerator.de/app_antraege';
        setActiveLink(antraegeLink);
        break;
      case '#social-media':
        contentWebview.src = 'https://gruenerator.de/app_social';
        setActiveLink(socialMediaLink);
        break;
      case '#pressemitteilungen':
        contentWebview.src = 'https://gruenerator.de/app_presse';
        setActiveLink(pressemitteilungenLink);
        break;
      default:
        contentWebview.src = 'https://gruenerator.de';
        setActiveLink(homeLink);
        break;
    }
  }

  function setActiveLink(activeLink) {
    menuLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }

  window.addEventListener('hashchange', () => {
    console.log(`Hash changed to: ${window.location.hash}`); // Debug message
    loadContent(window.location.hash);
  });

  loadContent(window.location.hash);

  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'start.html';
  });

  antraegeLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#antraege';
    loadContent('#antraege');
  });

  socialMediaLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#social-media';
    loadContent('#social-media');
  });

  pressemitteilungenLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#pressemitteilungen';
    loadContent('#pressemitteilungen');
  });
});
