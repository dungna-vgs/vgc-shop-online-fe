import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import styles from './style.module.css'
import Link from 'next/link'
import { TPromotion } from '@/types/type'

type TOfferItem = {
  promotion: TPromotion
}
export default function OfferItem(props: TOfferItem) {
  return (
    <div>
      <div>
        <Image
          src={props.promotion.image}
          width={454}
          height={454}
          alt={props.promotion.name}
          quality={80}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderTopRightRadius: '16px',
            borderTopLeftRadius: '16px'
          }}
        />
      </div>
      <div className='flex justify-center bg-white rounded-[24px] items-center py-3 max-w-full'>
        <Link href={`/vgacode?promotion_program_id=${props.promotion.id}`}>
          <Button className={styles.btnBuy}>
            <span>Mua ngay</span>
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  )
}
