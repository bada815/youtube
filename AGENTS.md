# Agent Guidelines for YouTube Analysis Tool

This document provides guidelines for AI coding agents working on this YouTube competitor analysis tool project.

## Project Overview

This is a static website hosted on GitHub Pages that provides YouTube analytics functionality. The project uses a single-page application architecture with vanilla JavaScript, Tailwind CSS, and the YouTube Data API v3.

**Tech Stack:**
- Vanilla JavaScript (ES6+)
- Tailwind CSS v3.4.19
- HTML5
- PostCSS with Autoprefixer

## Build & Development Commands

### CSS Build
```bash
# Build Tailwind CSS (development)
npx tailwindcss -i ./src/input.css -o ./output.css --watch

# Build Tailwind CSS (production)
npx tailwindcss -i ./src/input.css -o ./output.css --minify
```

### Testing
```bash
# No formal test suite configured
# Manual testing by opening index.html in browser
```

### Linting
```bash
# No linter configured - follow manual code review practices
```

### Serving Locally
```bash
# Use any static server, e.g.:
python -m http.server 8000
# or
npx serve .
```

## Project Structure

```
youtube/
├── index.html          # Main application file (1382 lines - contains HTML, CSS, JS)
├── output.css          # Generated Tailwind CSS output
├── src/
│   └── input.css       # Tailwind CSS input file
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Dependencies
├── Readme.md          # Project documentation (in Korean)
└── testplan.md        # Test planning document
```

## Code Style Guidelines

### General Principles

1. **Single-File Architecture**: All application code lives in `index.html` with inline `<style>` and `<script>` tags
2. **No External Dependencies**: Use CDN for external libraries only
3. **Browser Compatibility**: Must work without build steps (except Tailwind CSS compilation)
4. **Mobile-First**: Always consider responsive design

### JavaScript Style

#### Naming Conventions
- **Functions**: camelCase (`performSearch`, `updateLanguage`, `renderHistory`)
- **Constants**: UPPER_SNAKE_CASE for true constants (`DAILY_LIMIT`)
- **Objects**: PascalCase for singleton managers (`QuotaManager`, `I18N`)
- **Variables**: camelCase for all other variables (`state`, `apiKey`, `videoGrid`)

#### Function Organization
Functions should be organized by responsibility:
```javascript
// State management functions
function saveState() { }

// Utility functions
function formatNumber(num) { }
function timeAgo(dateString) { }
function parseDuration(duration) { }
function calculateScore(views, subs) { }

// UI functions
function updateLanguage(lang) { }
function renderHistory() { }
function applyFiltersAndRender() { }

// API functions
async function performSearch(query) { }
```

#### Code Patterns

**State Management:**
```javascript
const state = {
    apiKey: localStorage.getItem('yt_api_key') || '',
    history: JSON.parse(localStorage.getItem('yt_search_history')) || [],
    lang: localStorage.getItem('yt_lang') || 'en',
    // ... other state
};

function saveState() {
    localStorage.setItem('yt_api_key', state.apiKey);
    localStorage.setItem('yt_search_history', JSON.stringify(state.history));
    // ... save other state
}
```

**DOM Element References:**
```javascript
const els = {
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    // ... group related elements
};
```

**Async/Await for API Calls:**
```javascript
async function performSearch(query) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();
        // ... handle data
    } catch (error) {
        console.error('Error:', error);
        alert('Error message');
    }
}
```

### CSS/Tailwind Style

#### Class Organization
- Use Tailwind utility classes inline
- Group classes logically: layout → spacing → colors → typography → effects
- Use dark mode variants: `dark:bg-slate-800`
- Responsive prefixes: `sm:`, `md:`, `lg:`

Example:
```html
<button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 
               hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700 
               rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
```

#### Custom Styles
Place custom CSS in `<style>` tag in `<head>`:
```css
/* Custom scrollbar for sidebar */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
```

### HTML Structure

- Use semantic HTML5 elements (`<header>`, `<main>`, `<aside>`)
- IDs for JavaScript targets, classes for styling
- Material Symbols for icons: `<span class="material-symbols-outlined">icon_name</span>`

## API Integration Guidelines

### YouTube Data API v3 Quota Management

**Critical: Always minimize API quota usage**

The project uses a quota tracking system (`QuotaManager`) with a 10,000 unit daily limit.

#### Quota Costs
- `search` API: 100 units per call
- `videos` API: 1 unit per call
- `channels` API: 1 unit per call

