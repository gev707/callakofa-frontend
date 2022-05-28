import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'
import { changeProfileTab } from '../../../store/ProfileDataStore/ProfileDataStore'
import { Personal } from './EditPages/personal'
import { Security } from './EditPages/Security/security'
import { Social } from './EditPages/Social/social'
import {
  closeModal,
  setShowModal,
} from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { modalPromise } from '../../../helpers/modal-helper'

type ITabNames = 'security' | 'personal' | 'social'

interface IActiveProfileTab {
  activeProfileTab: ITabNames
}

export const Edit: FC = () => {
  const dispatch = useDispatch()

  const tabs = {
    personal: <Personal />,
    security: <Security />,
    social: <Social />,
  }
  const { activeProfileTab }: IActiveProfileTab = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )

  const handleChangeTab = async (tab: ITabNames) => {
    if (!isFormFilled || activeProfileTab === tab) {
      dispatch(changeProfileTab(tab))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeProfileTab(tab))
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(changeProfileTab('personal'))
    }
  }, [])

  return (
    <div className="edit-container">
      <div className="sec-title">
        <span>PROFILE</span>
      </div>
      <div className="edit-holder">
        <div className="sections">
          <div
            className={classNames('personal info', {
              activeInfo: activeProfileTab === 'personal',
            })}
            onClick={() => handleChangeTab('personal')}
            aria-hidden
          >
            <span>Personal Info</span>
          </div>
          <div
            className={classNames('security info', {
              activeInfo: activeProfileTab === 'security',
            })}
            onClick={() => handleChangeTab('security')}
            aria-hidden
          >
            <span>Security Info</span>
          </div>
          <div
            className={classNames('social info', {
              activeInfo: activeProfileTab === 'social',
            })}
            onClick={() => handleChangeTab('social')}
            aria-hidden
          >
            <span>Social Info</span>
          </div>
        </div>
        {tabs[activeProfileTab]}
      </div>
    </div>
  )
}
