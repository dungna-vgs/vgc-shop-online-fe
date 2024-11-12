'use client'
import React from 'react'
import styles from './style.module.css'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import clsx from 'clsx'
import { SlidersHorizontal } from 'lucide-react'
import { TTypeVGA } from '@/types/type'
import { rangesVGA } from '@/constants/range'
import { useGlobalStore } from '@/stores'
import { useTranslation } from 'react-i18next'

const SHEET_SIDES = ['left'] as const

type SheetSide = (typeof SHEET_SIDES)[number]

type TSheetSideProps = {
  significances: TTypeVGA[]
}
export function SheetSide(props: TSheetSideProps) {
  const { t } = useTranslation('filter-menu')
  const { t: tcommon } = useTranslation('common')
  const { searchVGA, setSeachVGA } = useGlobalStore()

  const range = rangesVGA(tcommon('all'))
  return (
    <div className=''>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <div className='cursor-pointer gap-10 text-black  flex justify-start items-center'>
              <span>{t('filter')}</span>
              <SlidersHorizontal className='w-4 h-4' />
            </div>
          </SheetTrigger>
          <SheetContent
            className='w-full mt-[83px] min-h-[100vh] h-full overflow-y-scroll text-black'
            side={side}
          >
            <SheetHeader>
              <div className=' gap-4 text-black py-2 border-b border-b-[#F1F1F1] text-[24px] font-medium flex justify-start items-center'>
                <span>{t('filter')}</span>
              </div>
            </SheetHeader>
            <div
              className={clsx(
                styles.containerScroll,
                'mt-6 overflow-y-scroll no-scrollbar'
              )}
            >
              <div>
                <div className='border-b border-b-[#F1F1F1] pb-4 '>
                  <span className='text-[18px]'>{t('price')}</span>
                </div>
                {range.map((range, index) => (
                  <div key={index}>
                    <div className='flex items-center justify-start gap-2 pl-2 py-2'>
                      <Checkbox
                        onClick={() => {
                          setSeachVGA({
                            money_from: range.min,
                            money_to: range.max
                          })
                        }}
                        checked={
                          searchVGA.money_from == range.min &&
                          searchVGA.money_to == range.max
                        }
                        id={`price${index}`}
                      />
                      <label
                        htmlFor={`price${index}`}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {range.displayMin} {range.space} {range.displayMax}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mb-2'>
                <div className='border-b border-b-[#F1F1F1] py-2 '>
                  <span className='text-[18px]'>{t('mean')}</span>
                </div>
                {props.significances.map((meaning, index) => (
                  <div key={index}>
                    <div className='flex items-center justify-start pl-2 gap-2 py-2'>
                      <Checkbox
                        id={`meaning${index}`}
                        checked={searchVGA.significance_id == meaning.id}
                        onClick={() => {
                          setSeachVGA({
                            significance_id: meaning.id
                          })
                        }}
                      />
                      <label
                        htmlFor={`meaning${index}`}
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        {meaning.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <SheetFooter className='flex justify-center'>
              <SheetClose asChild>
                <Button type='submit' className={styles.btnSubmit}>
                  Áp dụng
                </Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
