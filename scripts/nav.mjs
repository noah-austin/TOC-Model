// One header for every page of the site, in two levels so it is always clear where you are.
//
//   Main bar (identical everywhere):
//     [PAX] Roof Lifecycle Tool   Home · Generic cost curves · Custom cost curve        User guide · Assumptions (admin)
//   Section bar (per section):
//     Section name   [tabs, e.g. Build a report | Ready-made reports]                   [page actions]
//
// - Generic cost curves (research averages, no inputs) and Custom cost curve (one customer's
//   roof) are the two tools. The ready-made reports belong to Custom; Assumptions is an
//   admin page, so it sits with the guide on the right rather than beside the tools.
// - Page actions (Copy link, Print, PDF) live in the section bar, never in the main bar.
// - A shared customer link (report page with ?view=report) hides the navigation and tabs:
//   the report page sets body.report-only, and the CSS below handles it.
// - The header scrolls away with the page, so side panels can stick to the top.

export const NAV_CSS = `
  .site-bar { background: #1C2B39; color: #fff; display: flex; align-items: stretch; gap: 0 28px; padding: 0 20px; min-height: 52px; flex-wrap: wrap; }
  .site-brand { display: flex; align-items: center; gap: 10px; color: #fff; text-decoration: none; font-weight: 800; font-size: 13px; letter-spacing: .02em; white-space: nowrap; padding: 12px 0; }
  .site-brand svg { display: block; flex: none; }
  .site-brand .shared-name { display: none; letter-spacing: .14em; font-size: 12px; }
  .site-nav, .site-util { display: flex; align-items: stretch; gap: 2px; }
  .site-util { margin-left: auto; }
  .site-nav a, .site-util a { display: flex; align-items: center; gap: 6px; padding: 0 12px; color: #C5CED4; text-decoration: none; font-size: 13px; font-weight: 600; white-space: nowrap; border-bottom: 3px solid transparent; border-top: 3px solid transparent; }
  .site-util a { font-size: 12px; font-weight: 600; color: #9AA7B0; }
  .site-nav a:hover, .site-util a:hover { color: #fff; }
  .site-nav a[aria-current="page"], .site-util a[aria-current="page"] { color: #fff; border-bottom-color: #CD163F; }
  .site-nav a .s, .site-util a .s { display: none; }
  .site-util small { font-size: 9px; font-weight: 700; letter-spacing: .06em; border: 1px solid rgba(255,255,255,.3); border-radius: 3px; padding: 0 4px; line-height: 14px; }
  .sub-bar { background: #fff; border-bottom: 1px solid #DCE1E4; display: flex; align-items: center; gap: 8px 22px; padding: 0 20px; min-height: 52px; flex-wrap: wrap; }
  .sub-title { font-size: 15px; font-weight: 800; color: #1C2B39; white-space: nowrap; padding: 12px 0; }
  .sub-title span { font-weight: 600; font-size: 12px; color: #5E6A73; margin-left: 8px; }
  .sub-tabs { display: flex; align-self: stretch; gap: 4px; }
  .sub-tabs a { display: flex; align-items: center; padding: 0 12px; font-size: 13px; font-weight: 700; color: #5E6A73; text-decoration: none; border-bottom: 3px solid transparent; border-top: 3px solid transparent; white-space: nowrap; }
  .sub-tabs a:hover { color: #1C2B39; }
  .sub-tabs a[aria-current="page"] { color: #1C2B39; border-bottom-color: #1C2B39; }
  .site-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; padding: 9px 0; }
  .site-actions:empty { display: none; }
  .sub-bar .btn { text-decoration: none; height: 34px; padding: 0 14px; border-radius: 6px; font: inherit; font-size: 12.5px; font-weight: 700; cursor: pointer; border: 1px solid #C9D0D4; background: #fff; color: #1C2B39; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
  .sub-bar .btn:hover { border-color: #1C2B39; }
  .sub-bar .btn.primary { background: #CD163F; border-color: #CD163F; color: #fff; }
  .sub-bar .btn.primary:hover { background: #A8102F; border-color: #A8102F; }
  .sub-bar .btn svg { width: 15px; height: 15px; flex: none; }
  .sub-bar .toast { font-size: 12px; color: #1A6B3C; font-weight: 700; white-space: nowrap; }
  .site-bar a:focus-visible, .sub-bar a:focus-visible, .sub-bar button:focus-visible { outline: 2px solid #DD971A; outline-offset: 2px; }
  @media (max-width: 860px) {
    .site-bar { padding: 0 16px; gap: 0 12px; }
    .site-nav a .l, .site-util a .l { display: none; }
    .site-nav a .s, .site-util a .s { display: inline; }
    .site-nav { order: 3; flex-basis: 100%; margin: 0 -16px; padding: 0 8px; border-top: 1px solid rgba(255,255,255,.12); overflow-x: auto; scrollbar-width: none; }
    .site-nav a { padding: 0 10px; min-height: 42px; }
    .sub-bar { padding: 0 16px; gap: 0 12px; }
    .sub-tabs { order: 3; flex-basis: 100%; margin: 0 -16px; padding: 0 6px; border-top: 1px solid #EBEEF0; overflow-x: auto; scrollbar-width: none; }
    .sub-tabs a { min-height: 40px; }
    .sub-bar .btn { padding: 0 11px; }
    .sub-bar .btn .opt { display: none; }
  }
  @media (max-width: 520px) { .site-brand .tool-name { display: none; } .site-util small { display: none; } .sub-title span { display: none; } }
  /* Shared customer link: brand, report title and actions only. */
  body.report-only .site-nav, body.report-only .site-util, body.report-only .sub-tabs, body.report-only .sub-title { display: none; }
  body.report-only .site-brand { pointer-events: none; }
  body.report-only .site-brand .tool-name { display: none; }
  body.report-only .site-brand .shared-name { display: inline; }
  @media print { .site-bar, .sub-bar { display: none !important; } }
`;

