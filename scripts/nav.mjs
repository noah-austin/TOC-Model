// One header for every page of the site, so navigation is the same everywhere.
//
//   [PAX] Roof Lifecycle Tool   Report builder · Library · Assumptions · User guide    [page actions]
//
// - The four destinations always appear, in the same order; the current one is marked.
// - Page actions (Copy link, Print) sit on the right and only on pages that have them.
// - A shared customer link (report page with ?view=report) hides the internal
//   navigation: the report page sets body.report-only, and the CSS below handles it.
// - On narrow screens the navigation moves to its own scrollable row.

export const NAV_CSS = `
  .site-bar { position: sticky; top: 0; z-index: 30; background: #1C2B39; color: #fff; display: flex; align-items: center; gap: 8px 24px; padding: 0 20px; min-height: 56px; flex-wrap: wrap; }
  .site-brand { display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none; font-weight: 800; font-size: 13px; letter-spacing: .02em; white-space: nowrap; padding: 12px 0; }
  .site-brand svg { display: block; flex: none; }
  .site-brand .shared-name { display: none; letter-spacing: .14em; font-size: 12px; }
  .site-nav { display: flex; align-items: stretch; gap: 4px; align-self: stretch; }
  .site-nav a { display: flex; align-items: center; gap: 6px; padding: 0 12px; color: #C5CED4; text-decoration: none; font-size: 13px; font-weight: 600; white-space: nowrap; border-bottom: 3px solid transparent; border-top: 3px solid transparent; }
  .site-nav a:hover { color: #fff; }
  .site-nav a[aria-current="page"] { color: #fff; border-bottom-color: #CD163F; }
  .site-nav a .s { display: none; }
  .site-nav a small { font-size: 9.5px; font-weight: 700; letter-spacing: .06em; border: 1px solid rgba(255,255,255,.35); border-radius: 3px; padding: 0 4px; line-height: 15px; }
  .site-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; padding: 10px 0; }
  .site-actions:empty { display: none; }
  .site-bar .btn { text-decoration: none; height: 34px; padding: 0 14px; border-radius: 6px; font: inherit; font-size: 12.5px; font-weight: 700; cursor: pointer; border: 1px solid rgba(255,255,255,.3); background: transparent; color: #fff; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
  .site-bar .btn:hover { background: rgba(255,255,255,.08); }
  .site-bar .btn.primary { background: #CD163F; border-color: #CD163F; }
  .site-bar .btn.primary:hover { background: #A8102F; }
  .site-bar .btn svg { width: 15px; height: 15px; flex: none; }
  .site-bar .toast { font-size: 12px; color: #9FD9B4; white-space: nowrap; }
  .site-bar a:focus-visible, .site-bar button:focus-visible { outline: 2px solid #DD971A; outline-offset: 2px; }
  @media (max-width: 860px) {
    .site-bar { position: static; padding: 0 16px; gap: 0 12px; flex-wrap: wrap; }
    .site-nav a .l { display: none; }
    .site-nav a .s { display: inline; }
    .site-nav { order: 3; flex-basis: 100%; overflow-x: auto; margin: 0 -16px; padding: 0 8px; border-top: 1px solid rgba(255,255,255,.12); scrollbar-width: none; }
    .site-nav a { padding: 0 10px; min-height: 42px; }
    .site-actions { padding: 8px 0; }
    .site-bar .btn { padding: 0 11px; }
    .site-bar .btn .opt { display: none; }
  }
  @media (max-width: 520px) { .site-brand .tool-name { display: none; } .site-nav { justify-content: space-between; } .site-nav a { padding: 0 8px; } }
  /* Shared customer link: brand + report actions only. */
  body.report-only .site-nav { display: none; }
  body.report-only .site-brand { pointer-events: none; }
  body.report-only .site-brand .tool-name { display: none; }
  body.report-only .site-brand .shared-name { display: inline; }
  @media (max-width: 520px) { body.report-only .site-brand .shared-name { display: none; } }
  @media print { .site-bar { display: none !important; } }
`;

const PAX_MARK = '<svg width="40" height="20" viewBox="0 0 40 20" aria-hidden="true"><rect width="40" height="20" rx="3" fill="#CD163F"/><text x="20" y="14.2" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="11" font-weight="800" fill="#fff" letter-spacing="1">PAX</text></svg>';

const PAGES = [
  ['builder', 'index.html', '<span class="l">Report builder</span><span class="s">Builder</span>'],
  ['library', 'library/index.html', 'Library'],
  ['assumptions', 'assumptions/index.html', 'Assumptions'],
  ['guide', 'library/PAX-Roof-TCO-Guide.pdf', '<span class="l">User guide</span><span class="s">Guide</span> <small>PDF</small>'],
];

// active: 'builder' | 'library' | 'assumptions'; prefix: '' at the site root, '../' one level down.
export function navHtml(active, prefix, actions = '') {
  const links = PAGES.map(([id, href, label]) =>
    `<a href="${prefix}${href}"${id === active ? ' aria-current="page"' : ''}${id === 'guide' ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`).join('');
  return `<header class="site-bar">
  <a class="site-brand" href="${prefix}index.html">${PAX_MARK}<span class="tool-name">Roof Lifecycle Tool</span><span class="shared-name">SERVICES GROUP</span></a>
  <nav class="site-nav" aria-label="Main">${links}</nav>
  <div class="site-actions">${actions}</div>
</header>`;
}
