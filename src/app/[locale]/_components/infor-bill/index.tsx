import Image from 'next/image'
import React from 'react'

export default function InforBill() {
  return (
    <div className='p-3 lg:p-6'>
      <p className='text-[20px] font-bold mb-6'>Thông tin thanh toán</p>
      <span className='border-b border-b-[#000] py-2'>
        Chuyển khoản trực tiếp
      </span>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-center py-6'>
          <Image
            src='/images/qrcode.jpg'
            width={164}
            height={189}
            alt='QR Core'
            quality={75}
          />
        </div>
        <p className='text-center'>Hoặc thanh toán theo thông tin bên dưới</p>

        {/* INFOR QR CODE    */}
        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-[#979797]'>
            Chủ tài khoản:{' '}
            <span className='text-black uppercase'>
              Cong ty co phan Viet Nam Golf
            </span>
          </p>
          <Image
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={75}
          />
        </div>
        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-[#979797]'>
            Số tài khoản:{' '}
            <span className='text-black uppercase'>C896656666</span>
          </p>
          <Image
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={75}
          />
        </div>
        <div className='p-4 flex justify-between items-center border border-[#F1F1F1] rounded-[7px]'>
          <p className='text-[#979797]'>
            Ngân hàng: <span className='text-black uppercase'>Techcombank</span>
          </p>
          <Image
            src='/images/copy.svg'
            width={24}
            height={24}
            alt='Copy'
            quality={75}
          />
        </div>
        <div className='grid lg:grid-cols-2 w-full h-full grid-cols-1 gap-4 '>
          <div className='p-4 border border-[#F1F1F1] rounded-[7px] flex justify-between items-center gap-4'>
            <p className='text-[#979797]'>
              Số tiền: <span className='text-black uppercase'>15.000.000</span>
            </p>
            <Image
              src='/images/copy.svg'
              width={24}
              height={24}
              alt='Copy'
              quality={75}
            />
          </div>
          <div className='p-4  border border-[#F1F1F1] rounded-[7px] flex justify-between items-center gap-4'>
            <p className='text-[#979797]'>
              Nội dung: <span className='text-black uppercase'>V6868687</span>
            </p>
            <Image
              src='/images/copy.svg'
              width={24}
              height={24}
              alt='Copy'
              quality={75}
            />
          </div>
        </div>
      </div>
      <p className='text-red-600 my-4'>
        Lưu ý: Bạn phải ghi đúng nội dung chuyển tiền, nếu ghi sai có thể gặp
        trục trặc hoặc chậm trể trong quá trình giao dịch.
      </p>
    </div>
  )
}
