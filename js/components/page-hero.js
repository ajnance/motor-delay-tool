function renderPageHero(options = {}) {
  const {
    title = "Page Title",
    description = "",
    showLangLink = true,
    imageUrl = "",
    imageAlt = "",
  } = options;

  const globe = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
  const placeholder = `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#b0aeb5" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`;

  const langHtml = showLangLink
    ? `<div class="hero__lang">${globe} <a href="#">en espa&ntilde;ol</a></div>`
    : "";

  const imageContent = imageUrl
    ? `<img src="${imageUrl}" alt="${imageAlt}">`
    : placeholder;

  return `
    <section class="hero">
      <div class="hero__inner">
        <div class="hero__text">
          <h1 class="hero__title">${title}</h1>
          ${langHtml}
          ${description ? `<p class="hero__desc">${description}</p>` : ""}
        </div>
        <div class="hero__image">
          ${imageContent}
        </div>
      </div>
    </section>`;
}
