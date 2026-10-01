# Portfolio Website

A fast, responsive personal portfolio built with plain **HTML, CSS and JavaScript**.
There's no framework, no build step and no dependencies. Open it in a browser and it works.

## Features

- Responsive layout that works from phones to wide desktop screens
- Light and dark themes that follow the system setting, with a toggle the browser remembers
- Hero section with a typewriter effect and a "Download CV" button
- About section with animated stats
- Skills, Projects and Experience rendered from a single data file (`js/data.js`)
- Project filtering by category, plus generated preview images when you don't have screenshots yet
- Contact form with validation and a spam honeypot. It opens the visitor's email app, or posts to Formspree
- Scroll-reveal animations and active-section highlighting in the nav
- Accessibility: skip link, keyboard navigation, focus styles, ARIA labels, and support for `prefers-reduced-motion`
- SEO basics: meta description, Open Graph tags, `robots.txt` and a custom `404.html`

## Project structure

```
portfolio/
├── index.html            # Page markup (hero, about, contact and section shells)
├── 404.html              # "Page not found" page
├── robots.txt
├── css/
│   └── style.css         # All styles: design tokens, layout, components, animations
├── js/
│   ├── data.js           # Your content: skills, projects, experience
│   └── main.js           # Interactivity: theme, menu, rendering, filters, form
└── assets/
    ├── favicon.svg
    ├── resume.pdf        # Placeholder: replace with your CV
    └── images/
        └── avatar.svg    # Placeholder: replace with your photo
```

## Run it locally

You can simply double-click `index.html`, but a local server is closer to how it will run online:

```bash
# from inside the portfolio folder
python -m http.server 5500
```

Then open <http://localhost:5500>.

(VS Code users can also use the **Live Server** extension.)

## Make it yours

| What | Where |
| --- | --- |
| Name, headline, intro and about text | `index.html` (search for `Your Name`, `Your City`) |
| Email and social links | `index.html` (search for `you@example.com`, `your-username`, `your-profile`, `your-handle`) |
| Typewriter phrases | `data-words` attribute on `#typed` in `index.html` |
| Stats (years, projects…) | `data-count` values in the About section of `index.html` |
| Skills, projects, experience | `js/data.js` |
| Photo | Add `assets/images/avatar.jpg` and update the `<img>` in the hero |
| CV | Replace `assets/resume.pdf` (keep the file name) |
| Colors and fonts | Design tokens at the top of `css/style.css` (`--accent`, `--font-display`…) |
| Logo initials / favicon | `.logo` in `index.html` and `assets/favicon.svg` |

### Project screenshots

Put images in `assets/images/projects/` and set `image` on the project in `js/data.js`:

```js
{ title: "ShopSphere", image: "assets/images/projects/shopsphere.png", ... }
```

A 16:10 ratio (e.g. 1280×800) looks best. Projects without an image get a generated preview; change its color with `hue` (0 to 360).

### Contact form

By default the form opens the visitor's email app with the message filled in, sent to the address in `data-mailto`.

To receive messages directly without a backend:

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy your endpoint URL (e.g. `https://formspree.io/f/abcdwxyz`).
3. Paste it into the form's `data-endpoint` attribute in `index.html`.

## Deploy

It's a static site, so any static host works:

- **GitHub Pages**: push the folder to a repo, then go to *Settings → Pages* and deploy from the `main` branch.
- **Netlify**: drag and drop the `portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel**: `vercel` from inside the folder, or import the repo in the dashboard.

After deploying, add your live URL to the Open Graph tags in `index.html` (e.g. `og:url`, and an `og:image` for link previews).

## Browser support

Current versions of Chrome, Edge, Firefox and Safari.
