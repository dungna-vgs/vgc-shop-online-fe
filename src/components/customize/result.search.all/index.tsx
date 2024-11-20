'use client'
import { useGlobalStore, useLoading } from '@/stores'
import React, { useCallback, useEffect, useState } from 'react'
import CardNumber from '@/components/customize/number.card'
import PackageCard from '@/components/customize/package.card'
import { useTranslation } from 'react-i18next'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useToastStore } from '@/stores'

import { apiSearchAll } from '@/apis/internals/clients/search.all'
export default function ResultSearchAll() {
  const { setLoading } = useLoading()
  const { t } = useTranslation('common')
  const [page, setPage] = useState(1)
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
        const res = await apiSearchAll({ keyword, page })
        if (res.data.vgas.length > 0 || res.data.membershipPackage.length > 0) {
          setSearchAll({
            vgaSearchAll: res.data.vgas,
            feeSearchAll: res.data.membershipPackage,
            totalSearch: res.data.total,
            totalPage: res.data.page
          })
        } else {
          showToast(t('not-found', { searchQuery: keyword }), 'error', 2000)
        }
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
  }, [keyword, page, t, showToast, setSearchAll, setLoading])

  useEffect(() => {
    handleChangePage()
  }, [keyword, handleChangePage, page])

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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className='cursor-pointer min-w-16'
              href={`/?page=1`}
              onClick={(e) => {
                e.preventDefault()
                setPage(1)
              }}
            />
          </PaginationItem>
          {page > 3 && (
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer min-w-16'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page - 2)
                }}
              >
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
          )}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer min-w-16'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page - 1)
                }}
              >
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              className='cursor-pointer min-w-16'
              onClick={(e) => {
                e.preventDefault()
              }}
              href='#'
              isActive
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          {totalPage && page < totalPage && (
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer min-w-16'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {totalPage && page < totalPage - 1 && (
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer min-w-16'
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 2)
                }}
              >
                <PaginationEllipsis />
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault()
                if (totalPage && page < totalPage) {
                  setPage(totalPage)
                }
              }}
              className='px-2 cursor-pointer min-w-16'
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
