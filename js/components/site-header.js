function renderSiteHeader(rootPath = "") {
  const chevron = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;
  const globe = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  const heart = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const search = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`;
  const hamburger = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
  const menuIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
  const chevronSm = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;

  return `
    <header class="site-header">
      <div class="site-header__utility">
        <button class="site-header__lang">${globe} English ${chevron}</button>
        <div class="site-header__utility-right">
          <a href="#" class="site-header__donate">${heart} Donate</a>
          <button class="site-header__search" aria-label="Search">${search}</button>
        </div>
      </div>
      <div class="site-header__main-row">
        <a href="${rootPath}index.html" class="site-header__logo">
          <img src="${rootPath}assets/logo-healthychidren.png" alt="HealthyChildren.org" class="site-header__logo-img">
        </a>
        <div class="site-header__desktop-actions">
          <button class="site-header__lang">${globe} English ${chevron}</button>
          <a href="#" class="site-header__donate">${heart} Donate</a>
          <button class="site-header__search" aria-label="Search">${search}</button>
        </div>
        <button class="site-header__hamburger" aria-label="Menu">${hamburger}</button>
      </div>
    </header>

    <nav class="site-nav">
      <ul class="site-nav__list">
        <li><a href="#" class="site-nav__link">${menuIcon} All Topics</a></li>
        <li><a href="#" class="site-nav__link">Ages &amp; Stages ${chevronSm}</a></li>
        <li><a href="#" class="site-nav__link">Health Issues</a></li>
        <li><a href="#" class="site-nav__link">Emerging Issues</a></li>
        <li><a href="#" class="site-nav__link">Tools &amp; Resources ${chevronSm}</a></li>
        <li><a href="#" class="site-nav__link">News</a></li>
      </ul>
    </nav>

    <div class="sub-header">
      <div class="sub-header__inner">
        <span class="sub-header__tagline">Powered by pediatricians. Trusted by parents.</span>
        <div class="sub-header__aap">
          <span>from the <a href="#">American Academy of Pediatrics</a></span>
          <img src="${rootPath}assets/seal-AAP.png" alt="AAP Seal" class="sub-header__seal">
        </div>
      </div>
    </div>`;
}
