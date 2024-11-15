'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { TAds } from '@/types/type'
import Link from 'next/link'
import { useGlobalStore } from '@/stores'

type TBannerCarouselProps = {
  sliders: TAds[]
}
const BannerCarousel: React.FC<TBannerCarouselProps> = (props) => {
  const { vgaSearchAll, feeSearchAll } = useGlobalStore()
  if (vgaSearchAll.length || feeSearchAll.length) return null
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        watchDrag: false
      }}
      plugins={[
        Autoplay({
          delay: 3000
        })
      ]}
      className='w-full'
    >
      <CarouselContent className='mx-0'>
        {props.sliders.map((image: TAds, index) => (
          <CarouselItem key={index} className='relative mt-[84px] w-full'>
            <Link href={image.link} className='w-full h-auto' target='_blank'>
              <Image
                src={image.image}
                alt={image.title}
                className='w-full h-auto'
                quality={60}
                width={1200}
                height={400}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default BannerCarousel
