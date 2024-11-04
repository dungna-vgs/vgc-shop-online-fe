'use client'

import React, { useState } from 'react'
import clsx from 'clsx'

const TABS = [
  { id: 1, name: 'Round 1' },
  { id: 2, name: 'Round 2' },
  { id: 3, name: 'Round 3' }
]

const TabsRoundComponent = () => {
  const [activeTab, setActiveTab] = useState<number>(1)

  return (
    <div className='flex'>
      {TABS.map(({ id, name }) => (
        <p
          key={id}
          className={clsx(
            `text-black cursor-pointer text-sm md:text-base py-1 px-3 ${id === activeTab ? 'border-b border-primary text-primary' : ''}`
          )}
          onClick={() => setActiveTab(id)}
        >
          {name}
        </p>
      ))}
    </div>
  )
}

export default TabsRoundComponent
