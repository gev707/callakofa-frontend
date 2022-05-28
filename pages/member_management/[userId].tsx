import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import { Profile } from '../../src/Pages/MemberManagment/Profile/profile'
import { Donation } from '../../src/Pages/MemberManagment/Donation/donation'
import { ActivateDeactivate } from '../../src/Pages/MemberManagment/ActivateDeactivate/activate_deactivate'
import { KYCPage } from '../../src/Pages/MemberManagment/KYC/kyc'
import { Referral } from '../../src/Pages/MemberManagment/ReferralList/referral'
import { useSelectorTyped } from '../../src/utils/hooks'
import { RootState } from '../../src/store'
import {
  changeTabs,
  IActiveTab,
  setMemberAccountData,
} from '../../src/store/MebmerManagementDataStore/MemberManagementDataStore'
import { modalPromise } from '../../src/helpers/modal-helper'
import {
  closeModal,
  setShowModal,
  setSocialInfo,
} from '../../src/store/MainLayoutDataStore/MainLayoutDataStore'
import { MemberManagement } from '../../src/managers/memberManagement'
import { Button } from '../../src/components/Button'
import { setShowLoader } from '../../src/store/GlobalConfigDataStore/GlobalConfigDataStore'

interface IMemberManagementDataStore {
  activeTab: IActiveTab
  memberAccountInfo: Record<string, string>
}

const tabs = {
  profile: <Profile />,
  donation: <Donation />,
  activate_deactivate: <ActivateDeactivate />,
  kyc: <KYCPage />,
  referral: <Referral />,
}

const MemberPageById = () => {
  const router = useRouter()
  const { userId } = router.query
  const { activeTab, memberAccountInfo }: IMemberManagementDataStore =
    useSelectorTyped((state: RootState) => state.MemberManagementDataStore)

  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )

  const dispatch = useDispatch()

  const changeMemberTab = async (tab: IActiveTab) => {
    if (!isFormFilled || activeTab === tab) {
      dispatch(changeTabs(tab))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeTabs(tab))
      }
    }
  }

  const backToMemberList = () => {
    router.back()
  }

  useEffect(() => {
    ;(async () => {
      try {
        const [account, social] = await Promise.all([
          MemberManagement.getMemberData({ userId: +userId }),
          MemberManagement.getMemberSocialData({ userId: +userId }),
        ])
        dispatch(setMemberAccountData(account))
        dispatch(setSocialInfo(social))
      } catch (error) {
        throw error
      }
      dispatch(setShowLoader(false))
    })()
    return () => {
      dispatch(changeTabs('profile'))
    }
  }, [userId])

  return (
    <div className="container">
      <div className="relative">
        <div className="back-flex">
          <div>
            <h1 className="container-title">Member Management</h1>
            <span className="title-info">
              Home / Admin Tools / Member Management
            </span>
          </div>
          <div className="w-140">
            <Button onClick={backToMemberList}>Back</Button>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <div className="admin-row">
          <div className="admin-profile_card">
            <div className="admin-profile_avatar">
              <div className="admin-avatar">
                {memberAccountInfo.avatar ? (
                  <img
                    className="admin-upload_img"
                    src={`${process.env.NEXT_PUBLIC_API}/avatar/${memberAccountInfo.avatar}`}
                    alt="avatar"
                  />
                ) : (
                  <p>
                    {memberAccountInfo.firstName?.slice(0, 1).toUpperCase()}
                    {memberAccountInfo.lastName?.slice(0, 1).toUpperCase()}
                  </p>
                )}
              </div>
              <div>
                <span
                  className="admin-username"
                  title={memberAccountInfo.username}
                >
                  {memberAccountInfo.username}
                </span>
                <div className="member-flexname">
                  <p className="admin-name" title={memberAccountInfo.firstName}>
                    {memberAccountInfo.firstName
                      ? memberAccountInfo.firstName
                      : ''}
                  </p>
                  <p className="admin-name" title={memberAccountInfo.lastName}>
                    {memberAccountInfo.firstName
                      ? memberAccountInfo.lastName
                      : ''}
                  </p>
                </div>
              </div>
            </div>
            <ul className="user-info_tabs member_items">
              <li
                className={classNames('profile tabs', {
                  activeTab: activeTab === 'profile',
                })}
                onClick={() => changeMemberTab('profile')}
                aria-hidden
              >
                Profile
              </li>
              <li
                className={classNames('donation tabs', {
                  activeTab: activeTab === 'donation',
                })}
                onClick={() => changeMemberTab('donation')}
                aria-hidden
              >
                Donation
              </li>
              <li
                className={classNames('referral tabs', {
                  activeTab: activeTab === 'referral',
                })}
                onClick={() => changeMemberTab('referral')}
                aria-hidden
              >
                Referral List
              </li>
              <li
                className={classNames('kyc tabs', {
                  activeTab: activeTab === 'kyc',
                })}
                onClick={() => changeMemberTab('kyc')}
                aria-hidden
              >
                KYC Documents
              </li>

              <li
                className={classNames('activate_deactivate tabs', {
                  activeTab: activeTab === 'activate_deactivate',
                })}
                onClick={() => changeMemberTab('activate_deactivate')}
                aria-hidden
              >
                Activate/Deactivate
              </li>
            </ul>
          </div>
          {tabs[activeTab]}
        </div>
      </div>
    </div>
  )
}

export default MemberPageById

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

MemberPageById.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
