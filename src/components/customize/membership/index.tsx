'use client'
import Image from 'next/image'
import styles from './style.module.css'
import { Button } from '@/components/ui/button'
import PackageCard from '@/components/customize/package.card'
import Link from 'next/link'
import { TFeePackage } from '@/types/type'
import { useGlobalStore } from '@/stores'
import { useTranslation } from 'react-i18next'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import clsx from 'clsx'
import { TYPE_MEMBERSHIP_PACKAGE } from '@/constants'
import PriorityCard from '@/components/customize/priority.card'
import { useState } from 'react'
import { getMembershipPackageName } from '@/utils'

type TMemberShipProps = {
  memberships: TFeePackage[]
}
export default function MemberShip(props: TMemberShipProps) {
  const { t } = useTranslation('common')
  const { vgaSearchAll, feeSearchAll } = useGlobalStore()
  const [keyword] = useState<string>('')

  if (vgaSearchAll.length || feeSearchAll.length) return null

  return (
    <div className='mt-8'>
      <div className='flex justify-between items-center pb-4'>
        <h3 className='text-xl font-semibold text-[#000]'>{t('cost')}</h3>
      </div>
      <div className={clsx(styles.customizeCard)}>
        {/* <div>
          <Tabs autoFocus defaultValue='account'>
            <div className='mb-6'>
              <TabsList
                defaultValue='all'
                className='block mb-20 md:mb-0 md:flex justify-between gap-4 bg-transparent text-black'
              >
                <div className='flex gap-4 items-center'>
                  <TabsTrigger
                    autoFocus
                    value='all'
                    className='w-20 sm:w-[128px] h-10 focus:outline-none'
                  >
                    {t('all')}
                  </TabsTrigger>
                  <TabsTrigger
                    value='premium'
                    className='w-20 sm:w-[128px] h-10 focus:outline-none'
                  >
                    Premium
                  </TabsTrigger>
                  <TabsTrigger
                    value='priority'
                    className='w-20 sm:w-[128px] h-10 focus:outline-none'
                  >
                    Priority
                  </TabsTrigger>
                </div>
                <div className='relative right-2.5 top-0  ml-auto flex-1 md:grow-0 my-4 md:my-0'>
                  <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
                  <Input
                    type='search'
                    placeholder={t('search')}
                    className='text-sm w-full rounded-lg bg-[#F5F5F5] border-none pl-8 md:w-[200px] lg:w-[260px]'
                  />
                </div>
              </TabsList>
            </div>
            <TabsContent value='all'>
              <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
                <PriorityCard
                  memberships={props.memberships.filter(
                    (membership) =>
                      membership.type_upgrade ==
                        TYPE_MEMBERSHIP_PACKAGE.PRIORITY &&
                      getMembershipPackageName(membership)
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                  )}
                />
                <PackageCard
                  memberships={props.memberships.filter(
                    (membership) =>
                      membership.type_upgrade ==
                        TYPE_MEMBERSHIP_PACKAGE.PREMIUM &&
                      getMembershipPackageName(membership)
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value='premium'>
              <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
                <PackageCard
                  memberships={props.memberships.filter(
                    (membership) =>
                      membership.type_upgrade ==
                        TYPE_MEMBERSHIP_PACKAGE.PREMIUM &&
                      getMembershipPackageName(membership)
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                  )}
                />
              </div>
            </TabsContent>
            <TabsContent value='priority'>
              <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
                <PriorityCard
                  memberships={props.memberships.filter(
                    (membership) =>
                      membership.type_upgrade ==
                        TYPE_MEMBERSHIP_PACKAGE.PRIORITY &&
                      getMembershipPackageName(membership)
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
                  )}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div> */}

        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
          <PriorityCard
            memberships={props.memberships.filter(
              (membership) =>
                membership.type_upgrade == TYPE_MEMBERSHIP_PACKAGE.PRIORITY &&
                getMembershipPackageName(membership)
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
            )}
          />
          <PackageCard
            memberships={props.memberships.filter(
              (membership) =>
                membership.type_upgrade == TYPE_MEMBERSHIP_PACKAGE.PREMIUM &&
                getMembershipPackageName(membership)
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
            )}
          />
        </div>
      </div>

      <div className='flex justify-center py-3'>
        <Link href='/package-price'>
          <Button className={styles.btnShowAll}>
            <span>{t('see-all')}</span>
            <Image
              src='/images/arrow-right.svg'
              width={16}
              height={16}
              alt='ArrowRight Icon'
              quality={60}
            />
          </Button>
        </Link>
      </div>
    </div>
  )
}
