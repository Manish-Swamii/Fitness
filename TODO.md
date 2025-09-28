# Redesign Fitness Website to Match Wix BizBud Template

## Overview
Transform the current fitness calculator SPA into a modern design mimicking the Wix "BizBud" template: purple theme, hero with waves, fixed nav, grid sections, animated elements, while preserving all functionality (auth, calculations, section toggling).

## Steps

- [ ] **Step 1: Update index.html**
  - Add Google Fonts (Poppins).
  - Create hero section with title, subtitle, buttons, wave background (SVG or div).
  - Restructure nav as fixed top bar with submenus for calculators/plans.
  - Convert auth to modal (hidden div with forms).
  - Wrap calculator/content sections in main with grid classes (e.g., services-grid for calculators).
  - Preserve all forms, inputs, results divs, and IDs for JS compatibility.
  - Add IDs/classes for new elements (e.g., #hero, .modal, .nav-link).

- [ ] **Step 2: Overhaul style.css**
  - Update colors: Primary #A100A1 (purple), light bg #F8F9FF, text #333/#555.
  - Fonts: 'Poppins', sans-serif; large bold headings.
  - Style hero: Full-width, gradient overlay, centered text/buttons, wave animation.
  - Fixed nav: Purple bg, white text, dropdown submenus.
  - Add wave CSS: Animated curves/keyframe in purple shades.
  - Sections: Grid layouts, card styles with shadows/rounds, enhanced fade-ins.
  - Modal: Overlay, centered, fade animation.
  - Forms/Results: Rounded inputs, purple accents, category colors.
  - Animations: Wave movement, button scales, preserve/enhance dumbbell.
  - Responsive: Mobile stacking, nav hamburger if needed.

- [ ] **Step 3: Tweak script.js**
  - Update showAuth: Open/close modal instead of sections.
  - Adapt showSection: Handle new nav links/submenu toggles.
  - Add modal event listeners (close on outside click, sign in button).
  - Hero buttons: "Get Started" -> showSection('bmi'), "Learn More" -> 'discover'.
  - Preserve all calculations, localStorage, init logic.

- [ ] **Step 4: Testing**
  - Use browser_action to launch local index.html.
  - Verify: Layout (hero/nav/sections), animations (waves/fades), functionality (auth, calculate BMI/BMR/etc., toggle sections).
  - Check responsive on mobile view if possible.
  - Close browser after verification.

- [ ] **Step 5: Final Review**
  - Update TODO.md with completion notes.
  - Attempt completion with summary and demo command (e.g., open index.html).
