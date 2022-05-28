import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input } from '../../../../../components/Input'
import { Button } from '../../../../../components/Button'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'
import { MemberManagement } from '../../../../../managers/memberManagement'
import {
  setSocialInfo,
  toggleAlertModal,
} from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { setIsFormFilled } from '../../../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import MainLoader from '../../../../../components/Loaders/MainLoader'

export const Social: FC = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const { memberAccountInfo } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const { socialInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const [pageProps, setPageProps] = useState({ loader: false })

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

  const userId = memberAccountInfo.id

  const resetValue = () => {
    setInputValue(socialInfo)
    setInputError({})
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    })
    setInputError({
      ...inputError,
      [e.target.name]: '',
    })
    dispatch(setIsFormFilled(false))
  }

  const onSubmit = async () => {
    const response: Record<string, string> = {}
    if (inputValue.facebook) {
      response.facebook = inputValue.facebook
    }
    if (inputValue.twitter) {
      response.twitter = inputValue.twitter
    }
    if (inputValue.linkedIn) {
      response.linkedIn = inputValue.linkedIn
    }
    if (inputValue.about) {
      response.about = inputValue.about
    }
    try {
      setPageProps({ loader: true })
      await MemberManagement.updateMemberSocialData({
        ...response,
        userId,
      })
      dispatch(toggleAlertModal(true))
      const newSocialInfo = MemberManagement.getMemberSocialData({ userId })
      dispatch(setSocialInfo(newSocialInfo))
    } catch (error_: Record<string, unknown>) {
      const { errors } = error_.data
      const newErrors: Record<string, unknown> = {}

      if (typeof errors !== 'object' && errors.length === 0) return

      // eslint-disable-next-line no-restricted-syntax
      for (const error of errors) {
        // eslint-disable-next-line prefer-destructuring
        newErrors[error.property] = error.messages[0]
      }
      setInputError({
        ...inputError,
        ...newErrors,
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
    dispatch(setIsFormFilled(isFormFilled()))
  }, [inputValue])

  useEffect(() => {
    setInputValue(socialInfo)
  }, [socialInfo])

  return (
    <div className="admin-info">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Social Presence</span>
        </div>
        <div className="w-100">
          <div className="input-container">
            <div className="input-flex">
              <Input
                label="About me"
                name="about"
                placeholder="Add info here"
                value={inputValue.about}
                onChange={changeValue}
                error={inputError.about}
              />
              <Input
                label="Facebook"
                name="facebook"
                placeholder="https://www.facebook.com"
                value={inputValue.facebook}
                onChange={changeValue}
                error={inputError.facebook}
              />
            </div>
          </div>
          <div className="mt-24" />
          <div className="input-container">
            <div className="input-flex">
              <Input
                label="Twitter"
                name="twitter"
                placeholder="https://www.twitter.com"
                value={inputValue.twitter}
                onChange={changeValue}
                error={inputError.twitter}
              />
              <Input
                label="LinkedIn"
                name="linkedIn"
                placeholder="https://www.linkedin.com"
                value={inputValue.linkedIn}
                onChange={changeValue}
                error={inputError.linkedIn}
              />
            </div>
            <div className="mt-24" />
            <Button onClick={resetValue} className="btn-cancel w-140">
              Cancel
            </Button>
            <Button onClick={onSubmit} className="w-140">
              Save
            </Button>
          </div>
        </div>
        {pageProps.loader && <MainLoader />}
      </div>
    </div>
  )
}
