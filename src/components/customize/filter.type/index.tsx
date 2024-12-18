'use client'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { TTypeVGA } from '@/types/type'
import { useSearchVGA } from '@/stores'
import { useTranslation } from 'react-i18next'

type TFilterType = {
  significances: TTypeVGA[]
}

export default function FilterType(props: TFilterType) {
  const { t } = useTranslation('filter-menu')
  const { setSignificanceId, significance_id } = useSearchVGA()
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='item-2'>
        <AccordionTrigger>{t('mean')}</AccordionTrigger>
        <AccordionContent>
          {props.significances.map((significance, index) => (
            <div key={index} className=' flex py-2 gap-2 items-center'>
              <Checkbox
                onClick={() => {
                  const significanceId =
                    significance.id === significance_id ? -1 : significance.id
                  setSignificanceId(significanceId)
                }}
                checked={significance.id == significance_id}
                id={`meaning${index}`}
              />
              <div className='grid gap-1.5 leading-none'>
                <label
                  htmlFor={`meaning${index}`}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                >
                  {t(significance.name)}
                </label>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
