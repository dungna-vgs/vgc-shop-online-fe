'use client'

import React, { useEffect } from 'react'
import * as Toast from '@radix-ui/react-toast'
import { useToastStore } from '@/stores'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
export const GlobalToast = () => {
  const { t } = useTranslation('common')
  const { open, message, duration, type, hideToast } = useToastStore()
 
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => hideToast(), duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration, hideToast])

  const handleCloseToast = () => {
    hideToast()
  }

  return (
    <Toast.Provider swipeDirection='right'>
      <Toast.Root
        className={clsx('border rounded-lg shadow-lg p-4 text-white', {
          'bg-green-600': type === 'success',
          'bg-red-600': type === 'error'
        })}
        open={open}
        onOpenChange={handleCloseToast}
        duration={duration}
      >
        <Toast.Title className='font-semibold'>{t('notification')}</Toast.Title>
        <Toast.Description className='text-sm'>{message}</Toast.Description>
      </Toast.Root>

      {/* Position the toast at the top center */}
      <Toast.Viewport className='fixed top-0 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 p-4 w-[320px] max-w-full z-[9999] outline-none' />
    </Toast.Provider>
  )
}