const PAX_MARK = '<svg width="40" height="20" viewBox="0 0 40 20" aria-hidden="true"><rect width="40" height="20" rx="3" fill="#CD163F"/><text x="20" y="14.2" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="11" font-weight="800" fill="#fff" letter-spacing="1">PAX</text></svg>';

// Sections and the pages inside them. `section` decides which main-bar link is marked.
const MAIN = [
  ['home', 'index.html', 'Home', 'Home'],
  ['generic', 'generic/index.html', 'Generic cost curves', 'Generic'],
  ['custom', 'custom/index.html', 'Custom cost curve', 'Custom'],
];
const UTIL = [
  ['guide', 'library/PAX-Roof-TCO-Guide.pdf', 'User guide <small>PDF</small>', 'Guide'],
  ['assumptions', 'assumptions/index.html', 'Assumptions <small>ADMIN</small>', 'Admin'],
];
const SECTIONS = {
  home: { title: '' },
  generic: { title: 'Generic cost curves', note: 'Research averages, no inputs' },
  custom: { title: 'Custom cost curve', note: 'For one customer’s roof',
    tabs: [['builder', 'custom/index.html', 'Build a report'], ['library', 'library/index.html', 'Ready-made reports']] },
  assumptions: { title: 'Assumptions', note: 'Admin: the numbers behind the custom reports' },
};
const PAGE_SECTION = { home: 'home', generic: 'generic', builder: 'custom', library: 'custom', assumptions: 'assumptions' };

// page: 'home' | 'generic' | 'builder' | 'library' | 'assumptions'
// prefix: '' at the site root, '../' one level down. actions: page buttons (section bar).
export function navHtml(page, prefix, actions = '') {
  const section = PAGE_SECTION[page];
  const link = ([id, href, long, short], current) =>
    `<a href="${prefix}${href}"${current ? ' aria-current="page"' : ''}${id === 'guide' ? ' target="_blank" rel="noopener"' : ''}><span class="l">${long}</span><span class="s">${short}</span></a>`;
  const s = SECTIONS[section];
  const tabs = s.tabs ? `<nav class="sub-tabs" aria-label="${s.title}">${s.tabs.map(([id, href, label]) =>
    `<a href="${prefix}${href}"${id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>` : '';
  const sub = s.title ? `
<div class="sub-bar">
  <div class="sub-title">${s.title}${s.note ? `<span>${s.note}</span>` : ''}</div>
  ${tabs}
  <div class="site-actions">${actions}</div>
</div>` : '';
  return `<header class="site-bar">
  <a class="site-brand" href="${prefix}index.html">${PAX_MARK}<span class="tool-name">Roof Lifecycle Tool</span><span class="shared-name">SERVICES GROUP</span></a>
  <nav class="site-nav" aria-label="Main">${MAIN.map((m) => link(m, m[0] === section)).join('')}</nav>
  <nav class="site-util" aria-label="Help and admin">${UTIL.map((u) => link(u, u[0] === section)).join('')}</nav>
</header>${sub}`;
}
