function renderSiteFooter(rootPath = "") {
  const socialIcons = [
    { name: "Instagram", file: "instagram.svg" },
    { name: "Facebook", file: "facebook.svg" },
    { name: "Threads", file: "threads.svg" },
    { name: "TikTok", file: "tiktok.svg" },
    { name: "YouTube", file: "youtube.svg" },
    { name: "Pinterest", file: "pinterest.svg" },
    { name: "LinkedIn", file: "linkedin.svg" },
  ];

  const footerLinks = [
    "About Us", "Contact Us", "Medical Editor &amp; Contributors",
    "Our Mission", "Shop AAP", "Editorial Policy",
    "AAP in Action", "Sponsors", "Privacy Policy",
    "Spread the Word", "Sponsorship Opportunities", "Terms of Use",
  ];

  const socialHtml = socialIcons
    .map(icon => `<a href="#" aria-label="${icon.name}"><img src="${rootPath}assets/${icon.file}" alt="${icon.name}" class="social-icon"></a>`)
    .join("\n          ");

  const linksHtml = footerLinks
    .map(link => `<a href="#">${link}</a>`)
    .join("\n          ");

  return `
    <footer class="site-footer">
      <div class="site-footer__top">
        <div class="site-footer__top-inner">
          <a href="${rootPath}index.html" class="site-footer__logo">
            <img src="${rootPath}assets/logo-healthychildren.png" alt="HealthyChildren.org" class="site-footer__logo-img">
          </a>
          <div class="site-footer__social">
            ${socialHtml}
          </div>
        </div>
      </div>
      <div class="site-footer__body">
        <div class="site-footer__aap">
          <img src="${rootPath}assets/logo-AAP.png" alt="From the American Academy of Pediatrics — Dedicated to the Health of All Children" class="site-footer__aap-img">
        </div>
        <div class="site-footer__links">
          ${linksHtml}
        </div>
      </div>
      <div class="site-footer__bottom">
        &copy; Copyright 2026 American Academy of Pediatrics. All rights reserved
      </div>
    </footer>`;
}
