'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import TabsListMembership from '@/components/customize/tabs.membership'
import { TYPE_MEMBERSHIP_PACKAGE } from '@/constants'
import { TFeePackage } from '@/types/type'
import PriorityCard from '@/components/customize/priority.card'
import { getMembershipPackageName } from '@/utils'
import { useSearchParams } from 'next/navigation'

const PackageCard = dynamic(
  () => import('@/components/customize/package.card'),
  { ssr: false }
)

type TMemberShipProps = {
  memberships: TFeePackage[]
}

export default function MembershipComponent(props: TMemberShipProps) {
  const [keyword, searchKeyword] = useState('')

  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('employee_code')
    if (code) {
      sessionStorage.setItem('employee_code', code)
    }
  }, [searchParams])

  return (
    <div>
      <Tabs defaultValue='account'>
        <div className='mb-6'>
          <TabsListMembership keyword={keyword} onSearch={searchKeyword} />
        </div>
        <TabsContent value='all'>
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 lg:gap-8 mb-2 '>
            <PriorityCard
              memberships={(props.memberships || []).filter(
                (membership) =>
                  membership.type_upgrade == TYPE_MEMBERSHIP_PACKAGE.PRIORITY &&
                  getMembershipPackageName(membership)
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
              )}
            />
            <PackageCard
              memberships={(props.memberships || []).filter(
                (membership) =>
                  membership.type_upgrade == TYPE_MEMBERSHIP_PACKAGE.PREMIUM &&
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
              memberships={(props.memberships || []).filter(
                (membership) =>
                  membership.type_upgrade == TYPE_MEMBERSHIP_PACKAGE.PREMIUM &&
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
              memberships={(props.memberships || []).filter(
                (membership) =>
                  membership.type_upgrade == TYPE_MEMBERSHIP_PACKAGE.PRIORITY &&
                  getMembershipPackageName(membership)
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
              )}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
