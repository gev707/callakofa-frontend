import { Select } from 'src/components/Select'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  datePicker_wrapper,
  datePicker_header,
  datePicker_options,
} from './style.module.css'

const daysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate()

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type Props = {
  dateForm: {
    day: string | number
    month: string | number
    year: string | number
  }
  error?: string
  setDateForm: Dispatch<
    SetStateAction<{ day: string; month: string; year: string }>
  >
}

export const DatePickerForm: FC<Props> = ({ dateForm, setDateForm, error }) => {
  const [options, setOptions] = useState({
    days: [] as number[],
    months: monthNames,
    years: Array.from({ length: 60 }, (_, i) => i + 1960),
  })

  const setYear = (option: string) => {
    setDateForm((prev) => ({ ...prev, year: option, month: '', day: '' }))
  }

  const setMonth = (option: string) => {
    setDateForm((prev) => ({
      ...prev,
      month: monthNames.indexOf(option).toString(),
      day: '',
    }))

    setOptions((prev) => ({
      ...prev,
      days: Array.from(
        { length: daysInMonth(monthNames.indexOf(option), +dateForm.year) },
        (_, i) => i + 1
      ),
    }))
  }

  const setDay = (option: string) => {
    setDateForm((prev) => ({ ...prev, day: option }))
  }

  useEffect(() => {
    if (!dateForm.month) return
    setOptions((prev) => ({
      ...prev,
      days: Array.from(
        { length: daysInMonth(+dateForm.month, +dateForm.year) },
        (_, i) => i + 1
      ),
    }))
  }, [dateForm])

  return (
    <div className={datePicker_wrapper}>
      <span className={datePicker_header}>Date of birth</span>
      <div className={datePicker_options}>
        <Select
          options={options.years.map((e) => e.toString())}
          currentOption={dateForm.year}
          setCurrentOption={setYear}
          placeholder="Select Year"
          required
          error={dateForm.year === '' ? error : ''}
        />
        <Select
          options={options.months.map((e) => e.toString())}
          currentOption={(dateForm.month && monthNames[+dateForm.month]) || ''}
          setCurrentOption={setMonth}
          placeholder="Select Month"
          required
          error={dateForm.month === '' ? error : ''}
          disabled={!dateForm.year}
        />
        <Select
          options={options.days.map((e) => e.toString())}
          currentOption={dateForm.day}
          setCurrentOption={setDay}
          placeholder="Select Day"
          required
          disabled={!dateForm.year || !dateForm.month}
          error={dateForm.day === '' ? error : ''}
        />
      </div>
    </div>
  )
}
