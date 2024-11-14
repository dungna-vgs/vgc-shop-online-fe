import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'

const Loading: FC = () => {
  const [text, setText] = useState<string>('')
  const [showImg, setShowImg] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImg(false)
      setText('')
    }, 500000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div>
        {showImg ? (
          <Image
            src='/images/Loading.svg'
            width={56}
            height={56}
            alt='Loading'
          />
        ) : (
          <h3>{text}</h3>
        )}
      </div>
    </>
  )
}

export default Loading
