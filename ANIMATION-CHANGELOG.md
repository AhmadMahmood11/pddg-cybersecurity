# PDDG Premium Motion Redesign

## Technology used

The existing project is a static multi-page website built with HTML, CSS, and JavaScript. The redesign therefore uses:

- GSAP 3.13 and ScrollTrigger for entrance, scroll, stagger, parallax, SVG, counter, and transition animation
- Lenis 1.3.23 for smooth scrolling on supported desktop screens
- CSS keyframes for ambient gradients, icon halos, grids, and low-cost background movement
- Native Canvas for the cybersecurity network visualization

The libraries are loaded from public CDNs. The website remains readable and functional if an animation library does not load.

## Hero changes

- Reduced the homepage hero height and visual density
- Reduced every inner-page hero to a compact page header
- Replaced long hero wording with a short headline and one supporting line
- Kept only one primary CTA inside each hero
- Moved secondary CTAs and existing hero status labels into a slim support rail below the hero
- Reduced conversion and legal page headers further so forms and content appear sooner
- Preserved all non-hero website copy exactly

## Animation system

### Page load

- Page-cover transition retracts on load
- Hero eyebrow, title, supporting line, CTA, visual, and labels enter in sequence
- Hero background includes slow gradient orbs, a moving beam, and a drifting technical grid

### Scroll

- Every `.reveal` element animates with GSAP and ScrollTrigger
- Repeated cards and list items stagger into view
- Hero visual layers and selected panels use subtle parallax
- Report bars animate from zero to their final width
- Critical, High, and Moderate values count up when visible

### Icons and interfaces

- SVG paths draw into view using stroke animation
- Icon containers use a slow rotating gradient halo
- Service, industry, process, and credential visuals use subtle hover and idle movement
- The canvas network pauses when outside the viewport

### Interactions

- Buttons use a magnetic pointer response on desktop
- Cards use pointer-position glow and restrained perspective depth
- Buttons, links, nav items, and cards have refined hover responses
- The navbar becomes smaller and more opaque after scrolling
- The top progress line tracks page position
- Internal links use a multi-page fade and slide transition
- FAQ items use single-open accordion behavior

## Accessibility and performance

- `prefers-reduced-motion` disables smooth scrolling, parallax, page transitions, and continuous decorative motion
- Heavy pointer effects are disabled on touch and mobile screens
- Inner-page hero visuals are reduced or removed on conversion and legal pages
- Canvas rendering pauses outside the viewport
- Content remains visible if GSAP, ScrollTrigger, or Lenis is unavailable

## Where to edit effects

- `assets/css/styles.css`
  - Search for `PDDG PREMIUM AI / CYBERSECURITY REDESIGN OVERRIDES`
  - Each visual system and animation group is numbered and commented
- `assets/js/main.js`
  - Each animation and interaction group is numbered and commented
- Individual HTML files
  - Animation hooks use attributes such as `data-hero`, `data-gsap-group`, `data-parallax`, `data-magnetic`, and `data-count`
