import React from 'react'

const DATA = [
  {
    id: 1,
    color: 'eagle',
    shape: 'rectangle',
    name: 'Eagle or better'
  },
  {
    id: 2,
    color: 'birdie',
    shape: 'circle',
    name: 'Birdie'
  },
  {
    id: 3,
    color: 'bogey',
    shape: 'circle',
    name: 'Bogey'
  },
  {
    id: 4,
    color: 'dBogey',
    shape: 'rectangle',
    name: 'D.Bogey+'
  }
]

const ParDetailComponent = () => {
  return (
    <div className='flex flex-wrap justify-center sm:gap-0 gap-2'>
      {DATA.map(({ id, color, name, shape }, index) => (
        <div key={id} className='flex gap-2 items-center'>
          <span
            className={`w-[30px] h-[30px] bg-${color} ${shape !== 'rectangle' && 'rounded-[50%]'}`}
          />
          <p className='text-[14px] leading-5 text-black'>{name}</p>
          {index < DATA.length - 1 ? (
            <div className='border-r border-r-[#27CA40] h-6 mr-[10px]' />
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default ParDetailComponent
