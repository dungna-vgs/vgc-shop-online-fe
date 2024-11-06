'use client'
import { useGlobalStore } from '@/stores'
import { TAds } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type TBannerImageProps = {
  banner?: TAds
}
export default function BannerImage(props: TBannerImageProps) {
  const { vgaSearchAll, feeSearchAll } = useGlobalStore()
  if (vgaSearchAll.length || feeSearchAll.length) return null
  if (props.banner)
    return (
      <div>
        <Link href={props.banner.link}>
          <Image
            src={props.banner.image}
            width={1024}
            height={174}
            alt={props.banner.title}
            quality={75}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover'
            }}
          />
        </Link>
      </div>
    )
}
