'use client'
import React from 'react'
import { z } from 'zod'
import { useLoading } from '@/stores'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'
import { useToastStore } from '@/stores'

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  phone: z.string(),
  service: z.enum(['buy-vga', 'membership', 'ads', 'golf-event', 'livescore'])
})

export default function ContactForm() {
  const { setLoading } = useLoading()
  const { t } = useTranslation('form')
  const { showToast } = useToastStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    }
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify(values)

    setLoading(true)
    fetch('/api/form', {
      method: 'POST',
      headers: myHeaders,
      body: raw
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        showToast(t('success-form'), 'success', 2000)
        console.log('thanh cong r')
      })
      .catch((error) => {
        console.error(error)
        showToast(t('error'), 'error', 2000)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className='mt-[53px] mb-[87px] max-w-[721px] mx-auto px-4 lg:px-8 py-4 lg:py-8 bg-white rounded-xl shadow-lg'>
      <p className='text-center  text-black font-semibold text-[24px] md:text-[32px] lg:text-[40px] leading-tight uppercase mb-2 md:mb-4'>
        {t('contact-form')}
      </p>
      <p className='text-center mt-1 mb-2 lg:mb-4 text-[16px] text-black leading-[27px]'>
        {t('contact-us')}
      </p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-6'
            action='https://script.google.com/macros/s/AKfycbxfPj2qg6EjzcWcq_ADfz2zCJj0aGULlgH6UezzCgma5KVlqmZOogJ_y-3a8Hnk-FKC/exec'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('fullname')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('phone-number')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='service'
              render={({ field }) => {
                return (
                  <FormItem>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder={t('service')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='buy-vga'>
                          {t('beautiful-code')}
                        </SelectItem>
                        <SelectItem value='membership'>
                          {t('pay-fee')}
                        </SelectItem>
                        <SelectItem value='ads'>{t('ads')}</SelectItem>
                        <SelectItem value='golf-event'>
                          {t('build-event')}
                        </SelectItem>
                        <SelectItem value='livescore'>Livescore</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button
              className='w-full bg-gradient-to-r from-[#17573C] to-[#4AC486] py-6'
              type='submit'
              disabled={!form.formState.isValid}
            >
              {t('register')}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
