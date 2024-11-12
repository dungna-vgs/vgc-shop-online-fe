import { getI18n } from "react-i18next";
export const rangesVGA = (all: string) => [
  {
    min: undefined,
    displayMin: all,
    displayMax: '',
    space: '',
    max: undefined
  },
  {
    min: undefined,
    displayMin: '',
    displayMax: '5.000.000đ',
    space: '<',
    max: 5000000
  },
  {
    displayMin: '5.000.000đ',
    displayMax: '10.000.000đ',
    min: 5000000,
    max: 10000000,
    space: '-'
  },
  {
    displayMin: '10.000.000đ',
    displayMax: '20.000.000đ',
    min: 10000000,
    max: 20000000,
    space: '-'
  },
  {
    displayMin: '20.000.000đ',
    displayMax: '100.000.000đ',
    min: 20000000,
    max: 100000000,
    space: '-'
  },
  {
    displayMin: '100.000.000đ',
    displayMax: '300.000.000đ',
    min: 100000000,
    max: 300000000,
    space: '-'
  },
  {
    displayMin: '',
    displayMax: '300.000.000đ',
    min: 300000000,
    max: undefined,
    space: '>'
  }
]
