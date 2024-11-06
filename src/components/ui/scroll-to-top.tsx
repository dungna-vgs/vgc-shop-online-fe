'use client'
import { ArrowUpToLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  const handleScrolling = () => {
    if (scrollY > 500) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScrolling)
    return () => {
      window.removeEventListener('scroll', handleScrolling)
    }
  }, [])
  return (
    <div
      onClick={scrollToTop}
      className={`rounded-full cursor-pointer hover:scale-110 ease-in duration-150 flex justify-center items-center bg-[#4AC486] h-11 w-11 fixed z-[999] right-8 bottom-8
         ${showButton ? 'visible' : 'invisible'}`}
    >
      <ArrowUpToLine stroke='#FFF' />
    </div>
  )
}
