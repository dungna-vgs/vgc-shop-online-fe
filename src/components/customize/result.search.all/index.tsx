'use client'
import { useGlobalStore, useLoading } from '@/stores'
import React, { useCallback, useEffect, useState } from 'react'
import CardNumber from '@/components/customize/number.card'
import PackageCard from '@/components/customize/package.card'
import { useTranslation } from 'react-i18next'
import { ConfigProvider, Pagination } from 'antd'
import { useToastStore } from '@/stores'
import { apiSearchAll } from '@/apis/internals/clients/search.all'
import viVN from 'antd/lib/locale/vi_VN'
import enUS from 'antd/lib/locale/en_US'
import { getI18n } from 'react-i18next'

import '@/styles/style.css'

export default function ResultSearchAll() {
  const { setLoading } = useLoading()
  const { t } = useTranslation('common')
  const i18n = getI18n()

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 24
  })
  const { showToast } = useToastStore()

  const {
    vgaSearchAll,
    feeSearchAll,
    totalSearch,
    keyword,
    setSearchAll,
    totalPage
  } = useGlobalStore()

  const handleChangePage = useCallback(async () => {
    try {
      if (keyword) {
        setLoading(true)
        const res = await apiSearchAll({ keyword, ...pagination })
        if (
          res.data.vgas.length == 0 &&
          res.data.membershipPackage.length == 0
        ) {
          showToast(t('not-found', { searchQuery: keyword }), 'error', 2000)
        }
        setSearchAll({
          vgaSearchAll: res.data.vgas,
          feeSearchAll: res.data.membershipPackage,
          totalSearch: res.data.total,
          totalPage: res.data.page
        })
      } else {
        setSearchAll({
          vgaSearchAll: [],
          feeSearchAll: [],
          totalSearch: 0,
          totalPage: 0
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [keyword, pagination, t, showToast, setSearchAll, setLoading])

  useEffect(() => {
    handleChangePage()
  }, [keyword, handleChangePage, pagination])

  if (!vgaSearchAll.length && !feeSearchAll.length) return null

  return (
    <div className='mt-[80px] m-auto max-w-[1320px] pt-4'>
      <h2 className='text-center font-semibold text-2xl uppercase text-[#000] pt-3'>
        {t('result-search', { total: totalSearch, keyword })}
      </h2>

      <div className='grid lg:grid-cols-4 grid-cols-2 gap-2 py-4'>
        {vgaSearchAll.map((vga) => (
          <CardNumber key={vga.id} vga={vga} />
        ))}
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 lg:gap-8'>
        <PackageCard memberships={feeSearchAll} />
      </div>
      <div className='flex justify-center'>
        <ConfigProvider
          locale={i18n.language == 'vi' ? viVN : enUS}
          theme={{
            token: {
              colorPrimary: '#fff'
            }
          }}
        >
          <Pagination
            className='reset-pagination'
            rootClassName='reset-pagination'
            pageSize={pagination.limit}
            current={pagination.page}
            total={totalPage || 0}
            onChange={(page: number, limit: number) => {
              window.scroll(0, 0)
              setPagination({ page, limit })
            }}
            pageSizeOptions={[12, 24, 48, 96]}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
