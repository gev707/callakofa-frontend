import { Select } from 'src/components/Select'
import { TextArea } from 'src/components/Textarea'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectorTyped } from 'src/utils/hooks'
import {
  endStageFetching,
  startStageFetching,
  validateStage,
} from 'src/store/reducers/signup'
import { haveErrors } from 'src/utils'
import { PhoneNumberForm } from 'src/containers/PhoneNumberForm'
import { LinkText } from 'src/components/LinkText'
import { Button } from 'src/components/Button'
import { Input } from 'src/components/Input'
import {
  getPersonalDetails,
  sendPersonalDetails,
} from 'src/store/actions/signup'
import { DatePickerForm } from 'src/containers/DatePickerForm'
import classNames from 'classnames'
import { ChooseGenderForm } from 'src/containers/ChooseGenderForm'
import { OptionalRadioForm } from 'src/containers/OptionalRadioBoxForm'
import { CheckBox } from 'src/components/CheckBox'
import { ErrorsSpan } from 'src/components/ErrorsSpan'
import { H1 } from 'src/components/H1'
import vector from 'src/UI/Vector.svg'
import {
  form,
  form_actions,
  actions_buttons,
  form_fullName,
  form_phone_address,
  martial_gender,
  select_stabilizer,
  options_wrapper,
  double_input,
  job_question_inputs,
  row,
  margin_cont,
  row_employed,
  bottom_area,
} from './style.module.css'
import { validate } from './validate'

interface ICountries {
  id: number
  name: string
  phonecode: string
  phonemask: string
}

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

