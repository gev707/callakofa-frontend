import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { useSelectorTyped } from '../../../utils/hooks'
import { getAccessToken } from '../../../utils'
import { storeAccessToken } from '../../../store/reducers/signin'
import { SideMenu } from '../../../components/SideMenu'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { RootState } from '../../../store'
import { ConfirmModal } from '../../../components/Modal/ConfirmModal'
import { resetProfileDataStore } from '../../../store/ProfileDataStore/ProfileDataStore'
import {
  setIsFormFilled,
  resetGlobalConfigDataStore,
  setDefaults,
  setIsSuperAdmin,
  setShowLoader,
} from '../../../store/GlobalConfigDataStore/GlobalConfigDataStore'
import { AlertModal } from '../../../components/Modal/AlertModal'
import PromptModal from '../../../components/Modal/PromptModal'
import { EnterSecurityPin } from '../../../components/Modal/ConfirmModal/enterSecurityPin'
import { EnterSecurityQuestion } from '../../../components/Modal/ConfirmModal/enterSecurityQuestion'
import {
  resetMainLayoutDataStore,
  setPersonalInfo,
  setUserData,
} from '../../../store/MainLayoutDataStore/MainLayoutDataStore'
import { GlobalManager } from '../../../managers/global'
import { ProfileManager } from '../../../managers/profile'
import MainLoader from '../../../components/Loaders/MainLoader'
import { resetMemberManagementDataStore } from '../../../store/MebmerManagementDataStore/MemberManagementDataStore'

interface IMainLayout {
  children: JSX.Element
}

const pagesWithPermissions = ['/member_management']

const MainLayout = ({ children }: IMainLayout) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelectorTyped((state) => state.signin)
  const { isSuperAdmin, showLoader } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )
  const [loading, setLoading] = useState(true)

  const {
    showConfirmModal,
    showAlertModal,
    showPromptModal,
    showPinModal,
    showQuestionModal,
  } = useSelectorTyped((state: RootState) => state.MainLayoutDataStore)

  const {
    activeProfileTab: profileActiveProfileTab,
    activeTab: profileActiveTab,
  } = useSelectorTyped((state: RootState) => state.ProfileDataStore)

  const {
    activeProfileTab: memberActiveProfileTab,
    activeTab: memberActiveTab,
  } = useSelectorTyped((state: RootState) => state.MemberManagementDataStore)

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/signin')
    } else {
      if (!data.accessToken) {
        dispatch(storeAccessToken(getAccessToken()))
      }
      setLoading(false)
    }
  }, [data.accessToken])

  useEffect(() => {
    dispatch(setIsFormFilled(false))
  }, [
    profileActiveProfileTab,
    profileActiveTab,
    memberActiveProfileTab,
    memberActiveTab,
  ])

  useEffect(() => {
    ;(async () => {
      const [getDefaults, personal, userInfo] = await Promise.all([
        ProfileManager.getDefaults(),
        ProfileManager.getPersonalInfo(),
        GlobalManager.getUser(),
      ])
      dispatch(setPersonalInfo(personal))
      dispatch(setDefaults(getDefaults))
      const { isSuperAdmin: SuperAdminPermission, ...userData } = userInfo
      dispatch(setUserData(userData))
      dispatch(setIsSuperAdmin(SuperAdminPermission))
      dispatch(setShowLoader(false))
    })()

    return () => {
      dispatch(resetGlobalConfigDataStore())
      dispatch(resetMainLayoutDataStore())
      dispatch(resetMemberManagementDataStore())
      dispatch(resetProfileDataStore())
    }
  }, [])

  useEffect(() => {
    if (
      isSuperAdmin === false &&
      !pagesWithPermissions.every((page) => !router.asPath.includes(page))
    ) {
      router.push('/profile')
    }
  }, [router, isSuperAdmin])

  return (
    <div className="main-wrapper">
      {showConfirmModal && <ConfirmModal />}
      {showAlertModal && <AlertModal />}
      {showPromptModal && <PromptModal />}
      {showPinModal && <EnterSecurityPin />}
      {showQuestionModal && <EnterSecurityQuestion />}
      <Header />
      <SideMenu />
      <div
        className={classNames('main-container', {
          'main-container__loading': !!showLoader,
        })}
      >
        {showLoader && <MainLoader />}
        {children}
      </div>
      <Footer />
      {loading ? <MainLoader /> : ''}
    </div>
  )
}

export default MainLayout
