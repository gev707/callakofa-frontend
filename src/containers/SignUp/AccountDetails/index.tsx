import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  endStageFetching,
  removeError,
  startStageFetching,
  validateStage,
  removeBackError,
} from 'src/store/reducers/signup'
import classNames from 'classnames'
import { registerAction } from 'src/store/actions/signup'
import { Button } from 'src/components/Button'
import { H1 } from 'src/components/H1'
import { Input } from 'src/components/Input'
import { useSelectorTyped } from 'src/utils/hooks'
import { ErrorsSpan } from 'src/components/ErrorsSpan'
import vector from 'src/UI/Vector.svg'
import { validate } from './validate'
import {
  form,
  form_inputs,
  form_buttons,
  account_lastRow,
} from './style.module.css'

export const AccountDetails: FC = () => {
  const stage = useSelectorTyped((state) => state.signup.stages[0])

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const dispatch = useDispatch()
  const handleOnClick = async (e: MouseEvent) => {
    e.preventDefault()
    dispatch(startStageFetching())
    const ValidationErrors = validate(formState)
    dispatch(validateStage({ errors: ValidationErrors }))

    if (!Object.values(ValidationErrors).every((elem) => elem === '')) {
      dispatch(endStageFetching())
      return
    }

    dispatch(registerAction({ ...formState }))
  }

  const handleFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(removeBackError())
    let { value } = e.target
    if (e.target.name === 'username') value = value.replace(/\s/g, '')
    dispatch(removeError(e.target.name))
    setFormState({
      ...formState,
      [e.target.name]: value,
    })
  }

  return (
    <form className={form}>
      <H1 secondary>Account Details</H1>
      <div className={form_inputs}>
        <Input
          name="username"
          onChange={handleFormInput}
          value={formState.username}
          label="Username"
          required
          placeholder="Enter Username"
          error={stage.errors?.username}
          autoFocus
        />
        <Input
          type="email"
          name="email"
          onChange={handleFormInput}
          value={formState.email}
          label="E-mail Address"
          required
          placeholder="Enter E-mail Address"
          error={stage.errors?.email}
        />
      </div>
      <div className={classNames(form_inputs, account_lastRow)}>
        <Input
          type="password"
          name="password"
          onChange={handleFormInput}
          value={formState.password}
          label="Password"
          required
          placeholder="Enter Password"
          error={stage.errors?.password}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          onChange={handleFormInput}
          value={formState.passwordConfirmation}
          label="Confirm Password"
          required
          placeholder="Enter Password Again"
          error={stage.errors?.passwordConfirmation}
        />
        {stage.fetchError && <ErrorsSpan>{stage.fetchError}</ErrorsSpan>}
      </div>

      <div className={form_buttons}>
        <Button onClick={handleOnClick} disabled={stage.finished}>
          <>Continue</>
          <img src={vector} alt="vector" />
        </Button>
      </div>
    </form>
  )
}
