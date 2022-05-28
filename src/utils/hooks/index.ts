import { StateType } from 'src/interfaces'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useSelectorTyped: TypedUseSelectorHook<StateType> = useSelector
