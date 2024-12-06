'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type TMetaPixelProps = {
  pixelId?: string
}
export default function MetaPixel(props: TMetaPixelProps) {
  const pathname = usePathname()
  useEffect(() => {
    if (props.pixelId) {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(props.pixelId!)
          ReactPixel.pageView()
        })
    }
  }, [pathname, props.pixelId])
  return null
}
