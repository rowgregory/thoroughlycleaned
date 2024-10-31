import Image from 'next/image';
import React, { FC, MouseEventHandler, RefObject } from 'react';

interface PitureProps {
  src: string;
  alt: string;
  className: string;
  priority: boolean;
  imgRef?: RefObject<HTMLImageElement>;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

const Picture: FC<PitureProps> = ({
  src,
  alt,
  className,
  priority = false,
  imgRef,
  onClick,
}) => {
  return (
    <Image
      onClick={onClick}
      ref={imgRef}
      src={src}
      alt={alt}
      width="0"
      height="0"
      sizes="100vw"
      className={className}
      priority={priority}
    />
  );
};

export default Picture;
