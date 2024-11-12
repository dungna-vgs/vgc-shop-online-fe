'use client'
import { useGlobalStore } from '@/stores'
import { TTypeVGA } from '@/types/type'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

type TMenuSerialNumberProps = {
  typeVga: TTypeVGA[]
}

export default function MenuSerialNumber(props: TMenuSerialNumberProps) {
  const { setSeachVGA, searchVGA } = useGlobalStore()
  const { t } = useTranslation('common')
  return (
    <div className='flex items-center py-4 gap-4 lg:gap-8  overflow-hidden overflow-x-scroll no-scrollbar '>
      {props.typeVga?.map?.((type, index) => {
        if (type.id == -1) {
          return (
            <div
              key={index}
              className='flex justify-center w-[112px] h-[128px]'
            >
              <Link
                href={`/vgacode/?type=${type.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setSeachVGA({ significance_id: type.id })
                }}
                className={clsx(
                  'flex flex-col w-[112px] h-[128px] justify-center gap-1 items-center text-black rounded-[15px]',
                  {
                    'bg-[#4AC486]':
                      searchVGA.significance_id == type.id ||
                      searchVGA.significance_id == undefined,
                    'bg-[#4AC486] hover:bg-[#3fb97c] text-black':
                      searchVGA.significance_id != -1 &&
                      searchVGA.significance_id != undefined
                  }
                )}
              >
                <Image
                  src='/images/element-3.svg'
                  width={44}
                  height={44}
                  alt='Icon'
                  className='hover:fill-slate-50'
                />
                <span className='text-white'>{t('all')}</span>
              </Link>
            </div>
          )
        } else {
          return (
            <div
              key={index}
              className='flex flex-1 items-center gap-4 lg:gap-8'
            >
              <Link
                href={`/vgacode/?significance_id=${type.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setSeachVGA({ significance_id: type.id })
                }}
                className={clsx(
                  'flex flex-col w-[112px] h-[128px] justify-center gap-1 items-center text-black rounded-[15px]',
                  {
                    'bg-[#F1F1F1]': searchVGA.significance_id == type.id,
                    'bg-white  hover:bg-[#F1F1F1]':
                      searchVGA.significance_id != type.id
                  }
                )}
              >
                <Image
                  src='/images/Vector.svg'
                  width={44}
                  height={44}
                  alt='Icon'
                  className='hover:fill-slate-50'
                />
                <span>{type.name}</span>
              </Link>
            </div>
          )
        }
      })}
    </div>
  )
}
