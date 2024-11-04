import React from 'react'
import NotFoundContent from '@/components/customize/not.found'

import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black'
}

export const generateViewport = () => ({
  themeColor: '#FFFFFF'
})

export default function NotFound() {
  return <NotFoundContent />
}
