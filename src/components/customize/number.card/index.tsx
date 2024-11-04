import Image from 'next/image'
import styles from './style.module.css'
import Link from 'next/link'
import { TVga } from '@/types/type'
import { formatCurrency } from '@/utils'

type TCardNumberProps = {
  vga: TVga
}
export default function CardNumber(props: TCardNumberProps) {
  return (
    <div className={styles.listCard}>
      <div className=''>
        <Image
          src='/images/bg-CardNumber.png'
          width={256}
          height={168}
          alt={`vga: ${props.vga.id} - type ${props.vga.loai_ma}`}
          quality={75}
          style={{
            width: '100%',
            height: 'auto'
          }}
          className='min-w-[148px] min-h-[166px]'
        />
      </div>
      <div className='absolute top-0 right-0 left-0 bottom-0 p-2 sm:p-4  flex flex-col justify-center  items-center sm:gap-2 lg:gap-2 gap-1  '>
        <Image
          src='/images/logo-handicap.png'
          width={40}
          height={37}
          alt='vHandicap'
          quality={75}
        />
        <div className={styles.borderCode}>
          <span className='text-[24px] xl:text-[36px]'>{props.vga.id}</span>
        </div>

        <div className='lg:p-1 p-0 w-full flex md:flex-row  flex-col gap-1 justify-between items-center text-[#FAFF00] font-semibold'>
          <span className='block lg:text-[16px] text-[12px]'>{formatCurrency(props.vga.amount)}đ</span>
          <Link href={`/buy-vga/${props.vga.id}`} className={styles.btnBuy}>
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  )
}
