'use client'
import React from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { rangesVGA } from '@/constants/range'
import { useSearchVGA } from '@/stores'
import { useTranslation } from 'react-i18next'

export default function FilterPrice() {
  const { t } = useTranslation('filter-menu')
  const { t: tcommon } = useTranslation('common')

  const { setMoney, money_from, money_to } = useSearchVGA()

  const range = rangesVGA(tcommon('all'))
  return (
    <Accordion className='mb-4' type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>{t('price')}</AccordionTrigger>
        <AccordionContent>
          {range.map((range, index) => (
            <div key={index} className=' flex py-2 gap-2 items-center'>
              <Checkbox
                onClick={() => {
                  const moneyFrom =
                    range.min === money_from ? undefined : range.min
                  const moneyTo = range.max === money_to ? undefined : range.max
                  setMoney(moneyFrom, moneyTo)
                }}
                checked={money_from == range.min && money_to == range.max}
                id={`price${index}`}
              />
              <div className='grid gap-1.5 leading-none'>
                <label
                  htmlFor={`price${index}`}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
                >
                  {range.displayMin} {range.space} {range.displayMax}
                </label>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