export const PersonalDetails: FC = () => {
  const { fetchError, initialData } = useSelectorTyped(
    (state) => state.signup.stages[3]
  )
  const { countries, country, states } = useSelectorTyped(
    (state) => state.signup.userInfo
  )
  const [personalDetailsState, setPersonalDetailsState] = useState({
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
    gender: 'MALE',
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

  const [termsAcceptance, setTermsAcceptance] = useState(false)
  const [geoData, setGeoData] = useState({
    state: '',
    country: '',
  })

  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  })

  const [phoneState, setPhoneState] = useState({
    phoneCode: country.phonecode.slice(1),
    phoneNumber: '',
  })

  const dispatch = useDispatch()

  const removeErrors = (name: string) => {
    dispatch(validateStage({ errors: { [name]: '' } }))
  }

  const setPersonalDetails = (
    key: string,
    value: string | boolean | number
  ) => {
    setPersonalDetailsState((prev) => ({ ...prev, [key]: value }))
  }

  const changePhoneState = (value: string, name: string) => {
    setPhoneState((prev) => ({ ...prev, [name]: value }))
    removeErrors('phone')
  }

  const changeGeoCountry = (option: string) => {
    const currentCountry = countries.find(
      (state: Record<string, string>) => state.name === option
    ) as { id: number; name: string } | undefined

    if (currentCountry) {
      dispatch({
        type: 'GEO_TAKE',
        payload: {
          countryId: currentCountry.id,
          at: 'states',
        },
      })
      setPersonalDetails('countryId', currentCountry.id)
    }
    setGeoData((prev) => ({ ...prev, country: option, state: '' }))
  }

  const changeGeoStates = (option: string) => {
    const currentState = states.find(
      (city: Record<string, string>) => city.name === option
    ) as { id: number; name: string } | undefined

    setGeoData((prev) => ({ ...prev, state: option }))
    if (currentState) setPersonalDetails('stateId', currentState.id)
    removeErrors('stateId')
  }

  const handleForm = () => {
    dispatch(startStageFetching())

    const validationErrors = validate(
      {
        ...personalDetailsState,
        dateOfBirth,
      },
      phoneState
    )
    dispatch(validateStage({ errors: validationErrors }))

    if (haveErrors(validationErrors)) {
      dispatch(endStageFetching())
      return
    }

    const formData: any = {
      ...personalDetailsState,
      phone: `+${phoneState.phoneCode}${phoneState.phoneNumber}`,
      dateOfBirth: new Date(
        +dateOfBirth.year,
        +dateOfBirth.month,
        +dateOfBirth.day + 1
      )
        .toJSON()
        .slice(0, 10),
    }

    if (formData.objectiveNote === '') {
      delete formData.objectiveNote
    }

    if (formData.zipCode === '') {
      delete formData.zipCode
    }

    const { phoneParsed, ...body } = formData
    dispatch(sendPersonalDetails(body))
  }

  const handleFormInputs = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.name === 'totalNumberOfDependens' && +e.target.value) {
      setPersonalDetails(e.target.name, +e.target.value)
    } else {
      setPersonalDetails(e.target.name, e.target.value)
    }
    removeErrors(e.target.name)
  }

  useEffect(() => {
    if (country.id < 0) return
    dispatch({
      type: 'GEO_TAKE',
      payload: { countryId: country.id, at: 'states' },
    })

    setPhoneState({
      ...phoneState,
      phoneCode: country.phonecode.slice(1),
    })

    setPersonalDetailsState({
      ...personalDetailsState,
      countryId: country.id,
    })
  }, [country.id])

  useEffect(() => {
    if (!(initialData && initialData.dateOfBirth)) return

    const personalDateOfBirth = initialData.dateOfBirth?.split('-')
    const year = personalDateOfBirth && personalDateOfBirth[0]
    const month = personalDateOfBirth && +personalDateOfBirth[1] - 1
    const day = personalDateOfBirth && +personalDateOfBirth[2]

    setDateOfBirth({
      year,
      month: `${month}`,
      day: `${day}`,
    })

    setPhoneState({
      phoneCode: initialData?.phoneParsed.country.slice(1),
      phoneNumber: initialData?.phoneParsed.phone,
    })

    const currentState = states?.find(
      (state: Record<string, string>) => state.id === initialData.stateId
    ) as { id: number; name: string } | undefined

    const cState = currentState?.name ?? ''
    setGeoData({
      ...geoData,
      state: cState,
    })

    setPersonalDetailsState({
      ...personalDetailsState,
      ...initialData,
    })

    if (initialData?.objective) {
      setTermsAcceptance(true)
    }
  }, [initialData])

  useEffect(() => {
    dispatch(getPersonalDetails())
    dispatch({
      type: 'GEO_TAKE',
      payload: {
        at: 'countries',
      },
    })
  }, [])

  useEffect(() => {
    if (!countries) return
    const initialCountry = countries.find(
      (item: ICountries) => item.id === country.id
    )
    if (!initialCountry) return
    setPersonalDetailsState({
      ...personalDetailsState,
      countryId: initialCountry?.id,
    })
    setGeoData({
      ...geoData,
      country: initialCountry?.name,
    })
  }, [countries])

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
  }, [personalDetailsState])

  return (
    <div className={form}>
      <H1 secondary>Personal Details</H1>
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
        error={fetchError?.objective}
        currentOption={objectiveCodes[personalDetailsState.objective]}
        placeholder="Select objective"
        setCurrentOption={(option: string) => {
          // eslint-disable-next-line no-restricted-syntax
          for (const item of Object.keys(objectiveCodes)) {
            if (objectiveCodes[item] === option) {
              setPersonalDetails('objective', item)
              removeErrors('objective')
            }
          }
        }}
      />

      <TextArea
        value={personalDetailsState.objectiveNote}
        onChange={handleFormInputs}
        name="objectiveNote"
        label="Objective Note"
        error={fetchError?.objectiveNote}
      />

      <div className={classNames(form_fullName, row)}>
        <Input
          name="firstName"
          onChange={handleFormInputs}
          value={personalDetailsState.firstName}
          label="First Name"
          required
          placeholder="Enter First Name"
          error={fetchError?.firstName}
        />
        <Input
          name="lastName"
          onChange={handleFormInputs}
          value={personalDetailsState.lastName}
          label="Last Name"
          required
          placeholder="Enter Last Name"
          error={fetchError?.lastName}
        />
      </div>

      <div className={classNames(form_phone_address, row)}>
        <PhoneNumberForm
          changeStateCallback={changePhoneState}
          phoneCode={country.phonecode.slice(1)}
          formState={{
            phoneCode: phoneState.phoneCode,
            phoneNumber: phoneState.phoneNumber,
          }}
          personalDetailsStatePhone={personalDetailsState.phone}
          error={fetchError?.phone}
        />

        <Input
          name="address"
          onChange={handleFormInputs}
          value={personalDetailsState.address}
          label="Address"
          required
          placeholder="Enter Address"
          error={fetchError?.address}
          // maxLength={255}
        />
      </div>

      <DatePickerForm
        dateForm={dateOfBirth}
        setDateForm={setDateOfBirth}
        error={fetchError?.dateOfBirth}
      />

      <div className={martial_gender}>
        <ChooseGenderForm
          onGenderChange={setPersonalDetails}
          genderState={personalDetailsState.gender}
        />
        <div className={select_stabilizer}>
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
              maritalStatusCodes[personalDetailsState.maritalStatus]
            }
            placeholder="Select marital status"
            setCurrentOption={(option: string) => {
              Object.keys(maritalStatusCodes).map((item: string) => {
                if (maritalStatusCodes[item] === option) {
                  setPersonalDetails('maritalStatus', item)
                  removeErrors('maritalStatus')
                }
              })
            }}
            error={fetchError?.maritalStatus}
          />
        </div>
      </div>
      <div className={options_wrapper}>
        <OptionalRadioForm
          name="jobTitle"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => {
            setPersonalDetails('currentlyEmployed', value)
            removeErrors('jobTitle')
            removeErrors('jobDescription')
            removeErrors('employeeAddress')
          }}
          questionLabel="Are You Currently Employed?"
          placeholder="Job Title"
          answerState={personalDetailsState.currentlyEmployed}
          value={personalDetailsState.jobTitle}
          error={fetchError?.currentlyEmployed}
          inputError={fetchError?.jobTitle}
        />
        {personalDetailsState.currentlyEmployed && (
          <div className={classNames(row, job_question_inputs, row_employed)}>
            <Input
              onChange={handleFormInputs}
              name="jobDescription"
              value={personalDetailsState.jobDescription}
              placeholder="Job Description"
              inputError={fetchError?.jobDescription}
            />
            <Input
              onChange={handleFormInputs}
              name="employeeAddress"
              value={personalDetailsState.employeeAddress}
              placeholder="Employee Address"
              inputError={fetchError?.employeeAddress}
            />
          </div>
        )}

        <OptionalRadioForm
          name="businessDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => {
            setPersonalDetails('businessOwner', value)
            removeErrors('businessDescription')
          }}
          questionLabel="Are You a Business Owner?"
          placeholder="Business Description"
          answerState={personalDetailsState.businessOwner}
          value={personalDetailsState.businessDescription}
          error={fetchError?.businessOwner}
          inputError={fetchError?.businessDescription}
        />
        <OptionalRadioForm
          name="tradeDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => {
            setPersonalDetails('anyTrade', value)
            removeErrors('tradeDescription')
          }}
          questionLabel="Do You Have any Trade?"
          placeholder="Trade Description"
          answerState={personalDetailsState.anyTrade}
          value={personalDetailsState.tradeDescription}
          error={fetchError?.anyTrade}
          inputError={fetchError?.tradeDescription}
        />
        <OptionalRadioForm
          name="technicalSkillsDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => {
            setPersonalDetails('anyTechnicalSkills', value)
            removeErrors('technicalSkillsDescription')
          }}
          questionLabel="Do you Have any Technical skills?"
          placeholder="Skill Description"
          answerState={personalDetailsState.anyTechnicalSkills}
          value={personalDetailsState.technicalSkillsDescription}
          error={fetchError?.anyTechnicalSkills}
          inputError={fetchError?.technicalSkillsDescription}
        />
        <OptionalRadioForm
          name="athleticSkillsDescription"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => {
            setPersonalDetails('anyAthleticSkills', value)
            removeErrors('athleticSkillsDescription')
          }}
          questionLabel="Do you Have any Athletic skills?"
          placeholder="Skill Description"
          answerState={personalDetailsState.anyAthleticSkills}
          value={personalDetailsState.athleticSkillsDescription}
          error={fetchError?.anyAthleticSkills}
          inputError={fetchError?.athleticSkillsDescription}
        />
        <OptionalRadioForm
          name="totalNumberOfDependens"
          onInputChange={handleFormInputs}
          onRadioChange={(value) => {
            setPersonalDetails('anyDependents', value)
            removeErrors('totalNumberOfDependens')
          }}
          questionLabel="Do You Have Any Dependent?"
          placeholder="Total Number of Dependents"
          answerState={personalDetailsState.anyDependents}
          value={personalDetailsState.totalNumberOfDependens}
          error={fetchError?.anyDependents}
          inputError={fetchError?.totalNumberOfDependens}
        />
      </div>

      <Input
        label="Beneficiary"
        placeholder="Name"
        onChange={handleFormInputs}
        name="beneficiaryName"
        value={personalDetailsState.beneficiaryName}
        required
        error={fetchError?.beneficiaryName}
      />

      <div className={classNames(row, double_input, bottom_area)}>
        <Input
          name="beneficiaryRelationship"
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryRelationship}
          placeholder="Relationship"
          error={fetchError?.beneficiaryRelationship}
        />
        <Input
          name="beneficiaryContactNumber"
          onChange={handleFormInputs}
          value={personalDetailsState.beneficiaryContactNumber}
          placeholder="Contact Number"
          error={fetchError?.beneficiaryContactNumber}
        />
      </div>
      <div className={classNames(row, double_input)}>
        <Select
          label="Country"
          required
          currentOption={geoData.country}
          placeholder={
            countries?.map(
              (countryInfo: Record<string, string>) => countryInfo.name
            )[0] || 'Choose Country'
          }
          setCurrentOption={changeGeoCountry}
          options={countries.map(
            (stateInfo: Record<string, string>) => stateInfo.name
          )}
          error={fetchError?.country}
        />
        <Select
          label="State"
          required
          currentOption={geoData.state}
          placeholder="Select State"
          setCurrentOption={changeGeoStates}
          options={states.map(
            (stateInfo: Record<string, string>) => stateInfo.name
          )}
          error={fetchError?.stateId}
        />
      </div>

      <div className={classNames(row, double_input, margin_cont)}>
        <Input
          placeholder="Enter City"
          name="city"
          label="City"
          value={personalDetailsState.city}
          onChange={handleFormInputs}
          required
          error={fetchError?.city}
        />
        <Input
          placeholder="Enter Zip Code"
          name="zipCode"
          label="Zip code"
          value={personalDetailsState.zipCode}
          onChange={handleFormInputs}
          error={fetchError?.zipCode}
        />
      </div>
      {fetchError && typeof fetchError !== 'object' && (
        <ErrorsSpan>{fetchError}</ErrorsSpan>
      )}
      <div className={form_actions}>
        <div className={row}>
          <CheckBox
            label=""
            checked={termsAcceptance}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTermsAcceptance(e.target.checked)
            }
          />
          <LinkText href="#" secondary>
            Accept Terms and Conditions *
          </LinkText>
        </div>
        <div className={actions_buttons}>
          <Button onClick={handleForm} disabled={!termsAcceptance}>
            <>Continue</>
            <img src={vector} alt="vector" />
          </Button>
        </div>
      </div>
    </div>
  )
}
