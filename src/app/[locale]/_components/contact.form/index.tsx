'use client'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp'
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

const formSchema = z.object({
  fullName: z.string().min(3).max(50),
  email: z.string().email(),
  phoneNumber: z.string(),
  service: z.enum(['buy-vga', 'membership', 'ads', 'golf-event', 'livescore'])
})

export default function ContactForm() {
  const { t } = useTranslation('form')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: ''
    }
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
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
          >
            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t('fullname')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center items-center  gap-4'>
              <div className='w-full'>
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
              </div>
              <div className='flex justify-center items-center md:mt-0 mt-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Button
                          className='bg-gradient-to-r from-[#17573C] to-[#4AC486] py-6 '
                          type='submit'
                          {...field}
                        >
                          {t('otp')}
                        </Button>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center justify-center'>
                      <InputOTP maxLength={6} className='flex justify-center' {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
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