#### Optimal API Call Pattern
```javascript
// Step 1: Get video IDs (100 quota)
const searchRes = await fetch(searchUrl);
const videoIds = searchData.items.map(item => item.id.videoId);

// Step 2: Get video details in ONE batch call (1 quota)
const videoIds = ids.join(',');
const videosRes = await fetch(`...&id=${videoIds}`);

// Step 3: Get channel details in ONE batch call (1 quota)
const uniqueChannelIds = [...new Set(channels)].join(',');
const channelsRes = await fetch(`...&id=${uniqueChannelIds}`);

// Track quota usage
QuotaManager.addUsage(100); // for search
QuotaManager.addUsage(1);   // for videos
QuotaManager.addUsage(1);   // for channels
```

### Error Handling

```javascript
try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API Limit or Key Error");
    const data = await response.json();
    // ... process data
} catch (error) {
    console.error('Error details:', error);
    alert('User-friendly error message');
    // Restore UI to non-loading state
}
```

## Internationalization (i18n)

### Language Support
Supported languages: English (en), Korean (ko), Chinese (zh), Japanese (ja)

### i18n Pattern
```javascript
const I18N = {
    en: {
        title: "TubeScope",
        searchPlaceholder: "Analyze a keyword...",
        // ... all strings
    },
    ko: { /* translations */ },
    zh: { /* translations */ },
    ja: { /* translations */ }
};

// Usage
const t = I18N[state.lang];
element.textContent = t.title;
```

## UI/UX Guidelines

### Dark Mode
- Always implement both light and dark variants
- Use Tailwind's `dark:` prefix
- Respect system preferences: `prefers-color-scheme`
- Store user preference: `localStorage.setItem('theme', 'dark')`

### Loading States
Use skeleton UI during data fetching:
```html
<div class="animate-pulse">
    <div class="aspect-video w-full bg-slate-200 dark:bg-slate-700"></div>
    <div class="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
</div>
```

### Responsive Design
- Mobile-first approach
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`
- Hide/show elements: `hidden md:flex`
- Adjust spacing: `px-4 lg:px-8`

## localStorage Usage

### Data Persistence
```javascript
// API Key
localStorage.setItem('yt_api_key', apiKey);
localStorage.getItem('yt_api_key');

// Search History (array)
localStorage.setItem('yt_search_history', JSON.stringify(history));
JSON.parse(localStorage.getItem('yt_search_history')) || [];

// Language preference
localStorage.setItem('yt_lang', 'en');

// Theme
localStorage.setItem('theme', 'dark');

// Quota tracking
localStorage.setItem('yt_quota_date', '2024-01-13');
localStorage.setItem('yt_quota_used', '1250');
```

## Git Commit Guidelines

Based on repository history:

**Commit Message Style:**
- Use lowercase, concise messages
- Start with action verb: "adding", "fixing", "updating"
- Examples:
  - `adding test plan`
  - `fixing bug`
  - `updating UI and function`
  - `update a few functions`

**Best Practices:**
- Commit working code only
- Test in browser before committing
- Keep commits atomic and focused

## Common Tasks

### Adding a New Feature
1. Plan the feature in `testplan.md` if complex
2. Modify `index.html` only (except for CSS)
3. Add i18n strings for all languages
4. Test in both light and dark modes
5. Test on mobile and desktop
6. Rebuild Tailwind CSS if needed

### Fixing a Bug
1. Identify the issue location in `index.html`
2. Fix the code inline
3. Test thoroughly in browser
4. Commit with descriptive message: "fixing [bug description]"

### Updating Styles
1. Use Tailwind utilities when possible
2. Add custom CSS to `<style>` tag only if necessary
3. Rebuild output.css: `npx tailwindcss -i ./src/input.css -o ./output.css`
4. Test in both themes

## Critical Constraints

1. **No external file dependencies** - Everything must work from a single HTML file (plus output.css)
2. **API quota is precious** - Always batch API calls, never call APIs in loops
3. **GitHub Pages compatibility** - No server-side code, pure static files
4. **Multilingual first** - Every user-facing string must be in I18N object
5. **Mobile responsive** - Must work on all screen sizes
6. **Dark mode always** - Every color must have a dark mode variant

## Debugging

- All console logs should be clear and descriptive
- Use browser DevTools Network tab for API debugging
- Check localStorage in Application tab
- Test quota tracking with `QuotaManager.getUsage()`
- Verify i18n with language switcher

## Resources

- **YouTube Data API v3**: https://developers.google.com/youtube/v3
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Material Symbols**: https://fonts.google.com/icons
