import Image from 'next/image'
import styles from './style.module.css'
import Link from 'next/link'
import { TVga } from '@/types/type'
import { formatCurrency } from '@/utils'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { event } from '@/lib/gtag'

type TCardNumberProps = {
  vga: TVga
  showBuyButton?: boolean
  className?: string
}

export default function CardNumber({
  vga,
  showBuyButton = true,
  className = ''
}: TCardNumberProps) {
  const { t } = useTranslation('common')
  const handleClickBuyButton = () => {
    event('buy_vga', {
      event_category: 'VGA',
      event_label: `Number: ${vga.id}`
    })
  }

  console.log('vga', vga)
  return (
    <div className={clsx(styles.listCard, className)}>
      <div className=''>
        <Image
          src='/images/bg-CardNumber.png'
          width={256}
          height={168}
          alt={`vga: ${vga.id} - type ${vga.loai_ma}`}
          quality={60}
          style={{
            width: '100%',
            height: 'auto'
          }}
          className='min-w-[148px] min-h-[172px]'
        />
      </div>
      <div className='absolute top-0 right-0 left-0 bottom-0 p-2 sm:p-4 flex flex-col justify-center items-center sm:gap-2 lg:gap-2 gap-1'>
        <Image
          src='/images/logo-handicap.png'
          width={40}
          height={37}
          alt='vHandicap'
          quality={60}
        />
        <div className={styles.borderCode}>
          <span className='text-[24px] xl:text-[36px]'>{vga.id}</span>
        </div>

        <div
          className={clsx(
            'lg:p-1 p-0 w-full flex md:flex-row flex-col gap-1 items-center text-[#FAFF00] font-semibold',
            showBuyButton ? 'justify-between' : 'justify-center'
          )}
        >
          <div>
            <span className='block lg:text-[16px] text-[12px]'>
              {formatCurrency(vga.amount)}đ
            </span>
            <div className='flex gap-2 items-center'>
              <span className='block text-[10px] font-medium text-[#CED6D2] line-through lg:text-[12px]'>
                {formatCurrency(vga.amount)}đ
              </span>
              <span className='font-medium'>{vga.original_amount}</span>
              <span className='font-medium text-[#00FF93] text-[12px]'>{vga.discount}%</span>
            </div>
          </div>
          {showBuyButton && (
            <Link
              href={`/buy-vga/${vga.id}`}
              onClick={handleClickBuyButton}
              className={styles.btnBuy}
            >
              {t('buy')}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
