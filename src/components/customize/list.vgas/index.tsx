'use client'
import React, { useEffect, useState } from 'react'
import CardNumber from '@/components/customize/number.card'
import { TVga } from '@/types/type'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { useGlobalStore, useLoading } from '@/stores'
import {
  apiSearchVGA,
  TParamsSearchVGA
} from '@/apis/internals/clients/search.vga'
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
  const [isClient, setIsClient] = React.useState(false)
  useEffect(() => setIsClient(true), [])
  const { vgas, searchVGA, setVgas, setSeachVGA } = useGlobalStore()

  let data = props.vgas
  if (isClient && Object.values(searchVGA).filter((value) => !!value).length) {
    data = vgas
  }

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
    if (Object.keys(searchVGA).length) {
      handleSearchVGA(searchVGA)
    }
  }, [searchVGA, setPagination, setVgas, setLoading])

  let page = searchVGA.page
  if (page && parseInt(page.toString())) {
    page = parseInt(page.toString())
  } else {
    page = 1
  }
  return (
    <div>
      <div className='grid lg:grid-cols-3 grid-cols-2 gap-2 py-4'>
        {data?.map((vga: TVga, index: number) => (
          <CardNumber vga={vga} key={index} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className='cursor-pointer min-w-16'
              href={`/vgacode?page=1`}
              onClick={(e) => {
                e.preventDefault()
                setSeachVGA({ page: 1 })
              }}
            />
          </PaginationItem>
          {page > 3 && (
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer min-w-16'
                onClick={(e) => {
                  e.preventDefault()
                  setSeachVGA({ page: page - 2 })
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
                  setSeachVGA({ page: page - 1 })
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
          <PaginationItem>
            <PaginationLink
              className='cursor-pointer min-w-16'
              onClick={(e) => {
                e.preventDefault()
                setSeachVGA({ page: page + 1 })
              }}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
          {page < pagination.last_page - 2 && (
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer min-w-16'
                onClick={(e) => {
                  e.preventDefault()
                  setSeachVGA({ page: page + 2 })
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
                setSeachVGA({ page: pagination.last_page })
              }}
              className='px-2 cursor-pointer min-w-16'
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
