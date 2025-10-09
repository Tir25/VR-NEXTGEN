import Image from "next/image";

type Props = {
  className?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export default function Logo({ className, alt = "VR NextGEN Solutions", size = 'md' }: Props) {
  const sizeMap = {
    sm: { width: 120, height: 40 },
    md: { width: 160, height: 50 },
    lg: { width: 200, height: 60 },
    xl: { width: 240, height: 80 }
  };

  const { width, height } = sizeMap[size];

  return (
    <Image
      src="/icons-optimized/vr-logo-md.webp"
      alt={alt}
      width={width}
      height={height}
      priority
      className={`${className} object-contain`}
      sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
    />
  );
}


