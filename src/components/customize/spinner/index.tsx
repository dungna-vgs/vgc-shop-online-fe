'use client'
import React from 'react'
import { useLoading } from '@/stores'
import Loading from '@/components/customize/loading'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

let clickTime = 0
let pathWhenClicked = ''

type TMessage = {
  data: {
    fetchUrl: string
    dest: string
  }
}

export function useOnNavigate() {
  const curPath = usePathname()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    clickTime = 0
    if (curPath !== pathWhenClicked) {
      setLoading(false)
    }
  }, [curPath])

  useEffect(() => {
    if (typeof navigator === 'undefined') return

    const onMessage = ({ data }: TMessage) => {
      if (Date.now() - clickTime > 1000) return

      const url = toURL(data.fetchUrl)
      if (url?.search.startsWith('?_rsc=') && data.dest === '') {
        clickTime = 0
        setLoading(true)
      }
    }

    const sw = navigator.serviceWorker
    sw?.addEventListener('message', onMessage)

    const onClick = () => {
      clickTime = Date.now()
      pathWhenClicked = location.pathname
    }

    addEventListener('click', onClick, true)

    return () => {
      sw?.removeEventListener('message', onMessage)
      removeEventListener('click', onClick, true)
    }
  }, [])

  return loading
}

function toURL(url: string) {
  try {
    if (url) return new URL(url)
  } catch (e) {}
  return null
}

export default function Spinner() {
  const { loading } = useLoading()
  const nav = useOnNavigate()
  if (loading || nav) {
    return <Loading />
  }
}