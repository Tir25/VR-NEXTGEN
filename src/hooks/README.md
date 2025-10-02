# Custom Hooks Documentation

This directory contains reusable React hooks for the VR NextGEN website.

## use3DTilt Hook

### Overview
The `use3DTilt` hook provides a sophisticated 3D tilt hover effect for card components. It creates smooth, premium 3D rotations based on mouse position with dynamic shadow effects.

### Features
- ✅ **3D Rotation**: Smooth rotation based on cursor position (max 10° by default)
- ✅ **Dynamic Shadows**: Shadow shifts with tilt for enhanced depth perception
- ✅ **Premium Feel**: Cubic-bezier easing for smooth, professional animations
- ✅ **Accessibility**: Respects `prefers-reduced-motion` media query
- ✅ **Responsive**: Disabled on mobile devices for better performance
- ✅ **TypeScript**: Fully typed with generic element support

### Usage

```tsx
import { use3DTilt } from '@/hooks/use3DTilt';

function MyCard() {
  const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
    maxTilt: 8,
    enabled: true
  });

  return (
    <div
      ref={cardRef}
      className="card-3d card-shadow"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      Card content
    </div>
  );
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxTilt` | `number` | `10` | Maximum tilt angle in degrees |
| `enabled` | `boolean` | `true` | Whether to enable the effect |

### CSS Classes Required

Add these classes to your card elements:

```css
.card-3d {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.card-shadow {
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Accessibility Features

- **Reduced Motion**: Automatically disabled for users with motion sensitivity
- **Mobile Optimization**: Disabled on touch devices for better performance
- **Smooth Transitions**: Uses CSS transitions for hardware acceleration

### Performance Considerations

- Uses `will-change: transform` for GPU acceleration
- Cubic-bezier easing for smooth 60fps animations
- Minimal DOM manipulation for optimal performance
- Automatic cleanup on mouse leave

### Examples

#### Team Member Cards (8° max tilt)
```tsx
const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
  maxTilt: 8,
  enabled: true
});
```

#### Service Cards (6° max tilt)
```tsx
const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
  maxTilt: 6,
  enabled: true
});
```

#### Benefit Cards (5° max tilt)
```tsx
const { cardRef, onMouseMove, onMouseLeave } = use3DTilt({
  maxTilt: 5,
  enabled: true
});
```

### Implementation Details

The hook calculates rotation angles based on:
- Mouse position relative to card center
- Maximum tilt angle configuration
- Smooth cubic-bezier transitions

Dynamic shadow effects:
- Shadow direction follows tilt direction
- Golden accent glow for VR NextGEN branding
- Smooth shadow transitions

This creates a premium, interactive experience that aligns with the VR NextGEN black and gold design system.
