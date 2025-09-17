# Design Guidelines for Memory for Color Lovers

## Design Approach
**Reference-Based Approach**: Inspired by professional color systems - specifically Pantone swatches and Home Depot paint center displays. This creates an authentic, tactile feeling that color enthusiasts will immediately recognize and appreciate.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Background: 240 8% 8% (dark charcoal)
- Surface: 240 6% 12% (card backgrounds)
- Text Primary: 0 0% 95% (high contrast white)
- Text Secondary: 240 5% 70% (muted labels)

**Accent Colors:**
- Success: 142 76% 36% (vibrant green for matches)
- Error: 0 84% 60% (bright red for mismatches)
- Card Border: 240 9% 20% (subtle card separation)

### B. Typography
**Primary Font**: Inter (Google Fonts)
- Game Title: 2.5rem, bold weight
- Card Color Names: 1rem, medium weight
- Hex Values: 0.875rem, mono font (JetBrains Mono)
- UI Labels: 0.875rem, regular weight

### C. Layout System
**Spacing Units**: Use Tailwind units of 2, 4, 6, and 8
- Card gaps: gap-4
- Section padding: p-6 or p-8
- Button margins: m-2
- Container max-width: max-w-4xl

### D. Component Library

**Game Cards (Key Component)**:
- Dimensions: 140px × 180px rectangles
- Rounded corners: rounded-lg
- Drop shadow: shadow-lg for depth
- Back state: Gradient from 240 15% 25% to 240 12% 18%
- Front state: White background with color swatch taking 60% of card height
- Typography hierarchy: Color name (bold), hex value (monospace, smaller)
- Border animations: 3px border for error states

**Color Theme Selector**:
- Pill-shaped buttons in horizontal scroll
- Each theme shows small color preview dots
- Active state with subtle glow effect

**Game Board**:
- 4×3 grid layout using CSS Grid
- Responsive: 3×4 on mobile, 4×3 on tablet+
- Centered with generous margins

**Header Section**:
- Game title with subtle letter-spacing
- Score/attempts counter with clean typography
- Reset button with outline variant

### E. Animations
**Card Flip**: 3D transform with 0.6s duration, ease-in-out
**Match Success**: Gentle scale pulse (1.0 to 1.05) with green border glow
**Mismatch Error**: Red border flash (0.3s) before flip back
**Theme Selection**: Smooth color transitions (0.3s)

## Visual Treatment
**Swatch Authenticity**: Cards should feel like real paint swatches with:
- Subtle texture through box-shadows
- Color swatch positioned like real Pantone chips
- Professional typography matching industry standards
- Clean, minimal information hierarchy

**Spatial Design**: 
- Generous whitespace around game board
- Cards slightly separated to feel individual
- Centered layout with breathing room
- Mobile-first responsive scaling

## Game Color Themes
Each theme contains 6 pairs (12 cards total):
- **Reds**: From coral to deep burgundy
- **Blues**: Ocean to navy spectrum  
- **Greens**: Sage to forest range
- **Yellows**: Cream to golden tones
- **Mixed**: Curated palette across color families

The design should evoke the tactile, professional experience of browsing color swatches in a paint store, while maintaining clean digital game mechanics.