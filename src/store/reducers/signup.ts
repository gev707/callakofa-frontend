import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stages: [
    {
      number: 1,
      title: 'login password',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      fetching: false,
      fetchError: '',
      finished: false,
    },
    {
      number: 2,
      title: 'security pin',
      errors: {
        pin: '',
        confirmPin: '',
      },
      fetching: false,
      fetchError: '',
      finished: false,
    },
    {
      number: 3,
      title: 'security question',
      currentOption: '',
      options: {
        'Enter the name of your first pet': 'FIRST_PET_NAME',
      },
      errors: {
        answer: '',
      },
      fetching: false,
      fetchError: '',
      finished: false,
    },
    {
      number: 4,
      initialData: {
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
        currentlyEmployed: undefined,
        jobTitle: '',
        jobDescription: '',
        employeeAddress: '',
        businessOwner: undefined,
        businessDescription: '',
        anyTrade: undefined,
        tradeDescription: '',
        anyTechnicalSkills: undefined,
        technicalSkillsDescription: '',
        anyAthleticSkills: undefined,
        athleticSkillsDescription: '',
        anyDependents: undefined,
        totalNumberOfDependens: '',
        beneficiaryName: '',
        beneficiaryRelationship: '',
        beneficiaryContactNumber: '',
        city: '',
        stateId: undefined,
        countryId: -1,
        zipCode: '',
      },
      fetchError: {
        objective: '',
        objectiveNote: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        gender: '',
        maritalStatus: '',
        dateOfBirth: '',
        currentlyEmployed: '',
        jobTitle: '',
        jobDescription: '',
        employeeAddress: '',
        businessOwner: '',
        businessDescription: '',
        anyTrade: '',
        tradeDescription: '',
        anyTechnicalSkills: '',
        technicalSkillsDescription: '',
        anyAthleticSkills: '',
        athleticSkillsDescription: '',
        anyDependents: '',
        totalNumberOfDependens: '',
        beneficiaryName: '',
        beneficiaryRelationship: '',
        beneficiaryContactNumber: '',
        city: '',
        stateId: '',
        countryId: '',
        zipCode: '',
      },
      finished: false,
      title: 'personal details',
    },
    {
      number: 5,
      finished: false,
      fetching: true,
      title: 'payment details',
      confirmData: {
        email: '',
        firstName: '',
        gender: '',
        isProfileComplete: false,
        isSecurityCodeComplete: false,
        isSecurityQuestionComplete: false,
        isWalletComplete: false,
        lastName: '',
        phone: '',
        sponsor: '',
      },
    },
    {
      number: 6,
      finished: false,
      title: 'confirm details',
    },
    { number: 7, finished: false, title: 'confirm mail' },
  ],
  userInfo: {
    country: {
      id: -1,
      name: '',
      phonecode: '',
      phonemask: '',
    },
    countries: [],
    states: [],
  },
  currentStage: 0,
}

export type SignUpState = typeof initialState

const signup = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    finishStage(state) {
      state.stages[state.currentStage].finished = true
      state.currentStage += 1
    },

    backStage(state) {
      state.currentStage -= 1
      state.stages[state.currentStage].finished = false
    },

    stageFetchingErrors(state, action) {
      if (action.payload !== false) {
        if (state.currentStage === 3) {
          const fetchingErrors: Record<string, string | number> = {}
          for (const error of action.payload.response.data.errors) {
            if (!error) return
            fetchingErrors[error.property] = error.messages[0]
          }
          state.stages[state.currentStage].fetchError = fetchingErrors
        } else if (action.payload.response.data.message) {
          state.stages[state.currentStage].fetchError =
            action.payload.response.data.message
        } else {
          const fetchingErrors: Record<string, string> = {}
          for (const error of action.payload.response.data.errors[0].messages) {
            if (!error) break
            fetchingErrors[error.property] = error.messages[0]
          }
          state.stages[state.currentStage].errors = fetchingErrors
        }
      } else if (state.currentStage !== 3) {
        state.stages[state.currentStage].fetchError = ''
      }
    },

    startStageFetching(state) {
      state.stages[state.currentStage].fetching = true
    },

    endStageFetching(state) {
      state.stages[state.currentStage].fetching = false
    },

    changeStage(state, action) {
      state.currentStage = action.payload
    },

    validateStage(state, action) {
      if (state.currentStage === 3) {
        state.stages[state.currentStage].fetchError = {
          ...state.stages[state.currentStage].fetchError,
          ...action.payload.errors,
        }
      } else {
        state.stages[state.currentStage].errors = action.payload.errors
      }
    },

    removeError(state, action) {
      state.stages[state.currentStage].errors[action.payload] = ''
    },

    removeBackError(state) {
      state.stages[state.currentStage].fetchError = ''
    },

    setCurrentOption(state, action) {
      state.stages[state.currentStage].currentOption = action.payload
    },

    setUserGeo(state, action) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      }
    },

    setNewError(state, action) {
      state.stages[3].errors = { ...state.stages[3].errors, ...action.payload }
    },

    resetSignup(state) {
      state.stages = initialState.stages
      state.userInfo = initialState.userInfo
      state.currentStage = initialState.currentStage
    },

    setInitialPersonalDetails(state, action) {
      state.stages[3].initialData = action.payload
    },

    setConfirmDetails(state, action) {
      state.stages[4].confirmData = action.payload
      state.stages[4].fetching = false
    },
  },
})
export const {
  setCurrentOption,
  finishStage,
  validateStage,
  removeError,
  stageFetchingErrors,
  startStageFetching,
  endStageFetching,
  setUserGeo,
  resetSignup,
  setInitialPersonalDetails,
  backStage,
  setConfirmDetails,
  removeBackError,
} = signup.actions
export default signup.reducer
