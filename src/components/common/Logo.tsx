import Image from "next/image";

type Props = {
  className?: string;
  alt?: string;
};

export default function Logo({ className, alt = "VR NextGEN logo" }: Props) {
  return (
    <Image
      src="/icons/vr-logo.png"
      alt={alt}
      width={80}
      height={40}
      priority
      className={`${className} object-contain`}
    />
  );
}


