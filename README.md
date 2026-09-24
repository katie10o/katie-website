# Camp Signal
Open index.html in a browser. Each folder is completely standalone and can be uploaded directly to GitHub Pages or a static host. No installation, compilation, external fonts, or server is required.

Pages: index.html, research.html, publications.html, cv.html.
Styling: styles.css. Interactions: script.js. Browser icon: favicon.svg. Portrait: images/kaitlyn-klabacka.jpg.

Katie's supplied PDF is included as `cv.pdf`. The PDF button on the web CV points to that filename. To update it later, replace `cv.pdf` while keeping the filename. The navigation's CV link intentionally opens `cv.html`.

Publication entries are plain HTML. Set data-type="paper", "abstract", or "workshop" on each article.pub. Match each copy button's data-copy value to the corresponding pre element's unique ID. Update the initial result count when changing entries. Search and filters are local; no data leaves the browser.

Print / Save as PDF uses the browser print dialog with a print-specific layout. The separate Download CV PDF button opens the included `cv.pdf`.

Accessibility: semantic landmarks, active-page labels, skip link, keyboard menu with Escape, native details, status announcements, reduced-motion support, and content readable with JavaScript disabled.
