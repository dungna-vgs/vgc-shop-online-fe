'use client'
import { MapPin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'


const Footer: React.FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className='bg-[#012f2d]'>
      <div className='max-w-[1200px] mx-auto'>
        <div className='grid lg:grid-cols-3 gap-y-8 p-4 mx-auto max-w-[1200px] py-6 lg:py-10 text-background'>
          <div className='footer-item flex flex-col text-base gap-4 p-2 text-justify'>
            <div className='flex justify-center lg:justify-start '>
              <Image
                src='/images/vgc.svg'
                width={197}
                height={47}
                alt='VG Corp Logo'
              />
            </div>
            <span className='font-semibold text-base lg:text-start text-center'>
              Vietnam Golf Corporation (VG Corp)
            </span>
            <div className='flex items-center gap-3 justify-start'>
              <MapPin className='min-w-[24px]' />
              <Link
                className=''
                target='_blank'
                href='https://www.google.com/maps/search/+BT4.7+-+Khu+bi%E1%BB%87t+th%E1%BB%B1+ngo%E1%BA%A1i+giao+%C4%91o%C3%A0n,+P.+Xu%C3%A2n+T%E1%BA%A3o,+Q.+B%E1%BA%AFc+T%E1%BB%AB+Li%C3%AAm,+++++++++++++++H%C3%A0+N%E1%BB%99i/@21.0667597,105.7909583,16z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D'
              >
               {t('map')}
              </Link>
            </div>
            <div className='flex items-center gap-3 justify-start'>
              <Mail />
              <Link
                href='mailto:feedback@vgcorp.vn?'
                target='_blank'
                className=''
              >
                feedback@vgcorp.vn
              </Link>
            </div>
            <div className='flex items-center gap-3 justify-start'>
              <Phone />
              <Link href='tel:+0899955599' target='_blank' className=''>
                0899 955 599
              </Link>
            </div>
            <div className='block md:hidden'>
              <div className='flex w-full justify-end items-center gap-4'>
                <Link
                  href='https://www.facebook.com/vgcorp.vn/'
                  target='_blank'
                  className='w-[46px] h-[46px] rounded-full bg-[#274E4D]  flex justify-center items-center'
                >
                  <Image
                    src='/images/facebook.svg'
                    width={18}
                    height={32}
                    alt='Facebook'
                    className={styles.colorIcon}
                  />
                </Link>
                <Link
                  href='https://www.youtube.com/@GolfNewsVNOfficial/videos'
                  target='_blank'
                  className='w-[46px] h-[46px] rounded-full bg-[#274E4D] flex justify-center items-center'
                >
                  <Image
                    src='/images/youtube.svg'
                    width={30}
                    height={20}
                    alt='Youtube'
                    className={styles.colorIcon}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className='hidden footer-item lg:flex flex-col text-base gap-4 p-2'>
            <Image
              src='/images/vhandicap.svg'
              width={218}
              height={50}
              alt='vhandicap'
            />
            <span>
              <strong>vHandicap</strong> - {t('vgc-content')}
            </span>
            <div className='lg:flex grid lg:grid-cols-2 grid-cols-1 gap-y-4 gap-4'>
              <Link href='https://play.google.com/store/apps/details?id=com.golfervn.vga.vgagolfer'>
                <Image
                  src='/images/gg-play.svg'
                  width={160}
                  height={46}
                  alt='Google Play'
                />
              </Link>

              <Link href='https://apps.apple.com/us/app/vhandicap-golf/id1269491596?platform=iphone'>
                <Image
                  src='/images/app-store.svg'
                  width={160}
                  height={46}
                  alt='App Store'
                />
              </Link>
            </div>
          </div>
          <div className='hidden footer-item lg:flex flex-col space-y-4'>
            <Image
              src='/images/phone.svg'
              width={50}
              height={50}
              alt='Contact Icon'
            />
            <span className='font-semibold text-xl'>{t('customer-service')}</span>
            <span>
            {t('contact')}
            </span>
            <div className='flex items-center gap-3 justify-start'>
              <Mail />
              <Link
                href='mailto:feedback@vgcorp.vn?'
                target='_blank'
                className=''
              >
                feedback@vgcorp.vn
              </Link>
            </div>
            <div className='flex items-center gap-3 justify-start'>
              <Phone />
              <Link href='tel:+0899855599' target='_blank'>
                0899 955 599
              </Link>
            </div>
          </div>
        </div>

        <div className=' py-4 px-10'>
          <span className='text-white block  text-left pt-4 border-t lg:border-none border-t-[#FFF]'>
            @ Copyright 2024. Vietnam Golf Corporation
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
