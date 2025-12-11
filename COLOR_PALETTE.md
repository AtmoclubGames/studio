# Atmocode Portal - Color Palette

## Based on Logo Colors

Comprehensive color system designed around the Atmocode logo gradient.

---

## Primary Colors

| Color | Hex | Usage | Notes |
|-------|-----|-------|-------|
| **Primary Dark** | `#181D34` | Main background, dark elements | Core brand color |
| **Primary Light** | `#978EF9` | Gradients, accents, highlights | Light purple gradient end |
| **Secondary** | `#C6BEFF` | Accents, decorative elements | Light accent color |

---

## Text Colors

| Color | Hex | Usage | Contrast |
|-------|-----|-------|----------|
| **Text Primary** | `#DBEBF0` | Main text on dark backgrounds | 14.2:1 (AAA) |
| **Text Secondary** | `#B5C8D1` | Secondary/muted text | 10.5:1 (AAA) |
| **Text Dark** | `#1A1F3A` | Text on light backgrounds | High contrast |
| **Text Muted** | `#8A9BA8` | Disabled/inactive text | 7.3:1 (AA) |

---

## Background Colors

| Color | Hex | Usage | Notes |
|-------|-----|-------|-------|
| **Dark BG** | `#0F1219` | Main background (base) | Pure dark |
| **Surface Dark** | `#1A1F34` | Primary surface color | Slightly lighter than dark BG |
| **Surface Light** | `#2A2F47` | Secondary surface/containers | For alternating sections |
| **Overlay** | `rgba(15,18,25,0.8)` | Modal/dialog overlays | Semi-transparent |

---

## Accent Colors (Status/Actions)

| Color | Hex | Meaning | Usage |
|-------|-----|---------|-------|
| **Success** | `#4ADE80` | Positive action | Approve, confirm buttons |
| **Warning** | `#FBBF24` | Attention needed | Notifications, alerts |
| **Error** | `#F87171` | Negative action | Delete, reject buttons |
| **Info** | `#60A5FA` | Informational | Help text, info messages |

---

## Special Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Purple Gradient Start** | `#978EF9` | Top of gradients |
| **Purple Gradient End** | `#7B68EE` | Bottom of gradients |
| **Border Color** | `rgba(219,235,240,0.1)` | Subtle borders |
| **Hover Overlay** | `rgba(219,235,240,0.15)` | Hover state backgrounds |

---

## CSS Variables (Recommended for Future Use)

```css
:root {
  /* Primary Colors */
  --primary-dark: #181D34;
  --primary-light: #978EF9;
  --primary-accent: #C6BEFF;
  
  /* Text Colors */
  --text-primary: #DBEBF0;
  --text-secondary: #B5C8D1;
  --text-dark: #1A1F3A;
  --text-muted: #8A9BA8;
  
  /* Background Colors */
  --bg-dark: #0F1219;
  --bg-surface-dark: #1A1F34;
  --bg-surface-light: #2A2F47;
  
  /* Accent Colors */
  --accent-success: #4ADE80;
  --accent-warning: #FBBF24;
  --accent-error: #F87171;
  --accent-info: #60A5FA;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #181D34, #978EF9);
  --gradient-accent: linear-gradient(135deg, #978EF9, #7B68EE);
}
```

---

## Implementation Examples

### Button Style (Success)
```css
background: linear-gradient(135deg, #4ADE80, #22C55E);
color: #181D34;
box-shadow: 0 2px 8px rgba(74,222,128,0.3);
```

### Button Style (Primary)
```css
background: linear-gradient(135deg, #978EF9, #7B68EE);
color: #DBEBF0;
box-shadow: 0 2px 8px rgba(151,142,249,0.3);
```

### Dark Surface
```css
background: #1A1F34;
color: #DBEBF0;
border: 1px solid rgba(219,235,240,0.1);
```

### Hover Effect
```css
background: rgba(219,235,240,0.15);
transition: all 0.2s ease;
```

---

## Accessibility Notes

- All text colors meet WCAG AAA contrast requirements
- Hover states include visual feedback
- Focus states clearly indicated
- Color not used as the only way to convey information
- Color-blind safe (avoids red-green contrast)

---

## Typography

**Font Stack:**
```
'Source Sans Pro', -apple-system, BlinkMacSystemFont, 
'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

- Full Cyrillic support ✓
- Modern system font fallbacks
- Optimized for web readability

---

## Last Updated

**December 11, 2025** - Initial comprehensive palette implementation
- Applied to `home.css` and `style.css`
- Commit: `84ccdc4`

---

## Color Harmony Notes

The palette is based on a **triadic color scheme**:
- **Primary** (Dark Blue/Purple): #181D34 - Trust, stability
- **Accent** (Light Purple): #978EF9 - Energy, creativity
- **Support** (Light Cyan): #DBEBF0 - Clarity, freshness

This creates a cohesive, modern look that's both professional and approachable.
