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
import { useGlobalStore } from '@/stores'

export default function FilterPrice() {
  const { setSeachVGA, searchVGA } = useGlobalStore()
  return (
    <Accordion className='mb-4' type='single' collapsible>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Giá</AccordionTrigger>
        <AccordionContent>
          {rangesVGA.map((range, index) => (
            <div key={index} className=' flex py-2 gap-2 items-center'>
              <Checkbox
                onClick={() => {
                  setSeachVGA({
                    money_from:
                      range.min === searchVGA.money_from
                        ? undefined
                        : range.min,
                    money_to:
                      range.max === searchVGA.money_to ? undefined : range.max
                  })
                }}
                checked={
                  searchVGA.money_from == range.min &&
                  searchVGA.money_to == range.max
                }
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
