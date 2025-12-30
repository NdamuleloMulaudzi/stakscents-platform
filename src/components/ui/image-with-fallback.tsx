"use client";

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({ 
  src, 
  fallbackSrc = '/placeholder.jpg', 
  alt, 
  ...props 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative overflow-hidden bg-gray-100 w-full h-full"> 
       <Image
        {...props}
        src={imgSrc}
        alt={alt || "Image"}
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
        fill
        className={`object-cover ${props.className || ''}`}
      />
    </div>
  );
}
