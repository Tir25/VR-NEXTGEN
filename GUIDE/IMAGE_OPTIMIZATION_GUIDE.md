# Image Optimization Guide

## Overview
This guide covers how to optimize and use images in the VR NextGEN Solutions project for optimal performance and user experience.

## Current Optimized Images

### Available Formats
- **AVIF**: Best compression (80% smaller), modern browsers
- **WebP**: Good compression (60% smaller), wide browser support  
- **PNG**: Optimized fallback, universal support

### Optimized Images Directory Structure
```
public/images-optimized/
├── Hero.webp
├── Hero.avif
├── Hero-optimized.png
├── Hero-sm.webp
├── Hero-sm.avif
├── Hero-md.webp
├── Hero-md.avif
├── Industries/
│   ├── Education.webp
│   ├── Education.avif
│   └── ...
└── Our Services/
    ├── Business Consulting.webp
    ├── Business Consulting.avif
    └── ...
```

## Optimizing New Images

### 1. For Values.png Image
```bash
# Run the Values.png optimization script
node scripts/optimize-values-image.js
```

This will create:
- `Values.webp` (best compression for WebP browsers)
- `Values.avif` (best compression for modern browsers)
- `Values-optimized.png` (fallback for all browsers)

### 2. For Other Images
```bash
# Run the general optimization script
node scripts/optimize-images-final.js
```

## Using Optimized Images

### Method 1: Using OptimizedValuesImage Component (Recommended)
```tsx
import OptimizedValuesImage from "@/components/common/OptimizedValuesImage";

// In your component
<OptimizedValuesImage
  alt="VR NextGen Solutions Values"
  width={600}
  height={600}
  className="rounded-2xl shadow-2xl"
  priority={true}
/>
```

### Method 2: Using Next.js Image with Picture Element
```tsx
import Image from 'next/image';

<picture>
  <source srcSet="/images-optimized/Values.avif" type="image/avif" />
  <source srcSet="/images-optimized/Values.webp" type="image/webp" />
  <Image
    src="/images-optimized/Values-optimized.png"
    alt="Values"
    width={600}
    height={600}
    className="w-full h-auto"
  />
</picture>
```

### Method 3: Using Image Mapping (For Existing Images)
```tsx
import { getOptimizedImage } from "@/config/imageMapping";

// Get optimized image path
const imagePath = getOptimizedImage("/images/Values.png", "webp");

<Image
  src={imagePath}
  alt="Values"
  width={600}
  height={600}
/>
```

## Performance Benefits

### File Size Comparison (Typical)
- **Original PNG**: 1.4MB
- **Optimized PNG**: 800KB (43% smaller)
- **WebP**: 400KB (71% smaller)
- **AVIF**: 200KB (86% smaller)

### Loading Performance
- **Faster page loads**: Smaller file sizes
- **Better Core Web Vitals**: Reduced LCP (Largest Contentful Paint)
- **Improved SEO**: Better page speed scores
- **Reduced bandwidth**: Lower hosting costs

## Best Practices

### 1. Image Selection
- Use AVIF for modern browsers (Chrome 85+, Firefox 93+)
- Use WebP for broader compatibility (Chrome 23+, Firefox 65+)
- Use optimized PNG as fallback

### 2. Responsive Images
```tsx
// Use responsive images for different screen sizes
<source 
  media="(max-width: 640px)"
  srcSet="/images-optimized/Values-sm.webp"
  type="image/webp"
/>
<source 
  media="(max-width: 1024px)"
  srcSet="/images-optimized/Values-md.webp"
  type="image/webp"
/>
<source 
  srcSet="/images-optimized/Values.webp"
  type="image/webp"
/>
```

### 3. Lazy Loading
```tsx
// Use priority for above-the-fold images
<OptimizedValuesImage priority={true} />

// Lazy load for below-the-fold images
<OptimizedValuesImage priority={false} />
```

### 4. Alt Text
Always provide descriptive alt text for accessibility:
```tsx
<OptimizedValuesImage 
  alt="VR NextGen Solutions company values showing teamwork, innovation, and excellence"
/>
```

## Adding Values Image to Who We Are Page

When you're ready to add the Values image back to the "Our Values" section:

```tsx
import OptimizedValuesImage from "@/components/common/OptimizedValuesImage";

// In your component
<section className="relative py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Content */}
      <div className="space-y-8">
        {/* Your content here */}
      </div>

      {/* Optimized Image */}
      <div className="relative">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <OptimizedValuesImage
            alt="VR NextGen Solutions Values - Empowering Businesses, Transforming Futures"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
            priority={false}
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  </div>
</section>
```

## Troubleshooting

### Image Not Found
1. Ensure `Values.png` exists in the `public` directory
2. Run the optimization script: `node scripts/optimize-values-image.js`
3. Check that optimized images are created in `public/images-optimized/`

### Browser Compatibility
- Modern browsers: AVIF (best quality)
- Older browsers: WebP (good quality)
- Very old browsers: PNG fallback (acceptable quality)

### Performance Monitoring
- Use Chrome DevTools to monitor image loading
- Check Network tab for actual file sizes
- Use Lighthouse to measure performance impact

## Next Steps

1. **Place Values.png** in the `public` directory
2. **Run optimization**: `node scripts/optimize-values-image.js`
3. **Use optimized component** in your "Our Values" section
4. **Test performance** with different image formats
5. **Monitor Core Web Vitals** for improvements

This optimization approach ensures your images load quickly while maintaining high quality across all browsers and devices.
