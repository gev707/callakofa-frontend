import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useDispatch } from 'react-redux'
import { RootState } from 'src/store'
import classNames from 'classnames'
import { requireAuthentication } from '../../HOC/requireAuthentication'
import MainLayout from '../../src/containers/Layouts/MainLayout/MainLayout'
import ArrowNextIcon from '../../src/assets/images/icons/arrow-next-icon'
import { changeTab } from '../../src/store/ProfileDataStore/ProfileDataStore'
import { useSelectorTyped } from '../../src/utils/hooks'
import { Overview } from '../../src/Pages/Profile/Overview/overview'
import { Edit } from '../../src/Pages/Profile/Edit/edit'
import { Pin } from '../../src/Pages/Profile/Pin/pin'
import { Default } from '../../src/Pages/Profile/Defaults/default'
import { modalPromise } from '../../src/helpers/modal-helper'
import {
  closeModal,
  setShowModal,
  setUserData,
  toggleAlertModal,
} from '../../src/store/MainLayoutDataStore/MainLayoutDataStore'
import TrashIcon from '../../src/assets/images/icons/trash-icon'
import { GlobalManager } from '../../src/managers/global'
import { ProfileManager } from '../../src/managers/profile'
import getCroppedImg from '../../src/helpers/image-cropper-helper'
import { Button } from '../../src/components/Button'
import {
  setIsFormFilled,
  setShowLoader,
} from '../../src/store/GlobalConfigDataStore/GlobalConfigDataStore'

type ITabNames = 'overview' | 'edit' | 'pin' | 'default'

interface IActiveTab {
  activeTab: ITabNames
  personalInfo: Record<string, string>
}

type IImgPreview = File | ''

const tabs = {
  overview: <Overview />,
  edit: <Edit />,
  pin: <Pin />,
  default: <Default />,
}

const ProfilePage = () => {
  const { activeTab }: IActiveTab = useSelectorTyped(
    (state: RootState) => state.ProfileDataStore
  )

  const { isFormFilled } = useSelectorTyped(
    (state: RootState) => state.GlobalConfigDataStore
  )
  const { userData, personalInfo } = useSelectorTyped(
    (state: RootState) => state.MainLayoutDataStore
  )
  const dispatch = useDispatch()
  const ref = useRef<HTMLInputElement>(null)
  const [imgPreview, setImgPreview] = useState<IImgPreview>('')
  const [avatarError, setAvatarError] = useState('')

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarError('')
    if (!e.target.files) return
    const selectedFile = e.target.files[0]
    const FILE_TYPE = ['image/png', 'image/jpeg', 'image/jpg']
    if (selectedFile && FILE_TYPE.includes(selectedFile.type)) {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(selectedFile)
      )
      setImgPreview(croppedImage)
    }
  }
  const confirmChangeTabs = async (page: ITabNames) => {
    if (!isFormFilled || activeTab === page) {
      dispatch(changeTab(page))
    } else {
      const promise = await modalPromise(({ resolve, reject }) =>
        dispatch(setShowModal({ resolve, reject }))
      )
      dispatch(closeModal())
      if (promise) {
        dispatch(changeTab(page))
      }
    }
  }

  const onSave = async () => {
    if (!imgPreview) return
    const form = new FormData()
    form.append('file', imgPreview)
    try {
      await dispatch(setShowLoader(true))
      await ProfileManager.uploadAvatar(form)
      await dispatch(toggleAlertModal(true))
      const res = await GlobalManager.getUser()
      dispatch(setUserData(res))
      if (ref.current) ref.current.value = ''
      setImgPreview('')
    } catch (error) {
      setAvatarError('Please upload valid avatar image')
      throw error
    } finally {
      dispatch(setShowLoader(false))
    }
  }

  const onRemove = async () => {
    setAvatarError('')
    if (imgPreview) {
      setImgPreview('')
      if (ref.current) ref.current.value = ''
      return
    }

    try {
      await dispatch(setShowLoader(true))
      await ProfileManager.removeAvatar()
      const res = await GlobalManager.getUser()
      dispatch(setUserData(res))
    } catch (error) {
      throw error
    } finally {
      dispatch(setShowLoader(false))
    }
  }

  useEffect(() => {
    if (imgPreview) {
      dispatch(setIsFormFilled(true))
    } else {
      dispatch(setIsFormFilled(false))
    }
    return () => {
      dispatch(setIsFormFilled(false))
    }
  }, [imgPreview])
  return (
    <div className="container">
      <div className="relative">
        <h1 className="profile-title">My Profile</h1>
        <span className="title-info">Home / My Profile</span>
      </div>
      <div className="d-flex">
        <div className="row">
          <div className="profile-card">
            <div className="profile-avatar">
              <span className="avatar_error">{avatarError}</span>
              <div className="avatar-container">
                {(imgPreview || userData.avatar) && (
                  <span
                    className="delete-upload"
                    onClick={onRemove}
                    aria-hidden
                  >
                    <TrashIcon />
                  </span>
                )}
                <label
                  htmlFor="file-input"
                  className={classNames('avatar', {
                    'avatar-error': avatarError,
                  })}
                >
                  {imgPreview ? (
                    <img
                      className="upload-img"
                      src={URL.createObjectURL(imgPreview)}
                      alt="avatar"
                    />
                  ) : userData.avatar ? (
                    <img
                      className="upload-img"
                      src={`${process.env.NEXT_PUBLIC_API}/avatar/${userData.avatar}`}
                      alt="avatar"
                    />
                  ) : (
                    <p>
                      {personalInfo.firstName?.slice(0, 1).toUpperCase()}
                      {personalInfo.lastName?.slice(0, 1).toUpperCase()}
                    </p>
                  )}
                </label>
                <label htmlFor="file-input" className="image_upload">
                  <ArrowNextIcon />
                </label>
                <input
                  type="file"
                  id="file-input"
                  onChange={handleUploadImage}
                  accept="image/png, image/jpeg,image/jpg"
                  ref={ref}
                  hidden
                />
              </div>
              <p
                className={classNames('name', {
                  new_line:
                    personalInfo.firstName?.length +
                      personalInfo.lastName?.length >
                    18,
                })}
              >
                {personalInfo.firstName ? (
                  <>
                    <span>{personalInfo.firstName} </span>
                    <span>{personalInfo.lastName}</span>
                  </>
                ) : (
                  ''
                )}
              </p>
              <Button disabled={!imgPreview} onClick={onSave} className="btn">
                Save
              </Button>
            </div>
            <ul className="user-info_tabs">
              <li
                className={classNames('overview tabs', {
                  activeTab: activeTab === 'overview',
                })}
                onClick={() => confirmChangeTabs('overview')}
                aria-hidden
              >
                Overview
              </li>
              <li
                className={classNames('edit tabs', {
                  activeTab: activeTab === 'edit',
                })}
                onClick={() => confirmChangeTabs('edit')}
                aria-hidden
              >
                Edit Profile
              </li>
              <li
                className={classNames('pin tabs', {
                  activeTab: activeTab === 'pin',
                })}
                onClick={() => confirmChangeTabs('pin')}
                aria-hidden
              >
                Security PIN
              </li>
              <li
                className={classNames('default tabs', {
                  activeTab: activeTab === 'default',
                })}
                onClick={() => confirmChangeTabs('default')}
                aria-hidden
              >
                Set Default
              </li>
            </ul>
          </div>
        </div>
        {tabs[activeTab]}
      </div>
    </div>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    }
  }
)

ProfilePage.getLayout = function getLayout(page: JSX.Element) {
  return <MainLayout>{page}</MainLayout>
}
