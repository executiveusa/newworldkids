# Design Tokens

## Color Palette
| Token | Value | Usage |
| --- | --- | --- |
| `background` | `#0F1115` | Carbon-fiber inspired dashboard backdrop |
| `foreground` | `#FFFFFF` | Primary text on dark surfaces |
| `primary.DEFAULT` | `#141413` | High contrast CTAs, navigation chrome |
| `primary.foreground` | `#FFFFFF` | Text/iconography on primary elements |
| `secondary.DEFAULT` | `#E6E4DD` | Secondary surfaces, cards on dark backgrounds |
| `secondary.foreground` | `#141413` | Text on secondary surfaces |
| `accent.DEFAULT` | `#8989DE` | Highlight states, Lemon AI emphasis |
| `accent.foreground` | `#FFFFFF` | Text on accent elements |
| `muted.DEFAULT` | `#828179` | Supporting text, dividers |
| `muted.foreground` | `#FAFAF8` | Text when muted background is used |
| `card.DEFAULT` | `#FFFFFF` | Light cards inside dark layout |
| `card.foreground` | `#141413` | Text on card components |
| `brand.DEFAULT` | `#800000` (Lovable Charcoal inspired) | Legacy brand accents |
| `brand.light` | `#FF0000` | Urgency cues (errors/warnings) |
| `ring` | `hsl(var(--ring))` | Focus outlines, interactive focus states |

## Typography
- **Primary font**: `Archivo, sans-serif`
- **Base font size**: 16px
- **Heading scale**: 1.875rem (h2), 1.5rem (h3), 1.25rem (h4) via Tailwind utilities.

## Spacing
- Container padding: `2rem` with max width `1400px` (2xl breakpoint)
- Layout uses Tailwind spacing scale (4px baseline). Key spacers used in new components:
  - `gap-3` (12px) for chat message clusters
  - `py-3` (12px) for dock headers and footers
  - `bottom-6` / `right-6` (24px) for floating action positioning

## Motion
- Standard duration: 0.2s ease for dialogs and chat messages
- Dock expansion uses spring transition (`damping: 22`, `stiffness: 180`) respecting `prefers-reduced-motion`

## Radii
- `lg`: `var(--radius)` (defaults to 0.5rem)
- `md`: `calc(var(--radius) - 2px)`
- `sm`: `calc(var(--radius) - 4px)`

## Utilities Introduced
- `shadow-2xl` for the chat dock float panel
- `rounded-full` for circular floating buttons
- `backdrop-blur-xl` for glassmorphism effect behind the Lemon AI panel
