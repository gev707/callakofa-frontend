import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { Input } from 'src/components/Input'
import { ChooseCurrenciesForm } from 'src/containers/ChooseCurrenciesForm'
import { useSelectorTyped } from 'src/utils/hooks'
import vector from 'src/UI/Vector.svg'
import {
  backStage,
  endStageFetching,
  startStageFetching,
  removeBackError,
} from 'src/store/reducers/signup'
import {
  form,
  actions_buttons,
  payment_rightSide,
  double_input,
} from './style.module.css'

import { sendPaymentDetails } from '../../../store/actions/signup'

export const PaymentDetails: FC = () => {
  const dispatch = useDispatch()
  const { fetchError } = useSelectorTyped((state) => state.signup.stages[4])

  const [paymentDetails, setPaymentDetails] = useState({
    accountCurrency: 'USDT_ERC20',
    accountAddress: '',
  })

  const handleCurrencyChange = (key: string, value: string) => {
    setPaymentDetails({ ...paymentDetails, [key]: value })
  }

  const handleFormInputs = (e: ChangeEvent<HTMLInputElement>) => {
    handleCurrencyChange(e.target.name, e.target.value)
    dispatch(removeBackError())
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    if (fetchError) {
      dispatch(endStageFetching())
      return
    }

    dispatch(sendPaymentDetails(paymentDetails))
  }

  const handleBack = () => {
    dispatch(backStage())
  }

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        handleForm()
      }
    }
    if (paymentDetails.accountAddress && paymentDetails.accountCurrency) {
      document.addEventListener('keydown', listener)
    }
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [paymentDetails])

  return (
    <div className={form}>
      <H1 secondary>Payment Details</H1>
      <div className={double_input}>
        <ChooseCurrenciesForm
          onCurrenciesChange={handleCurrencyChange}
          currenciesState={paymentDetails.accountCurrency}
        />

        <div className={payment_rightSide}>
          <Input
            name="accountAddress"
            onChange={handleFormInputs}
            value={paymentDetails.accountAddress}
            label="Billing Address"
            required
            placeholder="Enter Billing Address"
            maxLength={255}
            error={fetchError}
          />

          <div className={actions_buttons}>
            <Button secondary onClick={handleBack}>
              <>Back</>
            </Button>
            <Button
              onClick={handleForm}
              disabled={
                !paymentDetails.accountAddress ||
                !paymentDetails.accountCurrency
              }
            >
              <>Continue</>
              <img src={vector} alt="vector" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
