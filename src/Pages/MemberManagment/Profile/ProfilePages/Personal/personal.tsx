import { Select } from 'src/components/Select'
import { TextArea } from 'src/components/Textarea'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import { haveErrors } from 'src/utils'

import { DatePickerForm } from 'src/containers/DatePickerForm'
import { ChooseGenderForm } from 'src/containers/ChooseGenderForm'
import { OptionalRadioForm } from 'src/containers/OptionalRadioBoxForm'
import { MemberManagement } from 'src/managers/memberManagement'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  form_phone_address,
  row,
} from '../../../../../containers/SignUp/PersonalDetails/style.module.css'
import { validate } from './validate'
import {
  setIsFormFilled,
  setShowLoader,
} from '../../../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { toggleAlertModal } from '../../../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { useSelectorTyped } from '../../../../../utils/hooks'
import { RootState } from '../../../../../store'
import { setMemberPersonalInfo } from '../../../../../store/MebmerManagementDataStore/MemberManagementDataStore'
import { PhoneNumberForm } from '../../../../../containers/PhoneNumberForm'

const maritalStatusCodes = {
  SINGLE: 'Single',
  MARRIED: 'Married',
  DIVORCED: 'Divorced',
  COMMON_LAW: 'Common-law',
  WIDOW_WIDOWER: 'Widow/widower',
} as { [key: string]: string }

const objectiveCodes = {
  START_BUSINESS: 'Start a business',
  PROPERTY_PURCHASE: 'Buy income generating property',
  SECURE_COLLEGE_FUNDS: 'Secure college funds',
  HOME_OWNERSHIP: 'Home ownership',
  HEALTHCARE: 'Better health care',
  VACATION: 'Dream vacation',
  FURNISH: 'Furnish home',
  VEHICLE_PURCHASE: 'Buy new vehicle',
  OTHER: 'Other',
} as { [key: string]: string }

interface ICountries {
  id: number
  name: string
  phonecode: string
  phonemask: string
}

interface IStates {
  id: number
  name: string
}

const beneficiaryPhoneNumberRegExp = '[^0-9]'

