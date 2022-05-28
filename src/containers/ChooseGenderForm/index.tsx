import { RadioBox } from 'src/components/Radio'
import { FC } from 'react'
import classNames from 'classnames'
import {
  form_wrapper,
  label,
  radios_wrapper,
  invalid_input,
} from './style.module.css'

type Props = {
  onGenderChange: (key: string, value: string) => void
  genderState: string
}

export const ChooseGenderForm: FC<Props> = ({
  onGenderChange,
  genderState,
}) => {
  return (
    <div className={form_wrapper}>
      <span className={label}>Gender</span>
      <div className={radios_wrapper}>
        <RadioBox
          name="Gender"
          option="Male"
          onChange={() => onGenderChange('gender', 'MALE')}
          checked={genderState === 'MALE'}
        />
        <RadioBox
          name="Gender"
          option="Female"
          onChange={() => onGenderChange('gender', 'FEMALE')}
          checked={genderState === 'FEMALE'}
        />
        <RadioBox
          name="Gender"
          option="Other"
          onChange={() => onGenderChange('gender', 'OTHER')}
          checked={genderState === 'OTHER'}
        />
      </div>
    </div>
  )
}
