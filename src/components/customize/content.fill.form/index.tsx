'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { apiSearchGolfer } from '@/apis/internals/clients/search.golfer'
import { TGolfer } from '@/types/type'
import { useRouter } from 'next/navigation'
import { useGlobalStore, useDiscountStore, useEmployeeStore } from '@/stores'
import { apiGetVga } from '@/apis/internals/clients/get.vga'
import { apiGetFeePackage } from '@/apis/internals/clients/get.package'
import { getMembershipPackageName } from '@/utils'
import { useTranslation } from 'react-i18next'

type TItemProps = {
  setSteps: (step: number) => void
  vgacode?: string
  packageId?: string
}

export default function ContentFillForm(props: TItemProps) {
  const { t } = useTranslation('form')
  const router = useRouter()
  const { vga, feePackage, setVga, setFeePackage, setBuyer } = useGlobalStore()
  const { vgacode, packageId } = props
  const [open, setOpen] = useState(true)
  const [value, setValue] = useState<number>(0)
  const [keyword, setKeyword] = useState<string>('')
  const [golfers, setGolfers] = useState<TGolfer[]>([])
  const { setDiscount } = useDiscountStore()
  const { setEmployee } = useEmployeeStore()
  const handleOnSearch = async (keyword: string) => {
    apiSearchGolfer({ keyword }).then((res) => {
      setGolfers(res.data)
    })
  }
  useEffect(() => {
    const id = setTimeout(() => {
      if (keyword?.trim()) {
        handleOnSearch(keyword)
      }
    }, 500)
    return () => clearTimeout(id)
  }, [keyword])

  useEffect(() => {
    if (vgacode) {
      setFeePackage(null)
      apiGetVga({ vga: vgacode }).then((res) => {
        setVga(res.data)
      })
    }
  }, [vgacode, setVga, setFeePackage])

  useEffect(() => {
    if (packageId) {
      setVga(null)
      apiGetFeePackage({ packageId }).then((res) => {
        setFeePackage(res.data)
      })
    }
  }, [packageId, setFeePackage, setVga])

  const golfer = golfers?.find((golfer) => golfer.id == value)

  const onNextStep = () => {
    setBuyer(golfer || null)
    props.setSteps(1)
  }
  return (
    <div className='content-fill-form'>
      <div>
        {!!props.vgacode && (
          <p className=' font-semibold text-[20px] mb-6'>
            {t('select')}
            <span className='text-[#16533D] text-[22px]'>
              {' '}
              VGA{props.vgacode}
            </span>
          </p>
        )}
        {!!props.packageId && !!feePackage && (
          <p className=' font-semibold text-[20px] mb-6'>
            {t('select-1')}
            <span className='text-[#16533D] text-[22px]'>
              {' '}
              {getMembershipPackageName(feePackage)}
            </span>
          </p>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className='flex w-full'>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-full overflow-hidden rounded-[7px] px-6 h-[72px] bg-[#F6F6F6] mb-2 text-[18px] outline-none focus:outline-none focus:border-none flex justify-between items-center'
            >
              {golfer ? (
                <div className='flex'>
                  <Avatar className='bg-gray-400'>
                    <AvatarImage
                      src={golfer.system_avatar_path}
                      alt={golfer.id + ''}
                    />
                  </Avatar>
                  <div className='ml-2 flex justify-start flex-col'>
                    <div className='name'>{golfer.fullname}</div>
                    <div className='flex w-full justify-start'>
                      <span className='vga bg-yellow-600 text-sm rounded-md py-[2px] pt-1 px-2 text-white leading-[16px] inline-block'>
                        {golfer.id_display}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                t('fill-in')
              )}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent data-disabled className='min-w-[83vw] p-0'>
            <input
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              className='min-w-[100%] outline-none focus:outline-none focus:border-none border-none p-3'
              placeholder={t('fill-in')}
            />
            <Command className='min-w-[100%]'>
              <CommandList className='min-w-[100%]'>
                <CommandEmpty className='min-w-[100%] p-3 text-center'>
                  {t('not-search')}
                </CommandEmpty>
                <CommandGroup className='min-w-[100%]'>
                  {golfers.map((golfer) => (
                    <CommandItem
                      key={golfer.id}
                      value={golfer.id.toString()}
                      onSelect={() => {
                        setValue(Number(golfer.id))
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === golfer.id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <div className='flex'>
                        <Avatar className='bg-gray-400'>
                          <AvatarImage
                            src={golfer.system_avatar_path}
                            alt={golfer.id + ''}
                          />
                        </Avatar>
                        <div className='ml-2'>
                          <div className='name'>{golfer.fullname}</div>
                          <span className='vga bg-yellow-600 rounded-md py-[2px] pt-1 px-2 text-white leading-[16px] inline-block'>
                            {golfer.id_display}
                          </span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className='flex justify-end items-center gap-6 mt-16'>
          <Link
            className='text-black leading-[64px] bg-white rounded-[6px] border-[1px] border-[#000] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
            href='/package-price'
            onClick={(e) => {
              e.preventDefault()
              router.back()
            }}
          >
            {t('back')}
          </Link>
          <button
            className='text-white leading-[64px] bg-gradient-to-r from-[#17573C] to-[#4AC486] disabled:bg-none disabled:!bg-[#979797] rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'
            disabled={(!vga && !feePackage) || !value}
            onClick={() => {
              onNextStep()
              setEmployee(undefined)
              setDiscount(undefined)
            }}
          >
            {t('next')}
          </button>
        </div>
      </div>
    </div>
  )
}