export const Personal: FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { userId } = router.query

  const userID = typeof userId === 'string' ? userId : userId[0]

  const { memberPersonalInfo } = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const [countries, setCountries] = useState<Array<ICountries>>()
  const [states, setStates] = useState<Array<IStates>>()

  const [personalDataState, setPersonalDataState] = useState({
    email: '',
    objective: '',
    objectiveNote: '',
    firstName: '',
    lastName: '',
    phone: '',
    phoneParsed: {
      country: '',
      phone: '',
    },
    address: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    currentlyEmployed: false,
    jobTitle: '',
    jobDescription: '',
    employeeAddress: '',
    businessOwner: false,
    businessDescription: '',
    anyTrade: false,
    tradeDescription: '',
    anyTechnicalSkills: false,
    technicalSkillsDescription: '',
    anyAthleticSkills: false,
    athleticSkillsDescription: '',
    anyDependents: false,
    totalNumberOfDependens: '',
    beneficiaryName: '',
    beneficiaryRelationship: '',
    beneficiaryContactNumber: '',
    city: '',
    stateId: undefined,
    countryId: undefined,
    zipCode: '',
  })

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  })

  const [geoData, setGeoData] = useState({
    state: '',
    country: '',
  })

  const [inputError, setInputError] = useState<Record<string, string>>()

  const [phoneState, setPhoneState] = useState({
    phoneCode: '',
    phoneNumber: '',
  })

  const removeErrors = (name: string) => {
    setInputError((prev) => ({ ...prev, [name]: '' }))
  }

  const changePhoneState = (value: string, name: string) => {
    setPhoneState((prev) => ({ ...prev, [name]: value }))
    removeErrors('phone')
  }

  const setPersonalData = (key: string, value: string | boolean | number) => {
    setPersonalDataState((prev) => ({ ...prev, [key]: value }))
    dispatch(setIsFormFilled(true))
  }

  const handleDateOfB = (dateOfB: string) => {
    const personalDateOfBirth = dateOfB.split('-')
    const year = personalDateOfBirth && personalDateOfBirth[0]
    const month = personalDateOfBirth && +personalDateOfBirth[1] - 1
    const day = personalDateOfBirth && +personalDateOfBirth[2]

    setDateOfBirth({
      year,
      month: `${month}`,
      day: `${day}`,
    })
  }

  const changeGeoCountry = (option: string) => {
    const currentCountry = countries?.find(
      (state: ICountries) => state.name === option
    ) as { id: number; name: string } | undefined
    if (!currentCountry) return
    setPersonalData('countryId', currentCountry.id)
    setPersonalData('stateId', '')
    dispatch(setIsFormFilled(true))
    removeErrors('countryId')
  }

  const changeGeoStates = (option: string) => {
    const currentState: IStates | undefined = states?.find(
      (state: IStates) => state.name === option
    ) as { id: number; name: string } | undefined
    if (!currentState) return
    setGeoData((prev) => ({ ...prev, state: option }))
    setPersonalData('stateId', currentState.id)
    dispatch(setIsFormFilled(true))
    removeErrors('stateId')
  }

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      e.target.name === 'beneficiaryContactNumber' &&
      e.target.value.slice(1).search(beneficiaryPhoneNumberRegExp) !== -1
    )
      return

    if (e.target.name === 'totalNumberOfDependens' && +e.target.value) {
      setPersonalData(e.target.name, +e.target.value)
    } else {
      setPersonalData(e.target.name, e.target.value)
    }

    dispatch(setIsFormFilled(true))
    removeErrors(e.target.name)
  }

  const resetValue = () => {
    setPersonalDataState({ ...personalDataState, ...memberPersonalInfo })
    handleDateOfB(memberPersonalInfo.dateOfBirth)
    setPhoneState({
      phoneCode: memberPersonalInfo.phoneParsed.country.slice(1),
      phoneNumber: memberPersonalInfo.phoneParsed.phone,
    })
    setInputError({})
    dispatch(setIsFormFilled(false))
  }

  const handleForm = async () => {
    try {
      const validationErrors = validate(
        {
          ...personalDataState,
          dateOfBirth,
        },
        phoneState
      )

      const { phoneParsed, ...personalData } = personalDataState

      if (haveErrors(validationErrors)) {
        setInputError(validationErrors)
        return
      }

      const formData = {
        ...personalData,
        phone: `+${phoneState.phoneCode}${phoneState.phoneNumber}`,
        dateOfBirth: new Date(
          +dateOfBirth.year,
          +dateOfBirth.month,
          +dateOfBirth.day + 1
        )
          .toJSON()
          .slice(0, 10),
      }
      dispatch(setShowLoader(true))
      await MemberManagement.updateMemberPersonalInfo({
        ...formData,
        userId,
      })

      const res = await MemberManagement.getMemberPersonalInfo(userID)

      dispatch(setMemberPersonalInfo(res))

      dispatch(setShowLoader(false))
      await dispatch(toggleAlertModal(true))
    } catch (error: Record<string, undefined>) {
      const errors = error?.data?.errors[0]

      setInputError({
        ...inputError,
        [errors?.property]: errors?.messages[0],
      })
      dispatch(setShowLoader(false))
    }
  }

  useEffect(() => {
    setPersonalDataState({ ...personalDataState, ...memberPersonalInfo })
    setInputError({})
  }, [memberPersonalInfo])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await MemberManagement.getMemberPersonalInfo(userID)
        dispatch(setMemberPersonalInfo(res))
        setPersonalDataState({
          ...personalDataState,
          ...memberPersonalInfo,
        })
        if (!(res && res.dateOfBirth)) return

        handleDateOfB(res.dateOfBirth)

        setPhoneState({
          phoneCode: res?.phoneParsed.country.slice(1),
          phoneNumber: res?.phoneParsed.phone,
        })
      } catch (error) {
        throw error
      }
    })()
  }, [userId, countries])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await MemberManagement.getMemberCountryInfo()
        if (res.length === 0) return
        setCountries(res)
      } catch (error) {
        throw error
      }
    })()
  }, [])

  const findStateId = async (cId: string | undefined) => {
    try {
      const res = await MemberManagement.getMemberStatesInfo(cId)
      if (res.length === 0) return
      setStates(res)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (personalDataState.countryId) {
      findStateId(personalDataState?.countryId)
    }
  }, [personalDataState.countryId])

  useEffect(() => {
    if (!countries) return
    const initialCountry: ICountries | undefined = countries.find(
      (item: ICountries) => item.id === personalDataState.countryId
    )

    setGeoData({
      ...geoData,
      state: '',
      country: initialCountry?.name ?? '',
    })
  }, [countries, personalDataState.countryId])

  useEffect(() => {
    if (!states) return
    const initialStates: IStates | undefined = states.find(
      (item: IStates) => item.id === personalDataState.stateId
    )
    setGeoData({
      ...geoData,
      state: initialStates?.name ?? '',
    })
  }, [states])

  const isFormFilled = () => {
    return !Object.keys(personalDataState).every((key: string) => {
      return personalDataState[key] === memberPersonalInfo[key]
    })
  }

  const isDateFilled = () => {
    const newDate = new Date(
      +dateOfBirth.year,
      +dateOfBirth.month,
      +dateOfBirth.day + 1
    )
      .toJSON()
      .slice(0, 10)

    return newDate !== memberPersonalInfo.dateOfBirth
  }

  useEffect(() => {
    dispatch(setIsFormFilled(isDateFilled()))
  }, [dateOfBirth])

  useEffect(() => {
    dispatch(setIsFormFilled(isFormFilled()))
  }, [personalDataState, memberPersonalInfo])

  return (
    <div className="admin-info admin-info__personal">
      <div className="flex-container">
        <div className="basic-title">
          <span className="basic">Basic info</span>
        </div>
        <div className="input-container">
          <Input
            name="email"
            onChange={handleFormInputs}
            label="Email"
            value={personalDataState.email || ''}
            required
            placeholder="Enter Email"
            error={inputError?.email}
          />
          <div className="personal-info">
            <div className="mt-55" />
            <Select
              label="Objective"
              required
              options={[
                'Start a business',
                'Buy income generating property',
                'Secure college funds',
                'Home ownership',
                'Better health care',
                'Dream vacation',
                'Furnish home',
                'Buy new vehicle',
                'Other',
              ]}
              error={inputError?.objective}
              currentOption={objectiveCodes[personalDataState.objective]}
              placeholder="Select objective"
              setCurrentOption={(option: string) => {
                // eslint-disable-next-line no-restricted-syntax
                for (const item of Object.keys(objectiveCodes)) {
                  if (objectiveCodes[item] === option) {
                    setPersonalData('objective', item)
                    removeErrors('objective')
                  }
                }
              }}
            />
          </div>
          <TextArea
            value={personalDataState.objectiveNote || ''}
            onChange={handleFormInputs}
            name="objectiveNote"
            label="Objective Note"
            error={inputError?.objectiveNote}
          />
          <div className="mt-24">
            <div className="input-flex">
              <Input
                name="firstName"
                onChange={handleFormInputs}
                value={personalDataState.firstName || ''}
                label="First Name"
                required
                placeholder="Enter First Name"
                error={inputError?.firstName}
              />
              <Input
                name="lastName"
                onChange={handleFormInputs}
                value={personalDataState.lastName || ''}
                label="Last Name"
                required
                placeholder="Enter Last Name"
                error={inputError?.lastName}
              />
            </div>
          </div>

          <div className="mt-24">
            <div className={classNames(form_phone_address, row)}>
              <PhoneNumberForm
                changeStateCallback={changePhoneState}
                phoneCode={personalDataState?.phoneParsed?.country?.slice(1)}
                formState={{
                  phoneCode: phoneState.phoneCode,
                  phoneNumber: phoneState.phoneNumber,
                }}
                personalDetailsStatePhone={personalDataState.phone}
                error={inputError?.phone}
              />

              <Input
                name="address"
                onChange={handleFormInputs}
                value={personalDataState.address || ''}
                label="Your Address"
                required
                placeholder="Enter Address"
                error={inputError?.address}
              />
            </div>
          </div>
          <div className="mt-24">
            <DatePickerForm
              dateForm={dateOfBirth}
              setDateForm={setDateOfBirth}
              error={inputError?.dateOfBirth}
            />
          </div>
          <div className="martial-status">
            <div className="martial-gender">
              <ChooseGenderForm
                onGenderChange={setPersonalData}
                genderState={personalDataState.gender}
              />
            </div>
            <Select
              label="Marital Status"
              required
              options={[
                'Single',
                'Married',
                'Divorced',
                'Common-law',
                'Widow/widower',
              ]}
              currentOption={
                maritalStatusCodes[personalDataState.maritalStatus]
              }
              placeholder="Select marital status"
              setCurrentOption={(option: string) => {
                // eslint-disable-next-line array-callback-return
                Object.keys(maritalStatusCodes).map((item: string) => {
                  if (maritalStatusCodes[item] === option) {
                    setPersonalData('maritalStatus', item)
                    removeErrors('maritalStatus')
                  }
                })
              }}
              error={inputError?.maritalStatus}
            />
          </div>
          <div className="mt-35">
            <div className="member-flex">
              <OptionalRadioForm
                name="jobTitle"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('currentlyEmployed', value)
                  removeErrors('jobTitle')
                  removeErrors('jobDescription')
                  removeErrors('employeeAddress')
                }}
                questionLabel="Are You Currently Employed?"
                placeholder="Job Title"
                answerState={personalDataState.currentlyEmployed}
                value={personalDataState.jobTitle || ''}
                error={inputError?.currentlyEmployed}
                inputError={inputError?.jobTitle}
              />
            </div>
            <div className="jobs">
              <div className="jobs__flex" />
              {personalDataState.currentlyEmployed && (
                <div className="jobs__block">
                  <div className="jobs__block__margins">
                    <Input
                      onChange={handleFormInputs}
                      name="jobDescription"
                      value={personalDataState.jobDescription || ''}
                      placeholder="Job Description"
                      inputError={inputError?.jobDescription}
                    />
                  </div>
                  <div className="mb-35">
                    <Input
                      onChange={handleFormInputs}
                      name="employeeAddress"
                      value={personalDataState.employeeAddress || ''}
                      placeholder="Employee Address"
                      inputError={inputError?.employeeAddress}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="businessDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('businessOwner', value)
                  removeErrors('businessDescription')
                }}
                questionLabel="Are You a Business Owner?"
                placeholder="Business Description"
                answerState={personalDataState.businessOwner}
                value={personalDataState.businessDescription}
                error={inputError?.businessOwner}
                inputError={inputError?.businessDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="tradeDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyTrade', value)
                  removeErrors('tradeDescription')
                }}
                questionLabel="Do You Have any Trade?"
                placeholder="Trade Description"
                answerState={personalDataState.anyTrade}
                value={personalDataState.tradeDescription}
                error={inputError?.anyTrade}
                inputError={inputError?.tradeDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="technicalSkillsDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyTechnicalSkills', value)
                  removeErrors('technicalSkillsDescription')
                }}
                questionLabel="Do you Have any Technical skills?"
                placeholder="Skill Description"
                answerState={personalDataState.anyTechnicalSkills}
                value={personalDataState.technicalSkillsDescription}
                error={inputError?.anyTechnicalSkills}
                inputError={inputError?.technicalSkillsDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="athleticSkillsDescription"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyAthleticSkills', value)
                  removeErrors('athleticSkillsDescription')
                }}
                questionLabel="Do you Have any Athletic skills?"
                placeholder="Skill Description"
                answerState={personalDataState.anyAthleticSkills}
                value={personalDataState.athleticSkillsDescription}
                error={inputError?.anyAthleticSkills}
                inputError={inputError?.athleticSkillsDescription}
              />
            </div>
          </div>
          <div className="member-flex">
            <div>
              <OptionalRadioForm
                name="totalNumberOfDependens"
                onInputChange={handleFormInputs}
                onRadioChange={(value) => {
                  setPersonalData('anyDependents', value)
                  removeErrors('totalNumberOfDependens')
                }}
                questionLabel="Do You Have Any Dependent?"
                placeholder="Total Number of Dependents"
                answerState={personalDataState.anyDependents}
                value={personalDataState.totalNumberOfDependens}
                error={inputError?.anyDependents}
                inputError={inputError?.totalNumberOfDependens}
              />
            </div>
          </div>

          <Input
            label="Beneficiary"
            placeholder="Name"
            onChange={handleFormInputs}
            name="beneficiaryName"
            value={personalDataState.beneficiaryName || ''}
            required
            error={inputError?.beneficiaryName}
          />
          <div className="mt-24">
            <div className="input-flex">
              <Input
                name="beneficiaryRelationship"
                onChange={handleFormInputs}
                value={personalDataState.beneficiaryRelationship || ''}
                label="Relationship"
                required
                placeholder="Enter Relationship"
                error={inputError?.beneficiaryRelationship}
              />
              <Input
                name="beneficiaryContactNumber"
                onChange={handleFormInputs}
                label="Mobile Phone"
                value={personalDataState.beneficiaryContactNumber || ''}
                placeholder="Contact Number"
                error={inputError?.beneficiaryContactNumber}
              />
            </div>
          </div>

          <div className="personal-info">
            <div className="select-flex">
              <Select
                label="Country"
                required
                currentOption={geoData.country}
                placeholder="Select Country"
                setCurrentOption={changeGeoCountry}
                options={
                  countries
                    ? countries.map((stateInfo: ICountries) => stateInfo.name)
                    : []
                }
                error={inputError?.countryId}
              />
              <Select
                label="State"
                required
                currentOption={geoData.state}
                placeholder="Select State"
                setCurrentOption={changeGeoStates}
                options={
                  states
                    ? states?.map((stateInfo: IStates) => stateInfo.name)
                    : []
                }
                error={inputError?.stateId}
              />
            </div>
            <div className="state-flex">
              <Input
                placeholder="Enter City"
                name="city"
                label="City"
                value={personalDataState.city || ''}
                onChange={handleFormInputs}
                required
                error={inputError?.city}
              />
              <Input
                placeholder="Enter Zip Code"
                name="zipCode"
                label="Zip code"
                value={personalDataState.zipCode || ''}
                onChange={handleFormInputs}
                error={inputError?.zipCode}
              />
            </div>
          </div>
          <div className="mt-37">
            <div className="btn-flex">
              <div className="w-140">
                <Button onClick={resetValue} className="btn-cancel">
                  Cancel
                </Button>
              </div>
              <div className="w-140">
                <Button onClick={handleForm}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
