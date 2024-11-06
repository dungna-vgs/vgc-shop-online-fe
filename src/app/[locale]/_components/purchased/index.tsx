import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HasPurchased() {
  return (
    <div className='text-black'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>Đã thanh toán</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <p className='text-center text-[18px] font-bold text-black w-ful uppercase'>
              Mã VGA đã được mua
            </p>
            <AlertDialogDescription className='text-center mt-2'>
              Rất tiếc! Mã VGA này đã được mua bởi 1 người dùng khác. Vui lòng
              chọn lại 1 mã VGA khác và thử lại!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Link href='/' className='flex justify-center mt-2'>
            <Button className='text-white bg-gradient-to-r leading-[64px] outline-none from-[#17573C] to-[#4AC486]  rounded-[6px] flex justify-center w-40 md:w-[250px] h-16 text-[16px]'>
              Ok, tôi đã hiểu
            </Button>
          </Link>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
