'use client'
import React, { useEffect, useState } from 'react'
import CardNumber from '@/components/customize/number.card'
import { TVga } from '@/types/type'

import { useGlobalStore, useLoading, useSearchVGA } from '@/stores'
import {
  apiSearchVGA,
  TParamsSearchVGA
} from '@/apis/internals/clients/search.vga'
import SearchNotFound from '@/components/customize/search.not.found'
import { Pagination, ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import enUS from 'antd/lib/locale/en_US'
import '@/styles/style.css'
import { getI18n } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
type TListVGAsProps = {
  vgas: TVga[]
  pagination: {
    from: number
    total: number
    last_page: number
    per_page: number
  }
}

export default function ListVGAs(props: TListVGAsProps) {
  const [pagination, setPagination] = useState(props.pagination)
  const { setLoading } = useLoading()
  const { vgas, setVgas } = useGlobalStore()
  const i18n = getI18n()
  const {
    setPage,
    page,
    vga,
    money_from,
    money_to,
    direction,
    significance_id,
    limit
  } = useSearchVGA()

  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('employee_code')
    if (code) {
      sessionStorage.setItem('employee_code', code)
    }
  }, [searchParams])

  useEffect(() => {
    setVgas(props.vgas)
  }, [props.vgas, setVgas])
  const data = vgas
  useEffect(() => {
    const handleSearchVGA = (params: TParamsSearchVGA) => {
      setLoading(true)
      apiSearchVGA(params)
        .then((res) => {
          setPagination({
            from: res.from,
            total: res.total,
            last_page: res.last_page,
            per_page: res.per_page
          })
          setVgas(res.data)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    handleSearchVGA({
      page,
      vga,
      money_from,
      money_to,
      direction,
      significance_id,
      limit
    })
  }, [
    setPagination,
    setLoading,
    page,
    vga,
    money_from,
    money_to,
    direction,
    significance_id,
    limit,
    setVgas
  ])

  const handleChangePage = (page: number, limit: number) => {
    window.scroll(0, 0)
    setPage(page, limit)
  }

  return (
    <div>
      {!data?.length && <SearchNotFound />}
      <div className='grid lg:grid-cols-3 grid-cols-2 gap-2 py-4'>
        {data?.map((vga: TVga, index: number) => (
          <CardNumber vga={vga} key={index} />
        ))}
      </div>
      <div className='flex justify-center'>
        <ConfigProvider
          locale={i18n.language == 'vi' ? viVN : enUS}
          theme={{
            token: {
              colorPrimary: '#4ac486'
            }
          }}
        >
          <Pagination
            className='reset-pagination'
            rootClassName='reset-pagination'
            pageSize={limit}
            current={page}
            total={pagination.total}
            onChange={handleChangePage}
            pageSizeOptions={[12, 24, 48, 96]}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}
