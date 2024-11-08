'use client'

import React, { useEffect } from 'react'
import * as Toast from '@radix-ui/react-toast'
import { useToastStore } from '@/stores'
import clsx from 'clsx'

export const GlobalToast = () => {
  const { open, message, duration, type, hideToast } = useToastStore()

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => hideToast(), duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration, hideToast])

  return (
    <Toast.Provider swipeDirection='right'>
      <Toast.Root
        className={clsx('border rounded-lg shadow-lg p-4 text-white', {
          'bg-green-600': type === 'success',
          'bg-red-600': type === 'error'
        })}
        open={open}
        onOpenChange={hideToast}
        duration={duration}
      >
        <Toast.Title className='font-semibold'>Thông báo</Toast.Title>
        <Toast.Description className='text-sm'>{message}</Toast.Description>
      </Toast.Root>

      {/* Position the toast at the top center */}
      <Toast.Viewport className='fixed  z-[9999] top-0 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 p-4 w-[320px] max-w-full z-50 outline-none' />
    </Toast.Provider>
  )
}
