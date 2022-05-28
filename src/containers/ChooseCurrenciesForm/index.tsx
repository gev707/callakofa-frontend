import { FC } from 'react'
import { RadioBox } from 'src/components/Radio'
import { form_wrapper, label, radios_wrapper } from './style.module.css'

type Props = {
  onCurrenciesChange: (key: string, value: string) => void
  currenciesState: string
}

export const ChooseCurrenciesForm: FC<Props> = ({
  onCurrenciesChange,
  currenciesState,
}) => {
  return (
    <div className={form_wrapper}>
      <span className={label}>Currencies</span>
      <div className={radios_wrapper}>
        <RadioBox
          name="Currencies"
          option="USDT ERC 20"
          onChange={() => onCurrenciesChange('accountCurrency', 'USDT_ERC20')}
          checked={currenciesState === 'USDT_ERC20'}
        />
        <RadioBox
          name="Currencies"
          option="USDT TRC 20"
          onChange={() => onCurrenciesChange('accountCurrency', 'USDT_TRC20')}
          checked={currenciesState === 'USDT_TRC20'}
        />
      </div>
    </div>
  )
}
