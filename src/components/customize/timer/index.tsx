import React, { useEffect, useState, FC } from 'react'

const Countdown: FC = () => {
  const [time, setTime] = useState<number>(600)

  useEffect(() => {
    const timer: NodeJS.Timeout = setInterval(() => {
      setTime((time: number) => {
        if (time === 0) {
          clearInterval(timer)
          return 1
        } else return time - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <p>
      {`${Math.floor(time / 60)}`.padStart(2, '0')}:
      {`${time % 60}`.padStart(2, '0')}
    </p>
  )
}

export default Countdown
