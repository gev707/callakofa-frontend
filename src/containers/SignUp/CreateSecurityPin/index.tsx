import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { PinInput } from 'src/components/PinInput'
import { useDispatch } from 'react-redux'
import { sendPinAction } from 'src/store/actions/signup'
import {
  endStageFetching,
  removeError,
  startStageFetching,
  validateStage,
} from 'src/store/reducers/signup'
import { haveErrors } from 'src/utils'
import { useSelectorTyped } from 'src/utils/hooks'
import vector from 'src/UI/Vector.svg'
import { form, form_buttons, form_fetching_error } from './style.module.css'
import { validate } from './validation'

export const CreateSecurityPin: FC = () => {
  const stage = useSelectorTyped((state) => state.signup.stages[1])

  const [pinForm, setPin] = useState({
    pin: '',
    confirmPin: '',
  })

  const dispatch = useDispatch()

  const handlePin = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value === 0 || e.target.value === '' || +e.target.value) {
      dispatch(removeError(e.target.name))
      setPin((prev) => ({ ...prev, [e.target.name]: e.target.value.trim() }))
    }
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    const validationErrors = validate(pinForm)
    dispatch(validateStage({ errors: validationErrors }))

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching())
      return
    }

    dispatch(sendPinAction(pinForm))
  }

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        handleForm()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [pinForm.pin, pinForm.confirmPin])

  return (
    <div className={form}>
      <H1 secondary>Create security PIN</H1>
      <PinInput
        onChange={handlePin}
        value={pinForm.pin}
        error={stage.errors?.pin}
        name="pin"
        autoFocus="true"
      />
      <PinInput
        onChange={handlePin}
        value={pinForm.confirmPin}
        error={stage.errors?.confirmPin}
        placeholder="Confirm PIN"
        name="confirmPin"
        confirm={!pinForm.confirmPin}
      />
      {stage.fetchError && (
        <span className={form_fetching_error}>{stage.fetchError}</span>
      )}
      <div className={form_buttons}>
        <Button onClick={handleForm} disabled={stage.fetching}>
          <>Continue</>
          <img src={vector} alt="vector" />
        </Button>
      </div>
    </div>
  )
}
