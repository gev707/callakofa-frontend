import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleAlertModal } from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { ProfileManager } from '../../../managers/profile'
import { setIsFormFilled } from '../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { Select } from '../../../components/Select'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'

const defaultLanguageOption = {
  ENGLISH: 'ENGLISH',
} as { [key: string]: string }

const defaultCurrencyOption = {
  USD: 'USD',
} as { [key: string]: string }

export const Default: FC = () => {
  const [inputValue, setInputValue] = useState<Record<string, string>>({
    language: '',
    currency: '',
  })
  const [inputError, setInputError] = useState({
    language: '',
    currency: '',
  })
  const { defaults } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )

  const dispatch = useDispatch()
  const setPersonalDetails = (key: string, value: string) => {
    setInputValue({ ...inputValue, [key]: value })
    dispatch(setIsFormFilled(true))
    setInputError({
      language: '',
      currency: '',
    })
  }

  const resetValue = () => {
    setInputValue(defaults)
    setInputError({
      language: '',
      currency: '',
    })
    dispatch(setIsFormFilled(false))
  }

  const onSave = async () => {
    if (Object.values(inputValue).every((name: string) => name === '')) return

    try {
      await ProfileManager.changeDefaults(inputValue)
      dispatch(toggleAlertModal(true))
      resetValue()
    } catch (error) {
      throw error
    }
  }
  const isFormFilled = () => {
    return !Object.keys(inputValue).every(
      (key: string) => inputValue[key] === defaults[key]
    )
  }

  useEffect(() => {
    dispatch(setIsFormFilled(isFormFilled()))
  }, [inputValue])

  useEffect(() => {
    setInputValue(defaults)
  }, [defaults])

  return (
    <div className="edit-container">
      <div className="sec-title">
        <span>SET DEFAULT LANGUAGE & CURRENCY</span>
      </div>
      <hr />
      <div className="edit-holder">
        <div className="content">
          <div className="input-container">
            <div className="input-container__fields">
              <Select
                options={['ENGLISH']}
                currentOption={defaultLanguageOption[inputValue.language]}
                setCurrentOption={(option: string) => {
                  // eslint-disable-next-line array-callback-return
                  Object.keys(defaultLanguageOption).map((item: string) => {
                    if (defaultLanguageOption[item] === option) {
                      setPersonalDetails('language', item)
                    }
                  })
                }}
                placeholder="Select"
                error={inputError.language}
                label="Set Default Language"
              />
              <Select
                options={['USD']}
                currentOption={defaultCurrencyOption[inputValue.currency]}
                setCurrentOption={(option: string) => {
                  // eslint-disable-next-line array-callback-return
                  Object.keys(defaultCurrencyOption).map((item: string) => {
                    if (defaultCurrencyOption[item] === option) {
                      setPersonalDetails('currency', item)
                    }
                  })
                }}
                placeholder="Select"
                error={inputError.currency}
                label="Set Default Currency"
              />
            </div>
            <div className="btn-container">
              <button onClick={resetValue} className="btn-cancel">
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={!isFormFilled()}
                className={isFormFilled() ? 'btn-save' : 'btn-disable'}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
