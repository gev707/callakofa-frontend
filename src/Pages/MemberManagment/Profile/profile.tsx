import React, { FC, useEffect } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { Security } from './ProfilePages/Security/security'
import { Personal } from './ProfilePages/Personal/personal'
import { Social } from './ProfilePages/Social/social'
import { Account } from './ProfilePages/Account/account'
import { useSelectorTyped } from '../../../utils/hooks'
import { RootState } from '../../../store'
import { modalPromise } from '../../../helpers/modal-helper'
import {
  closeModal,
  setShowModal,
} from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import {
  changeProfileTab,
  IActiveProfileTab,
} from '../../../store/MebmerManagementDataStore/MemberManagementDataStore'

interface IMemberManagementDataStore {
  activeProfileTab: IActiveProfileTab
}
const tabs = {
  personal: <Personal />,
  security: <Security />,
  social: <Social />,
  account: <Account />,
}
export const Profile: FC = () => {
  const { activeProfileTab }: IMemberManagementDataStore = useSelectorTyped(
    (state: RootState) => state.MemberManagementDataStore
  )
  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )
  const dispatch = useDispatch()

  const handleChangeTab = async (tab: IActiveProfileTab) => {
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
      dispatch(changeProfileTab('account'))
    }
  }, [])

  return (
    <div className="admin-holder">
      <div className="title">
        <p>Profile</p>
      </div>

      <div className="sections sections__admin">
        <div
          className={classNames('account info', {
            activeInfo: activeProfileTab === 'account',
          })}
          onClick={() => handleChangeTab('account')}
          aria-hidden
        >
          <span>Account Info</span>
        </div>
        <div
          className={classNames('personal info', {
            activeInfo: activeProfileTab === 'personal',
          })}
          onClick={() => handleChangeTab('personal')}
          aria-hidden
        >
          <span>Profile Info</span>
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
  )
}
