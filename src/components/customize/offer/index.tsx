'use client'
import OfferItem from '@customize/card/index'
import styles from './style.module.css'
import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { TPromotion } from '@/types/type'
import { useGlobalStore } from '@/stores'
import { useTranslation } from 'react-i18next'


type TOfferCard = {
  promotions: TPromotion[]
}

export default function OfferCard(props: TOfferCard) {
  const { t } = useTranslation('common')
  const { vgaSearchAll, feeSearchAll } = useGlobalStore()
  if (vgaSearchAll.length || feeSearchAll.length) return null
  return (
    <div>
      <h3 className='pb-6 pt-2 text-xl font-semibold text-[#000]'>
      {t('promotion')}
      </h3>
      <Carousel
        opts={{
          align: 'start'
        }}
      >
        <CarouselContent>
          {props.promotions.map((promotion, index) => (
            <CarouselItem
              key={index}
              className='md:basis-1/3 p-4 sm:basic-full min-w-80'
            >
              <div>
                <Card>
                  <CardContent>
                    <OfferItem promotion={promotion} />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={styles.btnPrevious} />
        <CarouselNext className={styles.btnNext} />
      </Carousel>
    </div>
  )
}
