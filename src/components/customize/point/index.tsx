import clsx from 'clsx'

const styles =
  'w-[30px] h-[30px] m-auto text-white flex justify-center items-center'

export const eaglePoint = (value: number) => (
  <p className={clsx(styles, 'bg-eagle')}>{value}</p>
)

export const birdiePoint = (value: number) => (
  <p className={clsx(styles, 'bg-birdie rounded-[50%]')}>{value}</p>
)

export const bogeyPoint = (value: number) => (
  <p className={clsx(styles, 'bg-bogey rounded-[50%]')}>{value}</p>
)

export const dbogeyPoint = (value: number) => (
  <p className={clsx(styles, 'bg-dBogey')}>{value}</p>
)

export const score = (value: string) => (
  <p className={clsx(styles, '!w-10 !h-5 bg-birdie text-xs rounded-l-sm')}>
    {value}
  </p>
)
