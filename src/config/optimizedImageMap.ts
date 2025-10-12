/**
 * Optimized Image Mapping
 * Maps original image names to their optimized versions
 */

export const OPTIMIZED_IMAGE_MAP = {
  "Careers.png": [
    "Careers.webp",
    "Careers.avif"
  ],
  "Values.png": [
    "Values.webp",
    "Values.avif"
  ],
  "Vision.png": [
    "Vision.webp",
    "Vision.avif"
  ]
};

export function getOptimizedImagePath(originalPath: string): string {
  const fileName = originalPath.split('/').pop();
  
  if (!fileName || !OPTIMIZED_IMAGE_MAP[fileName as keyof typeof OPTIMIZED_IMAGE_MAP]) {
    return originalPath;
  }
  
  const optimizedVersions = OPTIMIZED_IMAGE_MAP[fileName as keyof typeof OPTIMIZED_IMAGE_MAP];
  // Return WebP as default, AVIF for supported browsers
  return originalPath.replace(fileName, optimizedVersions[0]);
}

export function getFallbackImagePath(originalPath: string): string {
  const fileName = originalPath.split('/').pop();
  
  if (!fileName || !OPTIMIZED_IMAGE_MAP[fileName as keyof typeof OPTIMIZED_IMAGE_MAP]) {
    return originalPath;
  }
  
  const optimizedVersions = OPTIMIZED_IMAGE_MAP[fileName as keyof typeof OPTIMIZED_IMAGE_MAP];
  // Return PNG as ultimate fallback
  return originalPath.replace(fileName, optimizedVersions[0]);
}
