import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsFormFilled } from '../../../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import {
  toggleAlertModal,
  setSocialInfo,
} from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { ProfileManager } from '../../../../../managers/profile'
import { Input } from '../../../../../components/Input'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'
import MainLoader from '../../../../../components/Loaders/MainLoader'

export const Social: FC = () => {
  const dispatch = useDispatch()

  const [pageProps, setPageProps] = useState({ loader: false })
  const { socialInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const [inputValue, setInputValue] = useState<Record<string, string>>({
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  })

  const [inputError, setInputError] = useState({
    about: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
    setInputError({
      ...inputError,
      [e.target.name]: '',
    })
    dispatch(setIsFormFilled(true))
  }

  const resetValue = () => {
    setInputValue(socialInfo)
    setInputError({
      about: '',
      facebook: '',
      twitter: '',
      linkedIn: '',
    })
    dispatch(setIsFormFilled(false))
  }

  const onSubmit = async () => {
    const res: Record<string, string> = {}
    if (inputValue.facebook) {
      res.facebook = inputValue.facebook
    }

    if (inputValue.twitter) {
      res.twitter = inputValue.twitter
    }

    if (inputValue.linkedIn) {
      res.linkedIn = inputValue.linkedIn
    }

    if (inputValue.about) {
      res.about = inputValue.about
    }

    try {
      setPageProps({ loader: true })
      await ProfileManager.changeSocialInfo(res)
      dispatch(toggleAlertModal(true))
      const newSocialInfo = await ProfileManager.getSocialInfo()
      dispatch(setSocialInfo(newSocialInfo))
    } catch (error_: Record<string, unknown>) {
      const { errors } = error_.data
      const newInputErrors: Record<string, unknown> = {}

      if (typeof errors !== 'object' && errors.length === 0) return
      // eslint-disable-next-line no-restricted-syntax
      for (const error of errors) {
        // eslint-disable-next-line prefer-destructuring
        newInputErrors[error.property] = error.messages[0]
      }
      setInputError({
        ...inputError,
        ...newInputErrors,
      })
    }
    setPageProps({ loader: false })
  }

  const isFormFilled = () => {
    return !Object.keys(inputValue).every((key: string) => {
      return inputValue[key] === socialInfo[key] || inputValue[key] === ''
    })
  }

  useEffect(() => {
    setInputValue(socialInfo)
  }, [socialInfo])

  useEffect(() => {
    dispatch(setIsFormFilled(isFormFilled()))
  }, [inputValue])

  return (
    <div className="content">
      <div className="input-container">
        <div className="input-label">About me</div>
        <Input
          name="about"
          value={inputValue.about}
          onChange={handleChange}
          placeholder="Add info here"
          error={inputError.about}
        />
        <div className="input-label">Facebook</div>
        <Input
          name="facebook"
          value={inputValue.facebook}
          onChange={handleChange}
          placeholder="https://www.facebook.com"
          error={inputError.facebook}
        />
        <div className="input-label">Twitter</div>
        <Input
          name="twitter"
          value={inputValue.twitter}
          onChange={handleChange}
          placeholder="https://www.twitter.com"
          error={inputError.twitter}
        />
        <div className="input-label">LinkedIn</div>
        <Input
          name="linkedIn"
          value={inputValue.linkedIn}
          onChange={handleChange}
          placeholder="https://www.linkedin.com"
          error={inputError.linkedIn}
        />
        <div className="btn-container">
          <button onClick={resetValue} className="btn-cancel">
            Cancel
          </button>
          <button onClick={onSubmit} className="btn-save">
            Save Changes
          </button>
        </div>
      </div>
      {pageProps.loader && <MainLoader />}
    </div>
  )
}
