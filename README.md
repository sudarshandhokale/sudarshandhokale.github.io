# Sudarshan Dhokale — Interactive Portfolio

A responsive, dependency-free personal portfolio designed for a recruiter's first visit.

## Preview
Open index.html in a modern browser. It works directly from disk. No build step, package installation or backend is required.

## Interactions
- A 60-second introduction dialog, with keyboard focus and Escape-to-close.
- XING / YogaEasy / Kumolus work-story tabs, with arrow-key navigation.
- Four XING cases displayed one at a time, with direct selection, keyboard navigation and Previous/Next controls.
- Each case has its own Before/After conceptual view; comparison state is preserved when changing cases.
- Permanent SAFEGO product showcase with a conceptual trip journey, visible feature groups and an end-to-end engineering/delivery summary.
- XING cases cover audience synchronization, partner conversions, a customer data platform built from scratch using Segment across XING/kununu/onlyfy, and team-service AWS migration.
- Mobile navigation menu with keyboard and click-away dismissal.
- Experience counter calculated from September 2013 and current copyright year.
- Expandable project scope and interview questions.
- Contact choices include a selectable email field, copy action with selection fallback, optional email-app link and LinkedIn.
- Get in touch uses an in-page anchor and does not depend on an installed email application.
- Reading-progress indicator and stable current-section navigation, updated once per animation frame.
- Solid sticky header and stationary hover targets avoid scroll-related blur and hover flicker.
- Direct engineering headline, larger supporting labels and a two-column XING selector below 1000px improve scanning on smaller screens.

Core content is available without JavaScript. Reduced-motion preferences are respected.

## Files
- index.html — semantic page and content.
- styles.css — responsive design, mobile layouts, accessibility and print styles.
- app.js — interaction logic; no external dependencies or network requests.
- assets/sudarshan-dhokale.png — supplied portrait, unchanged.
- assets/Sudarshan_Dhokale_CV.pdf — supplied CV download.
- assets/favicon.svg — monogram icon.
- .nojekyll — plain static hosting marker.

## GitHub Pages
Place these files at the root of your repository, keeping the assets folder intact. Configure GitHub Pages to publish the chosen branch's root folder. No build process is needed. Relative paths support both a primary user site and a project site.

## Content and privacy
- Public title remains Senior Software Engineer; the portrait filename does not imply CTO positioning.
- XING MAU/DAU figures describe platform scale, not traffic owned by one service.
- Kumolus leadership scope is through reporting team leads.
- Wearo is clearly marked as a prototype. Project artwork is illustrative.
- SAFEGO feature visuals are conceptual illustrations, not live customer dashboards or product screenshots. Confirmed MVP capabilities are presented; planned camera/advanced AI evidence features are excluded.
- SAFEGO is an independent, part-time venture: building since 2024, company registered 2026, MVP built and customer onboarding pending. Product and technology ownership is distinguished from the co-founder’s sales/marketing role.
- XING dates use years because supplied CV and LinkedIn differ on the starting month.
- The supplied CV contains contact details and is intentionally included as a download.
- No analytics, contact-form backend, external fonts, API keys or trackers are included.

## Updating
Edit content in index.html, styling in styles.css and interactions in app.js. Replace the portrait and CV at the same paths to update them. Public project/store links can be added when available; none are invented.

## Verification
JavaScript syntax and local asset/anchor/accessibility-reference checks passed. Interaction and clipboard fallback logic was tested with a minimal DOM harness; career year calculation passed 10 date-boundary checks. Browser-native behavior remains unverified. Browser-based visual/responsive verification was unavailable in the authoring environment; check the page on desktop and mobile before publication.

## Experience counter
The visible career total is calculated at page load from September 2013 using completed years. It changes to 14+ in September 2027. Page metadata uses the stable wording “since 2013.” The PDF is a separate static document and does not change automatically.
