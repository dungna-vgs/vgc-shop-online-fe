'use client'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type TImageComponent = ImageProps & {
  fallbackSrc: string
}

const ImageComponent: React.FC<TImageComponent> = ({
  fallbackSrc,
  src,
  alt,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImport>(src)

  const handleError = () => setImageSrc(fallbackSrc)

  return <Image src={imageSrc} onError={handleError} {...props} alt={alt} />
}

export default ImageComponent
